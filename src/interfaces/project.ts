import {
	IEvent,
	IMeeting,
	IRestaurant,
	ITransfer,
	IAccManager,
	IHotel,
	IClient,
	IClientCompany,
	IGift
} from './'

interface IOvernight {
	intro: string
	hotels: IHotel[]
}

interface IItinerary {
	intro: string
	itinerary: ITransfer[]
}

export interface IMeal {
	intro: string
	restaurants: IRestaurant[]
	[key: string]: any
}

export interface IActivity {
	intro: string
	events: IEvent[]
	[key: string]: any
}

interface IMeetingDetails {
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
	interLocation: IItinerary
	overnight: IOvernight
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
	hasExternalCorporateImage: boolean
	clientAccManager: IClient[]
	clientCompany: IClientCompany[]
	schedule: IDay[]
	gifts: IGift[]
}
