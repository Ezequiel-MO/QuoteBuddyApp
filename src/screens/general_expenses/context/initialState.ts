import * as typescript from './contextinterfaces'

const initialState: typescript.GeneralExpensesState = {
	expenses: [],
	currentExpense: {
		name: '',
		description: '',
		category: 'other',
		imageContentUrl: [],
		vendorInvoices: [],
		isDeleted: false
	},
	update: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
