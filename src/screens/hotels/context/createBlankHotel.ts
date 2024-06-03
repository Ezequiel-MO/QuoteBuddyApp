import { IHotel } from '@interfaces/hotel'

export function createBlankHotel(): IHotel {
	return {
		name: '',
		city: '',
		address: '',
		numberStars: 0,
		numberRooms: 0,
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
			type: '',
			coordinates: []
		},
		introduction: [],
		price: [],
		availableLanguages: [],
		descriptions: []
	}
}
