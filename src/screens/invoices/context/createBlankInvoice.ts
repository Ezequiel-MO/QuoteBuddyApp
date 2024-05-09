// Assuming the necessary imports are already in place
import { IInvoice } from '@interfaces/invoice'

export function createBlankInvoice(): IInvoice {
	const todayDate = new Date().toISOString().slice(0, 10)

	return {
		status: 'posting',
		date: todayDate,
		projectCode: '',
		client: '',
		company: '',
		address: '',
		postCode: '',
		reference: '',
		VATNr: '',
		invoiceNumber: '',
		lineDate: todayDate,
		lineText: '',
		taxBreakdown: false,
		taxBase: 0,
		taxRate: 21,
		taxAmount: 0,
		taxBase21: 0,
		taxBase10: 0,
		expenses: 0,
		lineAmount: 0,
		linesBreakdown: false,
		breakdownLines: [],
		currency: 'EUR'
	}
}
