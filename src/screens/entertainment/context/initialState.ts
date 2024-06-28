import * as typescript from './contextinterfaces'

const initialState: typescript.EntertainmentState = {
	entertainments: null,
	currentEntertainment: {
		vendor: '',
		city: '',
		name: '',
		contact: '',
		email: '',
		category: 'Other',
		duration: '',
		nrArtists: '',
		textContent: '',
		price: {
			artistsFee: 0,
			aavv: 0,
			lighting: 0,
			travelAllowance: 0,
			mealAllowance: 0,
			other: 0
		},
		imageContentUrl: [],
		descriptions: [],
		availableLanguages: [],
		updatedAt: ''
	},
	update: false,
	imagesModal: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
