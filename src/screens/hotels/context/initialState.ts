import * as typescript from './contextinterfaces'

const initialState: typescript.HotelState = {
	hotels: null,
	currentHotel: {
		name: '',
		city: '',
		address: '',
		numberStars: 0,
		numberRooms: 0 as number,
		checkin_out: '',
		meetingRooms: '',
		wheelChairAccessible: false,
		wifiSpeed: '',
		swimmingPool: '',
		restaurants: '',
		textContent: '',
		imageContentUrl: [],
		meetingImageContentUrl: [],
		meetingDetails: {
			capacity: 0,
			naturalLight: false,
			size: 0,
			visibility: 'good',
			generalComments: ''
		},
		location: {
			type: 'Point',
			coordinates: []
		},
		introduction: [],
		price: [],
		availableLanguages: [],
		descriptions: []
	},
	update: false,
	imagesModal: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
