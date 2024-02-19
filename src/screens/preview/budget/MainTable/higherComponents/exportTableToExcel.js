import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'

export const exportTableToExcel = () => {
  const tableElement = document.getElementById('budget-table')
  const wb = XLSX.utils.table_to_book(tableElement, { sheet: 'Sheet1' })
  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  saveAs(
    new Blob([wbout], { type: 'application/octet-stream' }),
    'table_data.xlsx'
  )
}
