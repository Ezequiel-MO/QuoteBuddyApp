import { IVendorInvoice } from "src/interfaces/vendorInvoice"
import { IPayment } from "src/interfaces/payment"


export interface VendorInvoiceState {
	vendorInvoice: Partial<IVendorInvoice> | null
	payment: Partial<IPayment> | null
}

export type VendorInvoiceAction =
	| { type: 'ADD_VENDORINVOICE'; payload: IVendorInvoice }
	| {
		type: 'UPDATE_VENDORINVOICE_FIELD'
		payload: { name: keyof IVendorInvoice; value: any }
	}
	| {
		type: "UPDATE_VENDORINVOICE"
		payload: {
			vendorInvoiceUpdate: IVendorInvoice
		}
	}
	| {
		type: 'DELETE_PAYMENT'
		payload: {
			updatedPayments: IPayment[]
		}
	}
	| {
		type: "ADD_PAYMENT"
		payload: IPayment
	}
	| {
		type: 'UPDATE_PAYMENT_FIELD'
		payload: { name: keyof IPayment; value: any }
	}
	| {
		type: "ADD_PAYMENT_TO_VENDORINVOICE"
		payload: {
			payment: IPayment
		}
	}
	| {
		type: "UPDATE_PAYMENT"
		payload: {
			paymentUpdate: IPayment
		}
	}
	| {
		type: "UPDATE_PAYMENT_TO_VENDORINVOICE"
		payload: {
			payment: IPayment
		}
	}
