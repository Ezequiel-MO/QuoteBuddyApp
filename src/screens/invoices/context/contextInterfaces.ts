import { IInvoice, IInvoiceBreakdownLine } from '@interfaces/invoice'

export interface InvoiceState {
	invoices: IInvoice[];
	currentInvoice: Partial<IInvoice> | null;
	totalPages: number;
	page: number;
	searchTerm: string
}

export type InvoiceAction =
	{ type: 'SET_INVOICES'; payload: IInvoice[] }
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
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
