import { IInvoice } from '@interfaces/invoice'
import {
	InvoiceAction,
	UPDATE_INVOICE_FIELD,
	UpdateInvoiceFieldAction
} from './Actions'

export const invoiceReducer = (
	state: IInvoice,
	action: InvoiceAction
): IInvoice => {
	switch (action.type) {
		case UPDATE_INVOICE_FIELD:
			const { field, value } = (action as UpdateInvoiceFieldAction).payload
			return { ...state, [field]: value }

		default:
			return state
	}
}
