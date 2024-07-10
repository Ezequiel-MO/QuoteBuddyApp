import * as typescript from './contextinterfaces'

const initialState: typescript.ClientState = {
	clients: [],
	currentClient: {
		firstName: '',
		familyName: '',
		email: '',
		phone: '',
		country: '',
		quoteLanguage: 'EN',
		clientCompany: '',
		origin: { method: 'Recommendation' },
		qualification: { status: 'NeverRequested' },
		clientNotes: []
	},
	update: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
