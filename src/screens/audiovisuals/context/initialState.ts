import * as typescript from './contextinterfaces'

const initialState: typescript.AudiovisualState = {
	audiovisuals: [],
	currentAudiovisual: {
		name: '',
		city: '',
		textContent: '',
		equipmentList: [
			{
				id: Date.now().toString(),
				name: '',
				quantity: 0,
				dailyRate: 0,
				halfDayRate: 0,
				setupCost: 0,
				staffCost: 0,
				transportationCost: 0,
				notes: ''
			}
		],
		imageContentUrl: [],
		location: {
			type: 'Point',
			coordinates: []
		}
	},
	update: false,
	imagesModal: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
