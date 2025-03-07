import { IBudget } from '@interfaces/budget'
import {
	IEntertainment,
	IEntertainmentPrice,
	IEvent,
	IGift,
	IHotel,
	IHotelPrice,
	IMeeting,
	IRestaurant,
	ITransfer
} from '@interfaces/index'
import { IActivity, IDay, IProject } from '@interfaces/project'
import { IImage } from '@interfaces/image'

export interface IInitialState {
	project: IProject
	budget: IBudget
	modalIsOpen: boolean
	errors: Record<string, string>
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
	| 'overnight'
	| 'itinerary'
	| 'morningActivity'
	| 'afternoonActivity'
	| 'nightActivity'

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
	typeOfEvent: 'lunch' | 'dinner'
	data: {
		price: number
		pricePerPerson: boolean
	}
	imagesEvent: string[]
	textContent: string
}

export interface EditModalEventPayload {
	id: string
	dayIndex: number
	typeOfEvent: 'morningEvents' | 'afternoonEvents'
	data: {
		price: number
		pricePerPerson: boolean
	}
	imagesEvent: IImage[]
	textContent: string
}

export type TransfersAction = {
	payload: {
		transfers: ITransfer[]
		timeOfEvent: 'transfer_in' | 'transfer_out'
	}
}

export interface AddOrEditVenuePayload {
	typeMeal: 'lunch' | 'dinner'
	dayIndex: number
	idRestaurant: string
	venueEdit: any
}

export type RemoveEventActionPayload = {
	dayIndex: number
	timeOfEvent: TimeOfEvent
	eventId: string
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
	typeMeal: 'lunch' | 'dinner'
	dayIndex: number
	idRestaurant: string
	idEntertainment: string
	editPrice: IEntertainmentPrice
}

export interface EditTransferEventOrRestaurantPayload {
	typeEvent: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'
	dayIndex: number
	idEvent: string
	transferEdit: any
}

export interface IAddHotelOvernight {
	dayIndex: number
	hotel: IHotel
}

export interface IDeletedHotelOvernight {
	dayIndex: number
	hotelId: string
}

export interface IEditModalRestaurantPayload {
	id: string
	dayIndex: number
	typeOfEvent: 'lunch' | 'dinner'
	data: {
		price: number
		isVenue: boolean
	}
	imagesEvent: IImage[]
	textContent: string
}

export interface IAddIntro {
	dayIndex: number
	typeEvent: TimeOfEvent
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
	imageUrlCaptionsEdit?: IImage[]
	meetingImageUrlCaptionsEdit?: IImage[]
}

