import * as typescript from './contextinterfaces'

const initialState: typescript.CompanyState = {
	companies: [],
	currentCompany: {
		name: '',
		address: '',
		postCode: '',
		VATNr: '',
		colorPalette: [],
		fonts: [],
		employees: [],
		country: ''
	},
	update: false,
	renderAddClientInForm: true,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
