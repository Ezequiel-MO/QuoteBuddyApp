import * as typescript from './contextinterfaces'

const initialState: typescript.LocationState = {
	locations: [],
	currentLocation: {
		name: '',
		country: '',
		textContent: '',
		location: {
			type: 'Point',
			coordinates: []
		},
		inFigures: [],
		corporateFacts: [],
		imageContentUrl: []
	},
	update: false,
	imagesModal: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