export interface IEditModalMeeting {
	id: string
	dayIndex: number
	typeOfEvent: 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings'
	data: Partial<IMeeting>
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

export interface IProgramTransfersPayload {
	date: string
	transfer: ITransfer
	count: number
	type: string
}

export interface TransferEntry {
	transferCost: number
	assistanceCost?: number
}

export interface UpdateProgramMealsCostPayload {
	date: string
	restaurant: Partial<IRestaurant> | null
	pax: number
	type: 'lunch' | 'dinner'
}

export interface UpdateProgramActivitiesCostPayload {
	date: string
	activity: {
		price?: number
		pricePerPerson?: boolean
		[key: string]: any
	} | null
	pax: number
	type: 'morning' | 'afternoon'
}

export interface UpdateProgramMeetingsCostPayload {
	date: string
	meeting: IMeeting | null
	type: 'morning' | 'afternoon' | 'full_day'
	pax: number
}
interface IShowPrice {
	aavv?: number
	artistsFee?: number
	lighting?: number
	mealAllowance?: number
	travelAllowance?: number
	[key: string]: any
}

interface IShow {
	price?: IShowPrice
	[key: string]: any
}

export interface UpdateProgramShowsCostPayload {
	date: string
	show: IShow | null
	type: string
}

export interface UpdateOvernightCostPayload {
	date: string
	hotel: IHotel | null
}

export interface UpdateMeetGreetTransferInPayload {
	unit: number | string
	key: string
}

export interface UpdateAssistanceTransferInPayload {
	value: number | string
	key: string
}

export interface UpdateTransfersInPayload {
	value: number
	typeUpdate: 'priceTransfer' | 'transfer'
	id: string
}

export interface UpdateMorningActivityPayload {
	value: any
	dayIndex: number
	id: string
	key: string
}

export interface UpdateMeetGreetTransferOutPayload {
	value: number | string
	key: string
}

export interface UpdateAssistanceTransferOutPayload {
	value: number | string
	key: string
}

export interface UpdateTransfersOutPayload {
	value: number
	typeUpdate: 'priceTransfer' | 'transfer'
	id: string
}

export interface UpdateAfternoonActivityPayload {
	value: any
	dayIndex: number
	id: string
	key: string
}

export interface UpdateLunchRestaurantPayload {
	value: any
	dayIndex: number
	id: string
	key: string
}

export interface UpdateDinnerRestaurantPayload {
	value: any
	dayIndex: number
	id: string
	key: string
}

export interface UpdateAssistanceTransferActivityRestaurantPayload {
	value: number | string
	dayIndex: number
	typeEvent: string // 'lunch', 'dinner', 'morningEvents', 'afternoonEvents'
	key: string
	id: string
}

export interface UpdateTransferActivityPayload {
	value: number
	dayIndex: number
	typeEvent: string
	idActivity: string
	typeUpdate: 'priceTransfer' | 'transfer'
	idTransfer: string
	serviceKey: string
}

export interface UpdateTransferRestaurantPayload {
	value: number
	dayIndex: number
	typeEvent: string
	idRestaurant: string
	typeUpdate: 'priceTransfer' | 'transfer'
	idTransfer: string
	serviceKey: string
}

export interface UpdateOvernightHotelPricePayload {
	dayIndex: number
	value: number | string
	id: string
	key: keyof IHotelPrice // Restrict 'key' to valid IHotelPrice properties
}

export interface UpdateRestaurantEntertainmentPayload {
	value: any
	dayIndex: number
	typeMeal: 'lunch' | 'dinner'
	idRestaurant: string
	idEntertainment: string
	keyEntertainmentPrice: keyof IEntertainmentPrice
}

export interface UpdateGiftPayload<K extends keyof IGift = keyof IGift> {
	idGift: string
	keyGift: K
	value: IGift[K]
}

export interface UpdateMeetingPayload {
	dayIndex: number
	typeMeeting: string
	idMeeting: string
	keyMeeting: keyof IMeeting
	value: any
}

export interface UpdateHotelPricePayload {
	value: number
	idHotel: string
	keyHotelPrice: keyof IHotel['price'][0]
}

export interface UpdateAssistanceTransfersItineraryPayload {
	dayIndex: number
	key: string
	value: any
}

export interface UpdateTransfersItineraryPayload {
	dayIndex: number
	idTransfer: string
	typeUpdate: 'priceTransfer' | 'transfer'
	serviceKey: string
	value: any
}

export interface UpdateMorningActivityItineraryPayload {
	dayIndex: number
	id: string
	key: keyof IActivity
	value: string | number
}

export interface UpdateAfternoonActivityItineraryPayload {
	dayIndex: number
	id: string
	key: keyof IActivity
	value: string | number
}

export interface UpdateLunchRestaurantItineraryPayload {
	dayIndex: number
	id: string
	key: 'price' | 'participants'
	value: number
}

export interface UpdateDinnerRestaurantItineraryPayload {
	dayIndex: number
	id: string
	key: keyof IRestaurant
	value: string | number
}

export interface UpdateRestaurantVenuePayload {
	value: number
	dayIndex: number
	typeMeal: 'lunch' | 'dinner'
	restaurantId: string
	keyVenue:
	| 'cocktail_units'
	| 'catering_units'
	| 'staff_units'
	| 'rental'
	| 'cocktail_price'
	| 'catering_price'
	| 'catering_price'
	| 'staff_menu_price'
	| 'audiovisuals'
	| 'cleaning'
	| 'security'
	| 'entertainment'
}
