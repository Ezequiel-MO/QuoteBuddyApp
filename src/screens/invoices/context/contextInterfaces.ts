import { IInvoice, IInvoiceBreakdownLine } from '@interfaces/invoice'

export interface InvoiceState {
	currentInvoice: Partial<IInvoice> | null
}

export type InvoiceAction =
	| { type: 'SET_INVOICE'; payload: IInvoice }
	| {
			type: 'UPDATE_INVOICE_FIELD'
			payload: { name: keyof IInvoice; value: any }
	  }
	| { type: 'INCREMENT_INVOICE_NUMBER'; payload?: IInvoice[] }
	| { type: 'ADD_BREAKDOWN_LINE'; payload: { newLine: IInvoiceBreakdownLine } }
	| {
			type: 'UPDATE_BREAKDOWN_LINE'
			payload: { lineId: string; newLine: IInvoiceBreakdownLine }
	  }
	| {
			type: 'DELETE_BREAKDOWN_LINE'
			payload: { lineId: string }
	  }
	| { type: 'CLEAR_INVOICE' }
