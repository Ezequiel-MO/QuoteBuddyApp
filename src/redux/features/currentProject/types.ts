import {
	IDay,
	IEntertainment,
	IEntertainmentPrice,
	IEvent,
	IHotel,
	IProject,
	IRestaurant,
	ITransfer
} from '@interfaces/index'

export interface IInitialState {
	project: IProject
}

export const EVENT_TYPES_ACTIVITIES = ['morningEvents', 'afternoonEvents']
export const EVENT_TYPES_MEETINGS = [
	'morningMeetings',
	'afternoonMeetings',
	'fullDayMeetings'
]

export type TimeOfEvent =
	| 'fullDayMeetings'
	| 'morningMeetings'
	| 'morningEvents'
	| 'afternoonMeetings'
	| 'afternoonEvents'
	| 'lunch'
	| 'dinner'
	| 'transfer_in'
	| 'transfer_out'

export type TimeOfEventWithTransfers =
	| 'morningEvents'
	| 'afternoonEvents'
	| 'lunch'
	| 'dinner'

export type TimeOfMeeting =
	| 'morningMeetings'
	| 'afternoonMeetings'
	| 'fullDayMeetings'

export type TypeOfEvent =
	| 'morningEvents'
	| 'afternoonEvents'
	| 'lunch'
	| 'dinner'

export interface EditModalRestaurantPayload {
	id: string
	dayIndex: number
	typeOfEvent: TypeOfEvent
	data: any
	imagesEvent: any
	textContent: string
}

export type TransfersAction = {
	payload: {
		transfers: ITransfer[]
		timeOfEvent: 'transfer_in' | 'transfer_out'
	}
}

export type AddEventAction = {
	payload: {
		// dayOfEvent, timeOfEvent, event
		dayOfEvent: number
		timeOfEvent: TimeOfEvent
		event: any
	}
}

export interface AddHotelOvernightPayload {
	dayIndex: number
	hotel: IHotel
}

export interface AddItenerayTransferPayload {
	dayIndex: number
	transfers: ITransfer[]
	starts: 'morning' | 'afternoon' | 'night'
	ends: 'morning' | 'afternoon' | 'night'
}

export interface DragAndDropHotelOvernightPayload {
	newSchedule: IDay[]
}

export interface AddEventToIteneraryPayload {
	dayIndex: number
	typeOfEvent:
		| 'morningActivity'
		| 'afternoonActivity'
		| 'nightActivity'
		| 'lunch'
		| 'dinner'
	event: IEvent | IRestaurant
}

export interface BaseItineraryPayload {
	dayIndex: number
	typeOfEvent:
		| 'morningActivity'
		| 'afternoonActivity'
		| 'nightActivity'
		| 'lunch'
		| 'dinner'
}
export interface RemoveEventToItineraryPayload extends BaseItineraryPayload {
	idEvent: string
}
export interface IntroEventItineraryPayload extends BaseItineraryPayload {
	textContent: string
}

export type TransferTimeOfEvent = 'transfer_in' | 'transfer_out'

export interface IAddEntertainment {
	typeMeal: string
	dayIndex: number
	idRestaurant: string
	entertainmentShow: IEntertainment
}

export interface IDeletedEntertainment {
	typeMeal: string
	dayIndex: number
	idRestaurant: string
	idEntertainment: string
}

export interface IEditEntertainment {
	typeMeal: string
	dayIndex: number
	idRestaurant: string
	idEntertainment: string
	editPrice: IEntertainmentPrice
}

export interface IAddHotelOvernight {
	dayIndex: number
	hotel: IHotel
}

export interface IDeletedHotelOvernight {
	dayIndex: number
	hotelId: string
}

export interface IAddIntro {
	dayIndex: number
	typeEvent: string
	textContent: string
}

export interface IAddIntroTransferItinerary {
	dayIndex: number
	textContent: string
}

export interface IHotelModal {
	pricesEdit?: any
	textContentEdit?: string
	imageContentUrlEdit?: string[]
	meetingImageContentUrl?: string[]
	meetingDetails?: any
	dayIndex?: number
	id?: string
}

export interface IDragAndDropHotelOvernight {
	newSchedule: IDay[]
}

export interface IAddItenerayTransfer {
	dayIndex: number
	transfers: ITransfer[]
	starts: 'morning' | 'afternoon' | 'night'
	ends: 'morning' | 'afternoon' | 'night'
}

export interface IRemoveIteneraryTransfer {
	dayIndex: number
	transferId: string
}

export interface IAddEventToItenerary {
	dayIndex: number
	typeOfEvent:
		| 'morningActivity'
		| 'afternoonActivity'
		| 'nightActivity'
		| 'lunch'
		| 'dinner'
	event: IEvent | IRestaurant
}

export interface IRemoveEventToItinerary {
	dayIndex: number
	typeOfEvent:
		| 'morningActivity'
		| 'afternoonActivity'
		| 'nightActivity'
		| 'lunch'
		| 'dinner'
	idEvent: string
}

export interface IIntroEventItinerary {
	dayIndex: number
	typeOfEvent:
		| 'morningActivity'
		| 'afternoonActivity'
		| 'nightActivity'
		| 'lunch'
		| 'dinner'
	textContent: string
}

export interface EditHotelPriceParams {
	hotelId: string
	DUInr?: number
	DUIprice?: number
	DoubleRoomNr?: number
	DoubleRoomPrice?: number
	breakfast?: number
	DailyTax?: number
}
