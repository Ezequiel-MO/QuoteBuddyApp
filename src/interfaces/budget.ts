import { IEntertainment } from './entertainment'
import { IEvent } from './event'
import { IGift } from './gift'
import { IHotel } from './hotel'
import { IMeeting } from './meeting'
import { IDay } from './project'
import { IRestaurant } from './restaurant'

export interface IBudget {
	hotels: IHotel[]
	selectedHotel: IHotel | null
	selectedHotelCost: number
	schedule: IDay[]
	activities: {
		[key: string]: {
			morning?: IEvent
			afternoon?: IEvent
		}
	}
	activitiesCost: number
	meals: {
		[key: string]: {
			lunch?: IRestaurant
			dinner?: IRestaurant
		}
	}
	mealsCost: number
	meetings: {
		[key: string]: {
			morning?: IMeeting
			afternoon?: IMeeting
			full_day?: IMeeting
		}
	}
	meetingsCost: number
	overnight: {
		[key: string]: {
			hotel: IHotel | null
			hotelCost: number
		}
	}
	overnightCost: number
	shows: {
		[key: string]: {
			lunch?: IEntertainment
			dinner?: IEntertainment
		}
	}
	showsCost: number
	programTransfers: {
		[date: string]: {
			[type: string]: {
				transferCost: number
			}
		}
	}
	programTransfersCost: number
	transfersInCost: number
	transfersOutCost: number
	itineraryTransfers: {
		[date: string]: {
			[type: string]: {
				transferCost: number
			}
		}
	}
	itineraryTransfersCost: number
	nrPax: number
	gifts: IGift[]
	giftCost: number
}
