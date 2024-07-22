import * as typescript from './contextinterfaces'

const initialState: typescript.GiftState = {
	gifts: [],
	currentGift: {
		name: '',
		qty: 1,
		price: 0,
		textContent: '',
		imageContentUrl: []
	},
	update: false,
	imagesModal: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
