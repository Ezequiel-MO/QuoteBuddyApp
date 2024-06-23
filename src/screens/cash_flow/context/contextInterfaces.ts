import { IPayment } from '@interfaces/payment'
import { IVendorInvoice } from "src/interfaces/vendorInvoice"


export interface PaymentState {
	payment: Partial<IVendorInvoice> | null
}

export type PaymentAction =
	| { type: 'ADD_PAYMENT'; payload: IVendorInvoice }
	| {
			type: 'UPDATE_PAYMENT_FIELD'
			payload: { name: keyof IVendorInvoice; value: any }
	  }
	| { type: 'DELETE_PAYMENT'; payload: string }
