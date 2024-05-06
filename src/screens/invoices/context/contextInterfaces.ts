import { IInvoice } from '@interfaces/invoice'

export interface InvoiceState {
	currentInvoice: Partial<IInvoice> | null
}

export type InvoiceAction =
	| { type: 'SET_INVOICE'; payload: IInvoice }
	| {
			type: 'UPDATE_INVOICE_FIELD'
			payload: { name: keyof IInvoice; value: any }
	  }
	| { type: 'CLEAR_INVOICE' }
