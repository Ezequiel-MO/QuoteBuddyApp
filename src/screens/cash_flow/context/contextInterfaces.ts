import { IVendorInvoice } from 'src/interfaces/vendorInvoice'
import { IPayment } from 'src/interfaces/payment'

export interface VendorInvoiceState {
	vendorInvoice: Partial<IVendorInvoice> | null
	vendorInvoices: IVendorInvoice[]
	payment: Partial<IPayment> | null
	update: boolean
	// imagesModal: boolean
	totalPages: number
	page: number
	vendorTypeFilter: string
	vendorIdFilter: string
	projectIdFilter: string
	searchTerm: string
}

export type VendorInvoiceAction =
	| { type: 'SET_VENDORINVOICES'; payload: IVendorInvoice[] }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'ADD_VENDORINVOICE'; payload: IVendorInvoice }
	| {
			type: 'UPDATE_VENDORINVOICE_FIELD'
			payload: {
				name: keyof IVendorInvoice
				value: IVendorInvoice[keyof IVendorInvoice]
			}
	  }
	| {
			type: 'UPDATE_VENDORINVOICE'
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
			type: 'ADD_PAYMENT'
			payload: IPayment
	  }
	| {
			type: 'UPDATE_PAYMENT_FIELD'
			payload: { name: keyof IPayment; value: IPayment[keyof IPayment] }
	  }
	| {
			type: 'ADD_PAYMENT_TO_VENDORINVOICE'
			payload: {
				payment: IPayment
			}
	  }
	| {
			type: 'UPDATE_PAYMENT'
			payload: {
				paymentUpdate: IPayment
			}
	  }
	| {
			type: 'UPDATE_PAYMENT_TO_VENDORINVOICE'
			payload: {
				payment: IPayment
			}
	  }
	| {
			type: 'SET_FILTER'
			payload: {
				name: 'vendorTypeFilter' | 'vendorIdFilter' | 'projectIdFilter'
				value: string
			}
	  }
