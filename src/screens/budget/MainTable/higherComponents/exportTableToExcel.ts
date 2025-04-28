// Import the necessary library for Excel operations.
import * as XLSX from 'xlsx'

// ==================================================================================
// Helper Functions
// ==================================================================================

/**
 * Safely parses a string value (potentially representing currency) into a number.
 * Handles null/undefined input, removes common non-numeric characters,
 * and returns a number or null if parsing fails.
 *
 * @param value - The string value to parse.
 * @returns A valid number or null.
 * @assumes '.' is the decimal separator.
 */
const parseCurrency = (value: string | null | undefined): number | null => {
	// Return null for invalid input.
	if (!value) return null
	// Remove non-numeric characters except decimal point and minus sign.
	const cleanedValue = value.replace(/[^0-9.-]+/g, '').trim()
	// Attempt conversion to float.
	const number = parseFloat(cleanedValue)
	// Return number only if it's not NaN.
	return isNaN(number) ? null : number
}

/**
 * Safely extracts text content from the first relevant element (input or span) within a parent element,
 * or falls back to the parent's text content.
 * @param parentElement The parent TD or container element.
 * @returns The trimmed text content or an empty string.
 */
const getTextFromInputOrSpan = (parentElement: Element | null): string => {
	if (!parentElement) return ''
	const inputElement = parentElement.querySelector('input')
	if (inputElement) {
		return inputElement.value?.trim() || '' // Get value from input
	}
	const spanElement = parentElement.querySelector('span')
	if (spanElement) {
		return spanElement.textContent?.trim() || '' // Get text from span
	}
	// Fallback to the direct text content of the parent element if no input/span found
	return parentElement.textContent?.trim() || ''
}

// ==================================================================================
// Main Export Function
// ==================================================================================

/**
 * Main function to orchestrate the process of exporting an HTML table to Excel.
 * Handles dynamic content, calculates totals correctly, structures output rows,
 * applies styles, and triggers the download.
 */
