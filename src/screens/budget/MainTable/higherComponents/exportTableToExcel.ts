import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

export const exportTableToExcel = (): void => {
	const tableElement: HTMLElement | null =
		document.getElementById('budget-table')
	if (!tableElement) {
		console.error('Table element not found')
		return
	}

	const wb: XLSX.WorkBook = XLSX.utils.table_to_book(tableElement, {
		sheet: 'Sheet1'
	})

	// Optional: Define the worksheet for easier access
	const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]]

	// Set custom column widths
	ws['!cols'] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 25 }]

	// Apply styles
	XLSX.utils.sheet_add_aoa(ws, [['Header1', 'Header2', 'Header3', 'Header4']], {
		origin: 'A1'
	})
	const headerRange: XLSX.Range = XLSX.utils.decode_range('A1:D1')
	for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
		const address: string = XLSX.utils.encode_col(C) + '1' // Get Excel-style cell reference
		if (!ws[address]) continue
		ws[address].s = {
			// Style object
			font: { bold: true },
			fill: {
				fgColor: { rgb: 'FFFFAA00' } // Example: orange background
			},
			alignment: {
				horizontal: 'center',
				vertical: 'center'
			}
		}
	}

	const wbout: ArrayBuffer = s2ab(
		XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
	)
	saveAs(
		new Blob([wbout], { type: 'application/octet-stream' }),
		'table_data.xlsx'
	)
}

// Utility to convert string to ArrayBuffer
function s2ab(s: string): ArrayBuffer {
	const buf: ArrayBuffer = new ArrayBuffer(s.length)
	const view: Uint8Array = new Uint8Array(buf)
	for (let i = 0; i < s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
	return buf
}
