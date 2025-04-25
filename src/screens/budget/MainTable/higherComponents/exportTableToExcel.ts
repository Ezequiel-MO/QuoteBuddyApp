import * as XLSX from 'xlsx'
import accounting from 'accounting'

// Helper function to safely parse currency
const parseCurrency = (value: string | null | undefined): number | null => {
	if (!value) return null
	const cleanedValue = value.replace(/[^\d.-]/g, '').trim()
	const number = parseFloat(cleanedValue)
	return isNaN(number) ? null : number
}

// Helper function to format currency
const formatCurrency = (value: number | null | undefined): string => {
	if (value === null || value === undefined) return ''
	return accounting.formatMoney(value, '€')
}

export const exportTableToExcel = () => {
	const budgetElement = document.getElementById('budget_id')
	const table: HTMLElement | null =
		budgetElement?.querySelector('table') || null
	if (!table) {
		console.error('Budget table not found')
		return
	}

	// Create a deep clone of the table
	const clonedTable: HTMLElement = table.cloneNode(true) as HTMLElement

	// Create a new workbook
	const wb = XLSX.utils.book_new()

	// Create two separate worksheets
	const mainWs = XLSX.utils.aoa_to_sheet([])
	const hotelWs = XLSX.utils.aoa_to_sheet([])

	// Process Select Elements
	const selectOptionsMap = new Map<
		HTMLSelectElement,
		Array<{ value: string; text: string }>
	>()
	clonedTable.querySelectorAll('select').forEach((select) => {
		const options = Array.from(select.options).map((opt) => ({
			value: opt.value,
			text: opt.text
		}))
		selectOptionsMap.set(select, options)
		const selectedText = select.options[select.selectedIndex]?.text || ''
		const textNode = document.createTextNode(selectedText)
		select.parentNode?.replaceChild(textNode, select)
	})

	// Remove unwanted UI elements from the clone
	clonedTable
		.querySelectorAll(
			'.icon, button, svg, [aria-hidden="true"], [data-testid="visibility-container"] .transition-all > div > table > thead'
		)
		.forEach((el) => el.remove())

	// Process Accommodation Tab
	const hotelHeaders = [
		'Hotel Name',
		'Room Type',
		'Units',
		'Nights',
		'Cost per Night',
		'Total Cost'
	]
	XLSX.utils.sheet_add_aoa(hotelWs, [hotelHeaders], { origin: 'A1' })
	let hotelRow = 2
	let hotelData: any[][] = []
	let currentHotelNameForBreakdown = ''

	clonedTable.querySelectorAll('tbody > tr').forEach((tr) => {
		const isHotelSummary =
			tr.classList.contains('total-row') &&
			tr.nextElementSibling?.classList.contains('breakdown-row')

		if (isHotelSummary) {
			const hotelNameCell = tr.querySelector('td:nth-child(3)')
			currentHotelNameForBreakdown =
				hotelNameCell?.textContent?.trim() || 'Hotel Name Not Found'
		}

		if (tr.classList.contains('breakdown-row')) {
			const breakdownTable = tr.querySelector('table')
			if (breakdownTable && currentHotelNameForBreakdown) {
				breakdownTable.querySelectorAll('tbody tr').forEach((breakdownTr) => {
					const cells = breakdownTr.querySelectorAll('td')
					if (cells.length >= 5) {
						const row = [
							currentHotelNameForBreakdown,
							cells[0]?.textContent?.trim() || '-',
							cells[1]?.textContent?.trim() || '-',
							cells[2]?.textContent?.trim() || '-',
							parseCurrency(cells[3]?.textContent),
							parseCurrency(cells[4]?.textContent)
						]
						hotelData.push(row)
					}
				})
				hotelData.push([])
				currentHotelNameForBreakdown = ''
			}
		}
	})

	if (hotelData.length > 0) {
		XLSX.utils.sheet_add_aoa(hotelWs, hotelData, { origin: `A${hotelRow}` })
	}

	// Process Budget Summary Tab
	const mainHeaders = [
		'Date',
		'Category',
		'Description',
		'Units',
		'Unit Cost',
		'Total Cost'
	]
	XLSX.utils.sheet_add_aoa(mainWs, [mainHeaders], { origin: 'A1' })
	let mainData: any[][] = []
	let currentDate = ''

	clonedTable.querySelectorAll('tbody > tr').forEach((tr) => {
		const dividerElem = tr.querySelector('h3')
		if (dividerElem) {
			currentDate = dividerElem.textContent?.trim() || ''
			return
		}

		if (
			tr.classList.contains('breakdown-row') ||
			tr.textContent?.includes('Note:')
		)
			return

		const tds = tr.querySelectorAll('td')
		if (tds.length < 5) return

		const category = tds[1]?.textContent?.trim() || ''
		const description = tds[2]?.textContent?.trim() || ''
		const units = tds[3]?.textContent?.trim() || ''
		const unitCostNum = parseCurrency(tds[4]?.textContent)
		const totalCostNum = parseCurrency(tds[5]?.textContent)

		if (!category) return

		mainData.push([
			currentDate,
			category,
			description,
			units,
			unitCostNum,
			totalCostNum
		])
	})

	if (mainData.length > 0) {
		XLSX.utils.sheet_add_aoa(mainWs, mainData, { origin: 'A2' })
	}

	// Update column widths
	mainWs['!cols'] = [
		{ wch: 15 },
		{ wch: 25 },
		{ wch: 35 },
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

	// Apply Styles
	const applyStyles = (
		ws: XLSX.WorkSheet,
		headers: string[],
		data: any[][]
	) => {
		// Header styles
		const headerStyle = {
			font: { bold: true, color: { rgb: 'FFFFFF' } },
			fill: { patternType: 'solid', fgColor: { rgb: '4472C4' } },
			border: {
				top: { style: 'thin', color: { rgb: '000000' } },
				bottom: { style: 'thin', color: { rgb: '000000' } },
				left: { style: 'thin', color: { rgb: '000000' } },
				right: { style: 'thin', color: { rgb: '000000' } }
			},
			alignment: { horizontal: 'center', vertical: 'center' }
		}

		for (let C = 0; C < headers.length; ++C) {
			const cellRef = XLSX.utils.encode_cell({ r: 0, c: C })
			if (ws[cellRef]) {
				ws[cellRef].s = headerStyle
			}
		}

		// Data row styles
		for (let R = 0; R < data.length; ++R) {
			const row = data[R]
			const isCategoryRow = row.length === 1 && row[0]
			const isTotalRow = headers.length > 3 && row[3] === 'TOTAL BUDGET'
			const isBlankRow = row.length === 0

			if (isBlankRow) continue

			for (let C = 0; C < headers.length; ++C) {
				const cellRef = XLSX.utils.encode_cell({ r: R + 1, c: C })
				if (ws[cellRef]) {
					const baseStyle = {
						fill: { patternType: 'solid', fgColor: { rgb: 'FFFFFF' } },
						border: {
							bottom: { style: 'thin', color: { rgb: 'D3D3D3' } }
						},
						alignment: { vertical: 'center' }
					}

					if (isCategoryRow) {
						baseStyle.font = { bold: true, sz: 14 }
						baseStyle.fill = {
							patternType: 'solid',
							fgColor: { rgb: 'F0F0F0' }
						}
						baseStyle.alignment.horizontal = 'left'
					} else if (isTotalRow) {
						baseStyle.font = { bold: true, sz: 12 }
						baseStyle.fill = {
							patternType: 'solid',
							fgColor: { rgb: 'E2EFDA' }
						}
					} else if (R % 2 === 0) {
						baseStyle.fill = {
							patternType: 'solid',
							fgColor: { rgb: 'E9EDF4' }
						}
					}

					// Apply currency formatting
					if (
						typeof ws[cellRef].v === 'number' &&
						(headers[C].includes('Cost') || headers[C].includes('Total'))
					) {
						ws[cellRef].z = '€#,##0.00'
						baseStyle.alignment.horizontal = 'right'
					}

					ws[cellRef].s = baseStyle
				}
			}
		}
	}

	applyStyles(mainWs, mainHeaders, mainData)
	applyStyles(hotelWs, hotelHeaders, hotelData)

	// Add tabs to workbook
	XLSX.utils.book_append_sheet(wb, mainWs, 'Budget Summary')
	XLSX.utils.book_append_sheet(wb, hotelWs, 'Accommodation')

	// Add properties to the workbook
	wb.Props = {
		Title: 'Budget Export',
		Subject: 'Budget Details',
		Author: 'Budget Tool',
		CreatedDate: new Date()
	}

	// Export to file
	XLSX.writeFile(wb, 'budget.xlsx')
}
