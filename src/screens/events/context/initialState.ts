import * as typescript from './contextinterfaces'

const initialState: typescript.ActivityState = {
	activities: [],
	currentActivity: {
		name: '',
		city: '',
		textContent: '',
		imageContentUrl: [],
		location: {
			type: 'Point',
			coordinates: []
		},
		pricePerPerson: false,
		price: 0,
		regular: false,
		introduction: [], //flagged to be deleted
		descriptions: [],
		imageUrlCaptions: []
	},
	update: false,
	imagesModal: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
