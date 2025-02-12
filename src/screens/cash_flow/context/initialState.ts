import * as typescript from './contextInterfaces'

export const initialState: typescript.VendorInvoiceState = {
	currentVendorInvoice: null,
	payment: null,
	vendorInvoices: [],
	update: false,
	totalPages: 1,
	page: 1,
	searchTerm: '',
	vendorTypeFilter: '',
	projectIdFilter: '',
	vendorIdFilter: ''
}
