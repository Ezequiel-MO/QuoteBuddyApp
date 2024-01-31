import { IInvoice } from '@interfaces/invoice'

export interface InvoiceAction {
	type: string
	payload?: any
}

export const UPDATE_INVOICE_FIELD = 'UPDATE_INVOICE_FIELD'

export interface UpdateInvoiceFieldAction {
	type: typeof UPDATE_INVOICE_FIELD
	payload: {
		field: keyof IInvoice
		value: any
	}
}
