import * as typescript from './contextinterfaces'

const initialState: typescript.AccManagerState = {
	accManagers: [],
	currentAccManager: {
		firstName: '',
		familyName: '',
		email: '',
		imageContentUrl: [],
		deletedImage: null
	},
	update: false,
	imagesModal: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
