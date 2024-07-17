import * as typescript from './contextinterfaces'

const initialState: typescript.CountryState = {
	countries: [],
	currentCountry: {
		name: '',
		accessCode: '',
		quoteLanguage: 'EN'
	},
	update: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