export const exportTableToExcel = () => {
	// --- Step 0: Initialization & Target Table Identification ---
	console.log(
		`Export triggered on: ${new Date().toLocaleString()} in Sant Cugat del Vallès, Catalonia, Spain.`
	)

	const budgetContainerId = 'budget_id'
	const budgetElement = document.getElementById(budgetContainerId)
	const originalTable: HTMLTableElement | null =
		budgetElement?.querySelector('table') || null

	if (!originalTable) {
		console.error(
			`Budget table container #${budgetContainerId} or table element not found.`
		)
		return // Exit if table not found
	}

	// --- Step 1: Read Dynamic <select> Data from ORIGINAL Table ---
	console.log('Step 1: Reading dynamic <select> values...')
	const originalSelects = originalTable.querySelectorAll('select')
	const selectedTextMap = new Map<HTMLSelectElement, string>()
	originalSelects.forEach((originalSelect) => {
		const selectedText =
			originalSelect.options[originalSelect.selectedIndex]?.text || ''
		selectedTextMap.set(originalSelect, selectedText)
	})
	console.log(`Mapped ${selectedTextMap.size} <select> elements.`)

	// --- Step 2: Clone the Table ---
	console.log('Step 2: Cloning the original table...')
	const clonedTable: HTMLElement = originalTable.cloneNode(true) as HTMLElement

	// --- Step 3: Update Cloned Table (Replace Selects with Text) ---
	console.log('Step 3: Updating clone - replacing <select> with text...')
	const clonedSelects = clonedTable.querySelectorAll('select')
	clonedSelects.forEach((clonedSelect, index) => {
		const originalSelect = Array.from(originalSelects)[index]
		let textToInsert = ''
		if (originalSelect) {
			textToInsert = selectedTextMap.get(originalSelect) || ''
		} else {
			console.warn(
				`Could not find original select for cloned select at index ${index}.`
			)
			textToInsert =
				clonedSelect.options[clonedSelect.selectedIndex]?.text || ''
		}
		const textNode = document.createTextNode(textToInsert)
		if (clonedSelect.parentNode) {
			clonedSelect.parentNode.replaceChild(textNode, clonedSelect)
		} else {
			console.warn(`Cloned select at index ${index} has no parent node.`)
		}
	})

	// --- Step 4: Remove Unwanted UI Elements from Clone ---
	console.log('Step 4: Removing unwanted UI elements from clone...')
	const unwantedSelectors = [
		'.icon',
		'button',
		'svg',
		'[aria-hidden="true"]',
		// Specific selector for nested headers within a particular container (adjust if necessary)
		'[data-testid="visibility-container"] .transition-all > div > table > thead'
	].join(', ')
	clonedTable.querySelectorAll(unwantedSelectors).forEach((el) => el.remove())

	// --- Step 5: Process Clone & Generate Excel Data Structures ---
	console.log('Step 5: Processing cloned table data for Excel sheets...')
	const wb = XLSX.utils.book_new()
	const mainWs = XLSX.utils.aoa_to_sheet([])
	const hotelWs = XLSX.utils.aoa_to_sheet([])

	// --- 5a. Process Data for 'Accommodation' Sheet ---
	console.log("Step 5a: Processing 'Accommodation' sheet data...")
	const hotelHeaders = [
		'Hotel Name',
		'Room Type',
		'Units',
		'Nights',
		'Cost per Night',
		'Total Cost'
	]
	let hotelData: any[][] = []
	let currentHotelNameForBreakdown_Acc = '' // Context for current hotel breakdown

	clonedTable.querySelectorAll('tbody > tr').forEach((tr) => {
		// Identify Hotel Summary rows
		const isHotelSummary =
			tr.classList.contains('total-row') &&
			tr.nextElementSibling?.classList.contains('breakdown-row')

		if (isHotelSummary) {
			// ** Adjust selector 'td:nth-child(3)' if hotel name is elsewhere **
			const hotelNameCell = tr.querySelector('td:nth-child(3)')
			currentHotelNameForBreakdown_Acc =
				hotelNameCell?.textContent?.trim() || 'Hotel Name Not Found'
		}

		// Process breakdown rows associated with the current hotel
		if (tr.classList.contains('breakdown-row')) {
			const breakdownTable = tr.querySelector('table')
			if (breakdownTable && currentHotelNameForBreakdown_Acc) {
				breakdownTable.querySelectorAll('tbody tr').forEach((breakdownTr) => {
					const cells = breakdownTr.querySelectorAll('td')
					if (cells.length >= 5) {
						// Ensure enough cells
						hotelData.push([
							currentHotelNameForBreakdown_Acc,
							cells[0]?.textContent?.trim() || '-', // Room Type
							parseInt(cells[1]?.textContent?.trim() || '0', 10) || 0, // Units
							parseInt(cells[2]?.textContent?.trim() || '0', 10) || 0, // Nights
							parseCurrency(cells[3]?.textContent), // Cost/Night
							parseCurrency(cells[4]?.textContent) // Total Cost
						])
					}
				})
				// Add separator row if breakdown had content
				if (breakdownTable.querySelectorAll('tbody tr').length > 0) {
					hotelData.push([])
				}
				currentHotelNameForBreakdown_Acc = '' // Reset context
			}
		}
	}) // End Accommodation processing

	// Add data to Accommodation worksheet
	XLSX.utils.sheet_add_aoa(hotelWs, [hotelHeaders], { origin: 'A1' })
	if (hotelData.length > 0) {
		XLSX.utils.sheet_add_aoa(hotelWs, hotelData, { origin: 'A2' })
	}

	// --- 5b. Process Data for 'Budget Summary' Sheet ---
	console.log("Step 5b: Processing 'Budget Summary' sheet data...")
	const mainHeaders = [
		'Date',
		'Category',
		'Description',
		'Units',
		'Unit Cost',
		'Total Cost'
	]
	let mainData: any[][] = [] // Holds rows for this sheet
	let currentDate = '' // Tracks current date section
	let currentCategory = '' // Tracks current category from TH
	let selectedHotelNameForSummary: string | null = null // To store extracted hotel name
	let selectedHotelTotalCostForSummary: number | null = null // To store extracted hotel total
	let overallBudgetTotal = 0 // Accumulator for the final total
	let skipNextRow = false // Flag to handle skipping note rows that follow data rows
	let currentTransferSection = '' // To track if we're in "Airport Arrival Transfers" or "Airport Departure Transfers"

	// Iterate through rows of the cloned table for the main budget data
	clonedTable.querySelectorAll('tbody > tr').forEach((tr) => {
		// --- Skip Row if Flagged ---
		// If the previous row indicated this one should be skipped (e.g., it's a note)
		if (skipNextRow) {
			skipNextRow = false // Reset flag
			return // Skip this row
		}

		// --- Check for Section Headers to identify Transfer sections ---
		const sectionHeader = tr.querySelector('th')
		if (sectionHeader) {
			const headerText = sectionHeader.textContent?.trim() || ''
			currentCategory = headerText
			mainData.push([null, currentCategory, null, null, null, null]) // Add category row pattern

			// Track if we're in a transfer section for later row processing
			if (headerText === 'Airport Arrival Transfers') {
				currentTransferSection = 'arrival'
			} else if (headerText === 'Airport Departure Transfers') {
				currentTransferSection = 'departure'
			} else {
				currentTransferSection = ''
			}

			return // Stop processing this row
		}

		// --- Handle Date Divider Rows (H3) ---
		const dividerElem = tr.querySelector('h3')
		if (dividerElem) {
			currentDate = dividerElem.textContent?.trim() || ''
			mainData.push([currentDate, null, null, null, null, null]) // Add date row pattern
			currentCategory = '' // Reset category
			return // Stop processing this row
		}

		// --- Identify and Skip Standalone Note Rows ---
		// Check for rows that are *only* note rows based on class or specific content/structure
		const isStandaloneNoteRow =
			tr.classList.contains('note-row') || // Specific class for notes
			tr.classList.contains('expanded') || // Class often used for expanded content like notes
			tr.querySelector('.note-content') != null || // Contains an element with class 'note-content'
			// Contains "Note:" but is not a date/category/summary row (basic check)
			(tr.textContent?.includes('Note:') &&
				!tr.querySelector('h3') &&
				!tr.querySelector('th') &&
				!tr.classList.contains('total-row'))

		if (isStandaloneNoteRow) {
			console.log(
				'Skipping standalone note row:',
				tr.textContent?.substring(0, 50)
			)
			return // Skip this row
		}

		// --- Look Ahead for Associated Note Row ---
		// Check if the *next* row is likely a note associated with the *current* row.
		const nextRow = tr.nextElementSibling
		if (
			nextRow &&
			(nextRow.classList.contains('note-row') ||
				nextRow.classList.contains('expanded') ||
				nextRow.querySelector('.note-content') != null ||
				(nextRow.textContent?.includes('Note:') &&
					!nextRow.querySelector('h3') &&
					!nextRow.querySelector('th')))
		) {
			skipNextRow = true // Set flag to skip the next iteration (the note row)
		}

		// --- Skip Breakdown Rows ---
		// Breakdown rows are handled separately in the Accommodation sheet logic if needed there.
		if (tr.classList.contains('breakdown-row')) {
			return // Stop processing this row
		}

		// --- Check for Hotel Summary Row (to extract total) ---
		// This check needs to run before standard processing to capture the hotel total accurately.
		const isHotelSummary =
			tr.classList.contains('total-row') &&
			tr.nextElementSibling?.classList.contains('breakdown-row')

		if (isHotelSummary && selectedHotelNameForSummary === null) {
			// Process only first instance found
			// Extract name (3rd TD contains text after select replacement)
			// ** Adjust selector 'td:nth-child(3)' if hotel name is elsewhere **
			const hotelNameCell = tr.querySelector('td:nth-child(3)')
			selectedHotelNameForSummary = hotelNameCell?.textContent?.trim() || null

			// Extract total cost from where <HotelTotalCost /> renders.
			// ** IMPORTANT: Verify and Adjust this selector based on your rendered HTML **
			const hotelTotalCostCell = tr.querySelector('td:last-child > div > span') // Example selector
			if (hotelTotalCostCell) {
				selectedHotelTotalCostForSummary = parseCurrency(
					hotelTotalCostCell.textContent
				)
				console.log(
					`DEBUG - Extracted Hotel Total Cost: ${selectedHotelTotalCostForSummary}`
				)
			} else {
				console.warn(
					"Could not extract Hotel Total Cost using selector 'td:last-child > div > span'."
				)
			}
			// Do not return here if the hotel summary row itself should also be processed by standard logic below
		}

		// --- Process Standard Data Rows (TDs) ---
		const tds = tr.querySelectorAll('td')
		if (tds.length < 3) return // Skip rows with insufficient columns

		// --- FIX: Skip row if Category column contains "TOTAL BUDGET" ---
		const categoryCellText = tds[1]?.textContent?.trim()
		if (categoryCellText === 'TOTAL BUDGET') {
			console.log("Skipping row with 'TOTAL BUDGET' in category column.")
			return // Skip this specific row
		}

		// Initialize variables for row data
		let description = ''
		let units: number | string = ''
		let unitCost: number | null = null
		let totalCost: number | null = null
		let specificCategory = '' // Category potentially defined within the row

		// --- Handle Meet & Greet rows (from Airport Arrival Transfers section) ---
		if (
			currentTransferSection === 'arrival' &&
			tds[2]?.textContent?.trim() === 'Meet & Greet'
		) {
			specificCategory = currentCategory
			description = tds[2]?.textContent?.trim() || ''

			// Extract units and cost using our utility function or direct access
			units = getTextFromInputOrSpan(tds[3])
			unitCost = parseCurrency(getTextFromInputOrSpan(tds[4]))
			totalCost = parseCurrency(getTextFromInputOrSpan(tds[5]))

			// Only add if we have meaningful data
			if (description && (units || unitCost || totalCost)) {
				mainData.push([
					currentDate,
					specificCategory,
					description,
					units,
					unitCost,
					totalCost
				])

				// Add to overall total if we have a valid cost
				if (typeof totalCost === 'number' && !isNaN(totalCost)) {
					overallBudgetTotal += totalCost
				}
			}

			return // Skip further processing for this row
		}

		// --- Handle Assistance rows (from Airport Arrival Transfers section) ---
		if (
			currentTransferSection === 'arrival' &&
			tds[2]?.textContent?.trim() === 'Assistance'
		) {
			specificCategory = currentCategory
			description = tds[2]?.textContent?.trim() || ''

			// Extract units and cost using our utility function or direct access
			units = getTextFromInputOrSpan(tds[3])
			unitCost = parseCurrency(getTextFromInputOrSpan(tds[4]))
			totalCost = parseCurrency(getTextFromInputOrSpan(tds[5]))

			// Only add if we have meaningful data
			if (description && (units || unitCost || totalCost)) {
				mainData.push([
					currentDate,
					specificCategory,
					description,
					units,
					unitCost,
					totalCost
				])

				// Add to overall total if we have a valid cost
				if (typeof totalCost === 'number' && !isNaN(totalCost)) {
					overallBudgetTotal += totalCost
				}
			}

			return // Skip further processing for this row
		}

		// --- Handle Bus Dispatcher rows (from Airport Departure Transfers section) ---
		if (
			currentTransferSection === 'departure' &&
			tds[2]?.textContent?.trim() === 'Bus Dispatcher'
		) {
			specificCategory = currentCategory
			description = tds[2]?.textContent?.trim() || ''

			// Extract units and cost using our utility function or direct access
			units = getTextFromInputOrSpan(tds[3])
			unitCost = parseCurrency(getTextFromInputOrSpan(tds[4]))
			totalCost = parseCurrency(getTextFromInputOrSpan(tds[5]))

			// Only add if we have meaningful data
			if (description && (units || unitCost || totalCost)) {
				mainData.push([
					currentDate,
					specificCategory,
					description,
					units,
					unitCost,
					totalCost
				])

				// Add to overall total if we have a valid cost
				if (typeof totalCost === 'number' && !isNaN(totalCost)) {
					overallBudgetTotal += totalCost
				}
			}

			return // Skip further processing for this row
		}

		// --- Handle Transfer To Airport rows ---
		// This special case targets the structure from TransfersOutRow.tsx
		if (
			currentTransferSection === 'departure' &&
			tds[2]?.textContent?.trim()?.includes('Transfer To Airport')
		) {
			specificCategory = currentCategory
			description = tds[2]?.textContent?.trim() || ''

			// Find the vehicle description (TransfersOutRow contains vehicle description in TD3)
			const vehicleDesc = tds[3]?.textContent?.trim() || ''
			if (vehicleDesc) {
				// If there's a vehicle description, combine it with the transfer type
				description = `${description} - ${vehicleDesc}`
			}

			// Extract units and cost using our utility function
			units = getTextFromInputOrSpan(tds[4])
			unitCost = parseCurrency(getTextFromInputOrSpan(tds[5]))
			totalCost = parseCurrency(getTextFromInputOrSpan(tds[6]))

			// Only add if we have meaningful data
			if (description && (units || unitCost || totalCost)) {
				mainData.push([
					currentDate,
					specificCategory,
					description,
					units,
					unitCost,
					totalCost
				])

				// Add to overall total if we have a valid cost
				if (typeof totalCost === 'number' && !isNaN(totalCost)) {
					overallBudgetTotal += totalCost
				}

				console.log(
					`DEBUG - Parsed Transfer Out: Cat='${specificCategory}', Desc='${description}', Units='${units}', UnitCost=${unitCost}, Total=${totalCost}`
				)
			}

			return // Skip further processing for this row
		}

		// --- Handle Transfer From Airport rows ---
		if (
			currentTransferSection === 'arrival' &&
			tds[2]?.textContent?.trim()?.includes('Transfer From Airport')
		) {
			specificCategory = currentCategory
			description = tds[2]?.textContent?.trim() || ''

			// Find the vehicle description (similar to TransfersOutRow structure)
			const vehicleDesc = tds[3]?.textContent?.trim() || ''
			if (vehicleDesc) {
				// If there's a vehicle description, combine it with the transfer type
				description = `${description} - ${vehicleDesc}`
			}

			// Extract units and cost using our utility function
			units = getTextFromInputOrSpan(tds[4])
			unitCost = parseCurrency(getTextFromInputOrSpan(tds[5]))
			totalCost = parseCurrency(getTextFromInputOrSpan(tds[6]))

			// Only add if we have meaningful data
			if (description && (units || unitCost || totalCost)) {
				mainData.push([
					currentDate,
					specificCategory,
					description,
					units,
					unitCost,
					totalCost
				])

				// Add to overall total if we have a valid cost
				if (typeof totalCost === 'number' && !isNaN(totalCost)) {
					overallBudgetTotal += totalCost
				}

				console.log(
					`DEBUG - Parsed Transfer In: Cat='${specificCategory}', Desc='${description}', Units='${units}', UnitCost=${unitCost}, Total=${totalCost}`
				)
			}

			return // Skip further processing for this row
		}

		// --- Standard Row Processing (Default Case) ---
		// First column is usually empty or contains a check/control, skip
		// Second column usually indicates category/class of item
		if (tds[1] && categoryCellText) {
			// Extract specific category defined in-row (TD1)
			specificCategory = categoryCellText

			// Process standard row data:
			// TD2 usually holds description
			description = tds[2]?.textContent?.trim() || ''

			// TD3 typically holds quantity/units (extract value from input if present)
			const unitsCell = tds[3]
			if (unitsCell) {
				const inputElement = unitsCell.querySelector('input')
				if (inputElement) {
					units = inputElement.value.trim() // Get units from input value
				} else {
					units = unitsCell.textContent?.trim() || '' // Fallback to text
				}
			}

			// TD4 typically holds unit cost (extract value from input if present)
			const unitCostCell = tds[4]
			if (unitCostCell) {
				// Try to extract from input first
				const inputElement = unitCostCell.querySelector('input')
				if (inputElement) {
					unitCost = parseCurrency(inputElement.value) // Parse from input value
				} else {
					// Fallback to any text content (like a span containing the value)
					unitCost = parseCurrency(unitCostCell.textContent)
				}
			}

			// TD5 typically holds total cost (in a span or directly)
			const totalCostCell = tds[5]
			if (totalCostCell) {
				// Try to get the formatted amount from span
				const spanElement = totalCostCell.querySelector('span')
				if (spanElement) {
					totalCost = parseCurrency(spanElement.textContent) // Parse from span
				} else {
					// Fallback to direct cell content
					totalCost = parseCurrency(totalCostCell.textContent)
				}
			}

			// Add row data if description is present & either units, unit cost, or total cost exists
			if (
				description &&
				(units !== null || unitCost !== null || totalCost !== null)
			) {
				// Add row to our data array
				mainData.push([
					currentDate,
					specificCategory,
					description,
					units,
					unitCost,
					totalCost
				])

				// Accumulate total if valid number
				if (typeof totalCost === 'number' && !isNaN(totalCost)) {
					overallBudgetTotal += totalCost
				}
			}
		}
	}) // --- End of Budget Summary row processing loop ---

	// --- Post-Loop Adjustments for Budget Summary Data ---
	console.log('Step 5c: Adjusting Budget Summary data - adding total rows...')

	// 1. Add the *specifically extracted* Hotel Total to the Overall Total (FIXED)
	if (
		typeof selectedHotelTotalCostForSummary === 'number' &&
		!isNaN(selectedHotelTotalCostForSummary)
	) {
		console.log(
			`Adding extracted hotel cost (${selectedHotelTotalCostForSummary}) to overall total.`
		)
		overallBudgetTotal += selectedHotelTotalCostForSummary
	} else {
		console.warn(
			"Hotel total cost was not extracted or invalid; it won't be added to the overall total separately."
		)
	}

	// 2. Prepend the Hotel Total Row (if extracted successfully)
	if (
		selectedHotelNameForSummary !== null &&
		selectedHotelTotalCostForSummary !== null
	) {
		mainData.unshift([
			// Add to beginning
			null, // Date
			'Selected Hotel', // Category
			selectedHotelNameForSummary, // Description
			null, // Units
			null, // Unit Cost
			selectedHotelTotalCostForSummary // Extracted Total Cost
		])
		console.log("Prepended 'Selected Hotel' total row.")
	} else {
		console.log('Skipped prepending hotel total row (data not extracted).')
	}

	// 3. Append the final Overall Budget Total Row
	mainData.push([
		// Add to end
		null, // Date
		null, // Category
		'TOTAL BUDGET', // Description (as requested)
		null, // Units
		null, // Unit Cost
		overallBudgetTotal // Final calculated total
	])
	console.log(
		`Appended 'TOTAL BUDGET' row. Final Calculated Total: ${overallBudgetTotal}`
	)

	// Add headers and finalized data to the 'Budget Summary' worksheet
	XLSX.utils.sheet_add_aoa(mainWs, [mainHeaders], { origin: 'A1' })
	if (mainData.length > 0) {
		XLSX.utils.sheet_add_aoa(mainWs, mainData, { origin: 'A2' })
	}

	// --- Step 6: Define and Apply Styles and Formats ---
	console.log('Step 6: Defining and applying styles...')
	/**
	 * Applies styling and formatting to a worksheet. Includes robust cell handling,
	 * explicit type setting, and formatting for various row types (headers, date, category, totals),
	 * including right-alignment for the Units column.
	 *
	 * @param ws - The worksheet object (`XLSX.WorkSheet`).
	 * @param headers - Array of header strings for the sheet.
	 * @param isMainSheet - Boolean flag for 'Budget Summary' specific logic.
	 */
	const applyStylesAndFormats = (
		ws: XLSX.WorkSheet,
		headers: string[],
		isMainSheet: boolean = false
	) => {
		// Exit if sheet/range invalid
		if (!ws || !ws['!ref']) {
			console.warn('Worksheet or range missing, cannot apply styles.')
			return
		}

		const range = XLSX.utils.decode_range(ws['!ref'])
		const merges: XLSX.Range[] = ws['!merges'] || []

		// --- Define Style Properties ---
		const headerFont = { bold: true, color: { rgb: 'FFFFFF' } }
		const headerFill = { patternType: 'solid', fgColor: { rgb: '4472C4' } } // Dark Blue
		const headerBorder = {
			top: { style: 'thin', color: { rgb: '000000' } },
			bottom: { style: 'thin', color: { rgb: '000000' } },
			left: { style: 'thin', color: { rgb: '000000' } },
			right: { style: 'thin', color: { rgb: '000000' } }
		}
		const headerAlign = { horizontal: 'center', vertical: 'center' }

		const baseBorder = {
			top: { style: 'thin', color: { rgb: 'D3D3D3' } },
			bottom: { style: 'thin', color: { rgb: 'D3D3D3' } },
			left: { style: 'thin', color: { rgb: 'D3D3D3' } },
			right: { style: 'thin', color: { rgb: 'D3D3D3' } }
		}

		const dateFill = { patternType: 'solid', fgColor: { rgb: 'D9D9D9' } } // Grey
		const dateFont = { bold: true, sz: 14 }
		const categoryFill = { patternType: 'solid', fgColor: { rgb: 'F0F0F0' } } // Light grey
		const categoryFont = { bold: true, sz: 12 }
		const totalFill = { patternType: 'solid', fgColor: { rgb: 'E2EFDA' } } // Light green
		const totalFont = { bold: true, sz: 12 }
		const oddRowFill = { patternType: 'solid', fgColor: { rgb: 'E9EDF4' } } // Light blue/grey
		const evenRowFill = { patternType: 'solid', fgColor: { rgb: 'FFFFFF' } } // White

		const currencyFormat = '€#,##0.00' // Example: Euro format
		const integerFormat = '#,##0'

		// --- Apply Header Styles (Row 0) ---
		for (let C = range.s.c; C <= range.e.c; ++C) {
			const cellRef = XLSX.utils.encode_cell({ r: 0, c: C })
			if (!ws[cellRef]) ws[cellRef] = { t: 's', v: headers[C] || '' }
			if (!ws[cellRef].s) ws[cellRef].s = {}
			ws[cellRef].s.font = headerFont
			ws[cellRef].s.fill = headerFill
			ws[cellRef].s.border = headerBorder
			ws[cellRef].s.alignment = headerAlign
		}

		// --- Apply Data Row Styles (Row 1 onwards) ---
		for (let R = range.s.r + 1; R <= range.e.r; ++R) {
			const rowValues: any[] = []
			let isAllNullOrEmpty = true
			for (let C = range.s.c; C <= range.e.c; ++C) {
				/* ... Check if row empty ... */
				const cellRef = XLSX.utils.encode_cell({ r: R, c: C })
				const cellValue = ws[cellRef]?.v
				if (cellValue !== null && cellValue !== undefined && cellValue !== '')
					isAllNullOrEmpty = false
				rowValues.push(cellValue)
			}
			if (isAllNullOrEmpty) continue

			// Determine Row Type (Main Sheet Only)
			let isDateRow = false,
				isCategoryRow = false,
				isTotalRow = false,
				isHotelTotalRow = false
			if (isMainSheet) {
				/* ... Determine row types based on content pattern ... */
				isDateRow = !!rowValues[0] && !rowValues[1] && !rowValues[2]
				isCategoryRow = !rowValues[0] && !!rowValues[1] && !rowValues[2]
				isTotalRow = rowValues[2] === 'TOTAL BUDGET'
				isHotelTotalRow = rowValues[1] === 'Selected Hotel'
			}

			// Determine Row Style Properties
			let rowFill = null,
				rowFont = null
			let rowAlign = { vertical: 'center', horizontal: 'left' } // Default

			if (isDateRow) {
				rowFont = dateFont
				rowFill = dateFill
			} else if (isCategoryRow) {
				rowFont = categoryFont
				rowFill = categoryFill
			} else if (isTotalRow || isHotelTotalRow) {
				rowFont = totalFont
				rowFill = totalFill
			} else {
				rowFill = R % 2 !== 0 ? oddRowFill : evenRowFill
			}

			// Add merges
			if (isDateRow && range.e.c > range.s.c) {
				merges.push({ s: { r: R, c: range.s.c }, e: { r: R, c: range.e.c } })
			}
			if (isCategoryRow && range.e.c > range.s.c + 1) {
				merges.push({
					s: { r: R, c: range.s.c + 1 },
					e: { r: R, c: range.e.c }
				})
			}

			// Apply Styles Cell by Cell
			for (let C = range.s.c; C <= range.e.c; ++C) {
				const cellRef = XLSX.utils.encode_cell({ r: R, c: C })
				// Ensure cell object exists
				if (!ws[cellRef]) {
					/* ... Create minimal cell if needed ... */
					if (
						(isDateRow || isCategoryRow) &&
						C > (isDateRow ? range.s.c : range.s.c + 1)
					) {
						ws[cellRef] = { t: 's', v: '' }
					} else {
						ws[cellRef] = { v: undefined }
					}
				}
				if (!ws[cellRef].s) ws[cellRef].s = {} // Ensure style object exists

				// Assign base row styles
				ws[cellRef].s.border = baseBorder
				if (rowFill) ws[cellRef].s.fill = rowFill
				if (rowFont) ws[cellRef].s.font = rowFont
				ws[cellRef].s.alignment = { ...rowAlign } // Start with default row align

				// Apply specific formatting
				const headerText = headers[C] || ''
				const cellValue = ws[cellRef].v

				// Explicitly set type
				if (typeof cellValue === 'number') ws[cellRef].t = 'n'
				else if (typeof cellValue === 'boolean') ws[cellRef].t = 'b'
				else if (cellValue instanceof Date) ws[cellRef].t = 'd'
				else if (typeof cellValue === 'string' && !ws[cellRef].t)
					ws[cellRef].t = 's'

				// Apply number formats and alignment overrides
				if (ws[cellRef].t === 'n') {
					if (headerText.includes('Cost') || headerText.includes('Total'))
						ws[cellRef].z = currencyFormat
					else if (headerText === 'Units' || headerText === 'Nights')
						ws[cellRef].z = integerFormat
					// Right-align all numbers
					ws[cellRef].s.alignment = {
						...ws[cellRef].s.alignment,
						horizontal: 'right'
					}
				} else if (ws[cellRef].t === 's') {
					// Special case: ALWAYS right-align Units column regardless of content type
					if (C === 3 || headerText === 'Units') {
						// Using column index 3 (fourth column) for Units
						ws[cellRef].s.alignment = {
							...ws[cellRef].s.alignment,
							horizontal: 'right'
						}
					}
					// Left-align other standard text
					else if (
						!isDateRow &&
						!isCategoryRow &&
						!isTotalRow &&
						!isHotelTotalRow
					) {
						ws[cellRef].s.alignment = {
							...ws[cellRef].s.alignment,
							horizontal: 'left'
						}
					}
					// Center "TOTAL BUDGET" description text
					if (isTotalRow && headerText === 'Description') {
						ws[cellRef].s.alignment = {
							...ws[cellRef].s.alignment,
							horizontal: 'center'
						}
					}
				}
			} // End cell loop
		} // End row loop

		// Apply merges
		if (merges.length > 0) {
			ws['!merges'] = merges
		}
	} // End of applyStylesAndFormats

	// --- Step 7: Define Column Widths ---
	console.log('Step 7: Setting column widths...')
	mainWs['!cols'] = [
		{ wch: 15 },
		{ wch: 25 },
		{ wch: 40 },
		{ wch: 10 },
		{ wch: 15 },
		{ wch: 15 }
	]
	hotelWs['!cols'] = [
		{ wch: 30 },
		{ wch: 30 },
		{ wch: 10 },
		{ wch: 10 },
		{ wch: 15 },
		{ wch: 15 }
	]

	// --- Step 8: Apply Styles to Both Sheets ---
	console.log('Step 8: Applying styles and formats to worksheets...')
	applyStylesAndFormats(mainWs, mainHeaders, true)
	applyStylesAndFormats(hotelWs, hotelHeaders, false)

	// --- Step 9: Add Sheets to Workbook ---
	console.log('Step 9: Adding sheets to workbook...')
	XLSX.utils.book_append_sheet(wb, mainWs, 'Budget Summary')
	XLSX.utils.book_append_sheet(wb, hotelWs, 'Accommodation')

	// --- Step 10: Set Workbook Properties ---
	console.log('Step 10: Setting workbook properties...')
	wb.Props = {
		Title: 'Budget Export',
		Subject: 'Budget Details',
		Author: 'Budget Tool v3.2',
		CreatedDate: new Date()
	}

	// --- Step 11: Export and Trigger Download ---
	console.log('Step 11: Writing Excel file and triggering download...')
	try {
		XLSX.writeFile(wb, 'budget_export.xlsx', { bookSST: true })
		console.log('Excel export process completed successfully.')
	} catch (error) {
		console.error('Error writing or downloading Excel file:', error)
		alert('Error creating Excel file. Please check console for details.')
	}
} // === END of exportTableToExcel ===
