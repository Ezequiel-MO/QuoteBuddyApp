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

interface IMeal {
	intro: string
	restaurants: IRestaurant[]
}

interface IActivity {
	intro: string
	events: IEvent[]
}

interface IMeetingDetails {
	intro: string
	meetings: IMeeting[]
}

interface IDay {
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
}

export interface IProject {
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
	hasExternalCorporateImage: boolean
	clientAccManager: IClient[]
	clientCompany: IClientCompany[]
	schedule: IDay[]
	gifts: IGift[]

	setImgUrl?(files: { location: string }[]): void
}
