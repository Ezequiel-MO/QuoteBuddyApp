import * as typescript from './contextinterfaces'

const initialState: typescript.SupplierState = {
	suppliers: [],
	currentSupplier: {
		legalName: '',
		vendorId: '',
		VATNr: '',
		contactPerson: '',
		contactNumber: '',
		contactEmail: '',
		address: '',
		city: '',
		postalCode: '',
		IBAN: '',
		country: '',
		isDeleted: false,
		softDelete: async () => {}
	},
	update: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
