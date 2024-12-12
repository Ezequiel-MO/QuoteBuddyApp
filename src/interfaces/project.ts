import {
	IEvent,
	IMeeting,
	IRestaurant,
	ITransfer,
	IAccManager,
	IHotel,
	IClient,
	IClientCompany,
	IGift,
	IInvoice,
	ICollectionFromClient
} from './'

export interface IMeal {
	intro: string
	included?: boolean
	restaurants: IRestaurant[]
	[key: string]: any
}

export interface IOvernight {
	intro: string
	hotels: IHotel[]
}

export interface IItinerary {
	intro: string
	itinerary: ITransfer[]
	morningActivity: IActivity
	afternoonActivity: IActivity
	nightActivity: IActivity
	lunch: IMeal
	dinner: IMeal
	starts: 'morning' | 'afternoon' | 'night' | ''
	ends: 'morning' | 'afternoon' | 'night' | ''
}

export interface IActivity {
	intro: string
	events: IEvent[]
	[key: string]: any
}

export interface IMeetingDetails {
	intro: string
	meetings: IMeeting[]
}

export interface IDay {
	_id?: string
	date: string
	fullDayMeetings: IMeetingDetails
	morningMeetings: IMeetingDetails
	morningEvents: IActivity
	afternoonMeetings: IMeetingDetails
	afternoonEvents: IActivity
	lunch: IMeal
	dinner: IMeal
	transfer_in: ITransfer[]
	transfer_out: ITransfer[]
	overnight: IOvernight
	itinerary: IItinerary
	[key: string]: any
}

export interface IProject {
	_id?: string
	code: string
	accountManager: IAccManager[]
	groupName: string
	groupLocation: string
	arrivalDay: string
	departureDay: string
	nrPax: number
	projectIntro: string[]
	suplementaryText: boolean
	hotels: IHotel[]
	status: 'Received' | 'Sent' | 'Confirmed' | 'Cancelled' | 'Invoiced'
	estimate: number
	budget: 'budget' | 'noBudget' | 'budgetAsPdf'
	imageContentUrl: string[]
	hasSideMenu: boolean
	multiDestination: boolean
	hideDates: boolean
	hasExternalCorporateImage: boolean
	clientAccManager: IClient[]
	clientCompany: IClientCompany[]
	clientCompanyName?: string
	schedule: IDay[]
	gifts: IGift[]
	languageVendorDescriptions: string
	invoices: IInvoice[]
	collectionsFromClient: ICollectionFromClient[]
	requiresCashFlowVerification: boolean
	createdAt?: string
	updatedAt?: string
}
