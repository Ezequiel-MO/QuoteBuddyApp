import { IClient } from '@interfaces/client'
import { IClientCompany } from '@interfaces/clientCompany'
import { ICollectionFromClient } from '@interfaces/collectionFromClient'
import { IEntertainment } from '@interfaces/entertainment'
import { IEvent } from '@interfaces/event'
import { IGift } from '@interfaces/gift'
import { IHotel, IHotelPrice } from '@interfaces/hotel'
import { IInvoice } from '@interfaces/invoice'
import { IMeeting } from '@interfaces/meeting'
import { IPayment } from '@interfaces/payment'
import { IDay, IProject } from '@interfaces/project'
import { IRestaurant } from '@interfaces/restaurant'
import { ITransfer } from '@interfaces/transfer'
import { IUser } from '@interfaces/user'
import { IVendorInvoice } from '@interfaces/vendorInvoice'

export const starterGift: IGift = {
	_id: 'gift-1',
	name: 'Test Gift',
	qty: 1,
	price: 100,
	budgetNotes: '',
	textContent: 'Sample Gift Content',
	imageContentUrl: ['http://example.com/gift.jpg'],
	isDeleted: false,
	deletedAt: ''
}

export const starterTransfer: ITransfer = {
	_id: '1',
	city: 'Sample City',
	company: 'Sample Company',
	transfer_in: 100,
	transfer_out: 120,
	one_way_city_transfer: 100,
	one_way_city_transfer_night: 100,
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
	selectedService: 'dispo_4h',
	budgetNotes: '',
	isDeleted: false,
	deletedAt: ''
}

export const starterHotelPrice: IHotelPrice = {
	DUInr: 0,
	DUIprice: 0,
	DoubleRoomNr: 0,
	DoubleRoomPrice: 0,
	breakfast: 0,
	DailyTax: 0
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
	imageUrlCaptions: [],
	meetingImageContentUrl: ['http://example.com/meeting.jpg'],
	meetingImageUrlCaptions: [],
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
			...starterHotelPrice
		}
	],
	deletedImage: ['http://example.com/deleted.jpg'],
	availableLanguages: ['English'],
	descriptions: [],
	budgetNotes: '',
	isDeleted: false,
	deletedAt: ''
}

