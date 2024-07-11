import { count } from 'console'
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
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
