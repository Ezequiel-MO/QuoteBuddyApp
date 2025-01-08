import { IEvent } from '@interfaces/event'
import { IGift } from '@interfaces/gift'
import { IHotel } from '@interfaces/hotel'
import { IMeeting } from '@interfaces/meeting'
import { IDay } from '@interfaces/project'
import { IRestaurant } from '@interfaces/restaurant'
import { ITransfer } from '@interfaces/transfer'

export const starterGift: IGift = {
	_id: 'gift-1',
	name: 'Test Gift',
	qty: 1,
	price: 100,
	textContent: 'Sample Gift Content',
	imageContentUrl: ['http://example.com/gift.jpg']
}

export const starterTransfer: ITransfer = {
	_id: '1',
	city: 'Sample City',
	company: 'Sample Company',
	transfer_in: 100,
	transfer_out: 120,
	dispo_4h: 100,
	hextra: 100,
	hextra_night: 100,
	dispo_5h_out: 100,
	dispo_4h_airport: 100,
	dispo_4h_night: 100,
	transfer_in_out_night: 100,
	dispo_6h: 100,
	dispo_6h_night: 100,
	dispo_9h: 100,
	vehicleType: 'Sample Vehicle',
	vehicleCapacity: 100,
	nrVehicles: 100,
	meetGreet: 2,
	meetGreetCost: 100,
	assistance: 2,
	assistanceCost: 100,
	selectedService: 'dispo_4h'
}

export const starterHotel: IHotel = {
	_id: '1',
	name: 'Sample Hotel',
	city: 'Sample City',
	address: 'Sample Address',
	numberStars: 5,
	numberRooms: 100,
	checkin_out: 'Sample Checkin/Checkout',
	meetingRooms: 'Sample Meeting Rooms',
	wheelChairAccessible: true,
	wifiSpeed: 'Sample Wifi Speed',
	swimmingPool: 'Sample Swimming Pool',
	restaurants: 'Sample Restaurants',
	textContent: 'Sample Hotel Content',
	imageContentUrl: ['http://example.com/hotel.jpg'],
	meetingImageContentUrl: ['http://example.com/meeting.jpg'],
	meetingDetails: {
		capacity: 100,
		naturalLight: true,
		size: 100,
		visibility: 'good',
		generalComments: 'Sample General Comments'
	},
	location: {
		type: 'Point',
		coordinates: [100, 100]
	},
	introduction: ['Sample Introduction'],
	price: [
		{
			DUInr: 100,
			DUIprice: 100,
			DoubleRoomNr: 100,
			DoubleRoomPrice: 100,
			breakfast: 100,
			DailyTax: 100
		}
	],
	deletedImage: ['http://example.com/deleted.jpg'],
	availableLanguages: ['English'],
	descriptions: []
}

export const starterSchedule: IDay[] = [
	{
		_id: '',
		date: '',
		fullDayMeetings: {
			intro: '',
			meetings: []
		},
		morningMeetings: {
			intro: '',
			meetings: []
		},
		morningEvents: {
			intro: '',
			events: []
		},
		afternoonMeetings: {
			intro: '',
			meetings: []
		},
		afternoonEvents: {
			intro: '',
			events: []
		},
		lunch: {
			intro: '',
			included: true,
			restaurants: []
		},
		dinner: {
			intro: '',
			included: false,
			restaurants: []
		},
		transfer_in: [],
		transfer_out: [],
		overnight: {
			intro: '',
			hotels: []
		},
		itinerary: {
			intro: '',
			itinerary: [],
			morningActivity: {
				intro: '',
				events: []
			},
			afternoonActivity: {
				intro: '',
				events: []
			},
			nightActivity: {
				intro: '',
				events: []
			},
			lunch: {
				intro: '',
				included: true,
				restaurants: []
			},
			dinner: {
				intro: '',
				included: false,
				restaurants: []
			},
			starts: '',
			ends: ''
		}
	},
	{
		_id: '',
		date: '',
		fullDayMeetings: {
			intro: '',
			meetings: []
		},
		morningMeetings: {
			intro: '',
			meetings: []
		},
		morningEvents: {
			intro: '',
			events: []
		},
		afternoonMeetings: {
			intro: '',
			meetings: []
		},
		afternoonEvents: {
			intro: '',
			events: []
		},
		lunch: {
			intro: '',
			included: true,
			restaurants: []
		},
		dinner: {
			intro: '',
			included: false,
			restaurants: []
		},
		transfer_in: [],
		transfer_out: [],
		overnight: {
			intro: '',
			hotels: []
		},
		itinerary: {
			intro: '',
			itinerary: [],
			morningActivity: {
				intro: '',
				events: []
			},
			afternoonActivity: {
				intro: '',
				events: []
			},
			nightActivity: {
				intro: '',
				events: []
			},
			lunch: {
				intro: '',
				included: true,
				restaurants: []
			},
			dinner: {
				intro: '',
				included: false,
				restaurants: []
			},
			starts: 'morning',
			ends: 'night'
		}
	}
]

export const starterMeeting: IMeeting = {
	_id: 'meeting-1',
	hotel: [],
	hotelName: 'Mock Hotel Name',
	roomCapacity: 100,
	HDRate: 100.0,
	FDRate: 150.0,
	HDDDR: 200.0,
	FDDDR: 250.0,
	coffeeBreakUnits: 50,
	coffeeBreakPrice: 5.0,
	workingLunchUnits: 50,
	workingLunchPrice: 10.0,
	aavvPackage: 200.0,
	hotelDinnerUnits: 50,
	hotelDinnerPrice: 15.0,
	imageContentUrl: ['url1', 'url2'],
	introduction: 'This is a mock meeting.'
}

export const starterEvent: IEvent = {
	_id: 'event-1',
	name: 'Mock Event',
	city: 'Mock City',
	textContent: 'This is a sample event for testing purposes.',
	imageContentUrl: [
		'http://example.com/image1.jpg',
		'http://example.com/image2.jpg'
	],
	pricePerPerson: true,
	coordsActive: false,
	price: 150,
	regular: true,
	location: {
		type: 'Point',
		coordinates: [40.7128, -74.006]
	},
	introduction: ['Welcome to the Mock Event!', 'Enjoy your time here!'],
	transfer: [],
	availableLanguages: ['en', 'es'],
	descriptions: [],
	participants: 100,
	updatedAt: '2025-01-01T10:00:00Z'
}

export const starterRestaurant: IRestaurant = {
	_id: 'rest-1',
	name: 'Mock Restaurant',
	city: 'Test City',
	location: {
		type: 'Point',
		coordinates: [0, 0]
	},
	price: 100,
	isVenue: false,
	availableLanguages: [],
	descriptions: []
}
