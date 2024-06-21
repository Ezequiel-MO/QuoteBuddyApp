import * as typescript from './contextinterfaces'

const initialState: typescript.RestaurantState = {
	restaurants: null,
	currentRestaurant: {
		name: '',
		city: '',
		textContent: '',
		imageContentUrl: [],
		location: {
			type: 'Point',
			coordinates: []
		},
		pdfMenus: [],
		price: 0,
		availableLanguages: [],
		introduction: [],
		isVenue: false,
		entertainment: [],
		venue_price: {
			rental: 0,
			cocktail_units: 0,
			cocktail_price: 0,
			catering_units: 0,
			catering_price: 0,
			staff_units: 0,
			staff_menu_price: 0,
			audiovisuals: 0,
			cleaning: 0,
			security: 0,
			entertainment: 0
		},
		transfer: [],
		descriptions: [],
		participants: 0
	},
	update: false,
	imagesModal: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
