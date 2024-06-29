import { IVendorInvoice } from "src/interfaces/vendorInvoice"


export interface VendorInvoiceState {
	vendorInvoice: Partial<IVendorInvoice> | null
}

export type VendorInvoiceAction =
	| { type: 'ADD_PAYMENT'; payload: IVendorInvoice }
	| {
		type: 'UPDATE_PAYMENT_FIELD'
		payload: { name: keyof IVendorInvoice; value: any }
	}
	| {
		type: "UPDATE_VENDORINVOICE"
		payload: {
			vendorInvoiceUpdate: IVendorInvoice
		}
	}
	| { type: 'DELETE_PAYMENT'; payload: string }