export const starterEntertainment: IEntertainment = {
	_id: 'entertainment-1',
	name: 'Sample Entertainment',
	city: 'Sample City',
	vendor: 'Sample Vendor',
	contact: 'Sample Contact',
	email: 'email@email.com',
	category: 'Other',
	duration: '1 hour',
	nrArtists: '1',
	textContent: 'Sample Entertainment Content',
	price: {
		artistsFee: 1,
		aavv: 1,
		lighting: 1,
		travelAllowance: 1,
		mealAllowance: 1,
		other: 1
	},
	imageContentUrl: [],
	descriptions: [],
	availableLanguages: [],
	budgetNotes: '',
	isDeleted: false,
	deletedAt: ''
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
	updatedAt: '2025-01-01T10:00:00Z',
	imageUrlCaptions: [],
	budgetNotes: '',
	isDeleted: false,
	deletedAt: ''
}

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
	descriptions: [],
	imageContentUrl: [],
	imageUrlCaptions: [],
	budgetNotes: '',
	isDeleted: false,
	deletedAt: ''
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
			meetings: [starterMeeting]
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
			itinerary: [starterTransfer],
			morningActivity: {
				intro: '',
				events: [{ ...starterEvent, _id: 'itinerary-morning-event-1' }]
			},
			afternoonActivity: {
				intro: '',
				events: [{ ...starterEvent, _id: 'itinerary-afternoon-event-1' }]
			},
			nightActivity: {
				intro: '',
				events: [{ ...starterEvent, _id: 'itinerary-night-event-1' }]
			},
			lunch: {
				intro: '',
				included: true,
				restaurants: [
					{ ...starterRestaurant, _id: 'itinerary-lunch-restaurant-1' }
				]
			},
			dinner: {
				intro: '',
				included: false,
				restaurants: [
					{ ...starterRestaurant, _id: 'itinerary-dinner-restaurant-1' }
				]
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
			// Again, ensure at least one placeholder
			itinerary: [
				{
					_id: 'sample-transfer',
					city: 'Sample City',
					company: 'Sample Company',
					transfer_in: 0,
					transfer_out: 0,
					one_way_city_transfer: 0,
					one_way_city_transfer_night: 0,
					dispo_4h: 0,
					hextra: 0,
					hextra_night: 0,
					dispo_5h_out: 0,
					dispo_4h_airport: 0,
					dispo_4h_night: 0,
					transfer_in_out_night: 0,
					dispo_6h: 0,
					dispo_6h_night: 0,
					dispo_9h: 0,
					vehicleType: '',
					vehicleCapacity: 0,
					nrVehicles: 0,
					meetGreet: 0,
					meetGreetCost: 0,
					assistance: 0,
					assistanceCost: 0,
					selectedService: '',
					budgetNotes: '',
					isDeleted: false,
					deletedAt: ''
				}
			],
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

export const starterCompany: IClientCompany = {
	_id: '1',
	name: 'Acme Inc.',
	address: 'Sample Address',
	postCode: '12345',
	VATNr: '123456789',
	colorPalette: ['#000000'],
	fonts: ['Arial'],
	employees: [],
	country: 'Sample Country',
	isDeleted: false,
	deletedAt: ''
}

export const starterInvoice: IInvoice = {
	_id: '1',
	status: 'posting',
	date: '2025-01-01',
	projectCode: 'P-001',
	client: 'Sample Client',
	company: 'Sample Company',
	address: 'Sample Address',
	postCode: '12345',
	reference: '123456789',
	VATNr: '123456789',
	invoiceNumber: '1',
	lineDate: '2025-01-01',
	lineText: 'Sample Line Text',
	taxBreakdown: true,
	taxBase: 100,
	taxRate: 21,
	taxAmount: 21,
	taxBase21: 100,
	taxBase10: 0,
	expenses: 0,
	lineAmount: 100,
	linesBreakdown: true,
	breakdownLines: [
		{
			id: '1',
			date: '2025-01-01',
			text: 'Sample Line Text',
			amount: 100
		}
	],
	currency: 'EUR',
	collectionsFromClient: [],
	type: 'official'
}

export const starterCollectionFromClient: ICollectionFromClient = {
	_id: '1',
	dueDate: '2025-01-01',
	amount: 100,
	type: 'COLLECTION',
	status: 'RECEIVED',
	projectId: '1',
	clientCompanyId: '1',
	invoiceId: '', // Added invoiceId property required by the interface
	isDeleted: false
}

export const starterVendorInvoice: IVendorInvoice = {
	_id: '1',
	vendor: starterHotel,
	vendorType: 'Hotel',
	vendorModel: 'Hotels',
	amount: 100,
	invoiceNumber: '1',
	invoiceDate: '2025-01-01',
	status: 'Pending',
	relatedPayments: [],
	project: {} as IProject,
	pdfInvoice: [],
	isDeleted: false,
	deletedAt: ''
}

export const starterPayment: IPayment = {
	_id: '1',
	amount: 100,
	paymentDate: '2025-01-01',
	method: 'Cash',
	status: 'Completed',
	proofOfPaymentPDF: []
}

export const starterUser: IUser = {
	_id: '1',
	name: 'John Doe',
	password: 'password',
	isPasswordAlreadyHashed: false,
	email: 'test@gmail.com',
	role: 'admin',
	token: '',
	confirmed: true,
	isValidPassword: true,
	resetPasswordToken: '',
	resetPasswordExpires: new Date(),
	isDeleted: false,
	deletedAt: ''
}

export const starterClient: IClient = {
	_id: 'client123',
	firstName: 'John',
	familyName: 'Doe',
	email: 'john@example.com',
	quoteLanguage: 'EN',
	origin: {
		method: 'Recommendation'
	},
	qualification: {
		status: 'NeverRequested'
	},
	clientNotes: [],
	isDeleted: false,
	deletedAt: ''
}
