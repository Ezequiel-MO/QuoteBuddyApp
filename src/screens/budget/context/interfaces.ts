import {
	IDay,
	IEntertainment,
	IEvent,
	IHotel,
	IMeeting,
	IProject,
	IRestaurant,
	ITransfer,
	IGift
} from '../../../interfaces'
import {
	UPDATE_PROGRAM_ACTIVITIES_COST,
	UPDATE_PROGRAM_MEALS_COST,
	UPDATE_PROGRAM_MEETINGS_COST,
	UPDATE_PROGRAM_TRANSFERS_COST,
	SET_SELECTED_HOTEL,
	SET_SELECTED_HOTEL_COST,
	UPDATE_TRANSFERS_IN_COST,
	UPDATE_TRANSFERS_OUT_COST,
	UPDATE_PROGRAM_SHOWS_COST,
	UPDATE_OVERNIGHT_COST,
	UPDATE_MEETGREET_TRANSFER_IN,
	UPDATE_ASSISTANCE_TRANSFER_IN,
	UPDATE_TRANSFERS_IN,
	UPDATE_MORNING_ACTIVITY,
	UPDATE_MEETGREET_TRANSFER_OUT,
	UPDATE_ASSISTANCE_TRANSFER_OUT,
	UPDATE_TRANSFERS_OUT,
	UPDATE_AFTERNOON_ACTIVITY,
	UPDATE_LUNCH_RESTAURANT,
	UPDATE_DINNER_RESTAURANT,
	UPDATE_ASSISTANCE_TRANSFER_ACTIVITY_RESTAURANT,
	UPDATE_TRANSFER_ACTIVITY,
	UPDATE_TRANSFER_RESTAURANT,
	UPDATE_OVERNIGHT_HOTEL_PRICE,
	UPDATE_RESTAURANT_VENUE,
	UPDATE_RESTAURANT_ENTERTAIMENT,
	UPDATE_GIFT,
	UPDATE_GIFT_COST,
	UPDATE_MEETING,
	UPDATE_HOTEL_PRICE,
	UPDATE_ASSISTANCE_TRANSFERS_ITINERARY,
	UPDATE_TRANSFERS_ITINERARY,
	UPDATE_MORNING_ACTIVITY_ITINERARY,
	UPDATE_LUNCH_RESTAURANT_ITINERARY,
	SET_BUDGET
} from './budgetReducer'

export interface BudgetState {
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
			fullDay?: IMeeting
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

export type SetSelectedHotelAction = {
	type: typeof SET_SELECTED_HOTEL
	payload: {
		selectedHotel: IHotel
	}
}

export type SetSelectedHotelCostAction = {
	type: typeof SET_SELECTED_HOTEL_COST
	payload: {
		nights: number
		selectedHotel: IHotel
	}
}

export type UpdateTransfersInCost = {
	type: typeof UPDATE_TRANSFERS_IN_COST
	payload: {
		transfer_in: ITransfer[]
	}
}

export type UpdateTransfersOutCost = {
	type: typeof UPDATE_TRANSFERS_OUT_COST
	payload: {
		transfer_out: ITransfer[]
	}
}

export type UpdateProgramTransfersCost = {
	type: typeof UPDATE_PROGRAM_TRANSFERS_COST
	payload: {
		date: string
		transfer: ITransfer | null
		count: number
		type:
		| 'transfer_morningEvents'
		| 'transfer_afternoonEvents'
		| 'transfer_lunch'
		| 'transfer_dinner'
		| 'meetGreet'
		| 'assistance'
		| 'transfer_morningItinerary'
		| 'transfer_afternoonItinerary'
	}
}

export type UpdateProgramMealsCost = {
	type: typeof UPDATE_PROGRAM_MEALS_COST
	payload: {
		date: string
		restaurant: IRestaurant | null
		pax: number
		type: 'lunch' | 'dinner'
	}
}

export type UpdateActivitiesCost = {
	type: typeof UPDATE_PROGRAM_ACTIVITIES_COST
	payload: {
		date: string
		activity: IEvent | null
		pax: number
		type: 'morning' | 'afternoon'
	}
}

export type UpdateMeetingsCost = {
	type: typeof UPDATE_PROGRAM_MEETINGS_COST
	payload: {
		date: string
		meeting: IMeeting | null
		type: 'morning' | 'afternoon' | 'full_day'
		pax: number
	}
}

export type UpdateShowsCost = {
	type: typeof UPDATE_PROGRAM_SHOWS_COST
	payload: {
		date: string
		show: IEntertainment | null
		type: 'lunch' | 'dinner'
	}
}

export type UpdateOvernightCost = {
	type: typeof UPDATE_OVERNIGHT_COST
	payload: {
		date: string
		hotel: IHotel | null
	}
}

export type SetBudget = {
	type: typeof SET_BUDGET
	payload: {
		hotels: IHotel[]
		schedule: IDay[]
		nrPax: number
		gifts: IGift[]
	}
}

export type UpdateMeetGreetTransferIn = {
	type: typeof UPDATE_MEETGREET_TRANSFER_IN
	payload: {
		unit: number
		key: "meetGreet" | "meetGreetCost"
	}
}

export type UpdateAssistanceTransferIn = {
	type: typeof UPDATE_ASSISTANCE_TRANSFER_IN
	payload: {
		value: number
		key: "assistance" | "assistanceCost"
	}
}

export type UpdateTransferIn = {
	type: typeof UPDATE_TRANSFERS_IN
	payload: {
		value: number
		typeUpdate: "transfer" | "priceTransfer"
		id?: string
	}
}

export type UpdateMorningActivity = {
	type: typeof UPDATE_MORNING_ACTIVITY
	payload: {
		value: number
		key: "participants" | "price"
		id: string
		dayIndex: number
	}
}

export type UpdateMeetGreetTransferOut = {
	type: typeof UPDATE_MEETGREET_TRANSFER_OUT
	payload: {
		value: number
		key: "meetGreet" | "meetGreetCost"
	}
}

export type UpdateAssistanceTransferOut = {
	type: typeof UPDATE_ASSISTANCE_TRANSFER_OUT
	payload: {
		value: number
		key: "assistance" | "assistanceCost"
	}
}

export type UpdateTransferOut = {
	type: typeof UPDATE_TRANSFERS_OUT
	payload: {
		value: number
		typeUpdate: "transfer" | "priceTransfer"
		id?: string
	}
}

export type UpdateAfertnoonActivity = {
	type: typeof UPDATE_AFTERNOON_ACTIVITY
	payload: {
		value: number
		key: "participants" | "price"
		id: string
		dayIndex: number
	}
}

export type UpdateLunchRestaurant = {
	type: typeof UPDATE_LUNCH_RESTAURANT
	payload: {
		value: number
		key: "participants" | "price"
		id: string
		dayIndex: number
	}
}

export type UpdateDinnerRestaurant = {
	type: typeof UPDATE_DINNER_RESTAURANT
	payload: {
		value: number
		key: "participants" | "price"
		id: string
		dayIndex: number
	}
}

export type UpdateAssistanceTransferActivityRestaurant = {
	type: typeof UPDATE_ASSISTANCE_TRANSFER_ACTIVITY_RESTAURANT
	payload: {
		value: number
		key: "assistance" | "assistanceCost"
		id: string
		dayIndex: number
		typeEvent: "morningEvents" | "afternoonEvents" | "lunch" | "dinner"
	}
}

export type UpdateTransferActivity = {
	type: typeof UPDATE_TRANSFER_ACTIVITY
	payload: {
		value: number
		typeUpdate: "transfer" | "priceTransfer"
		dayIndex: number
		typeEvent: "morningEvents" | "afternoonEvents" | "lunch" | "dinner"
		idTransfer: string
		idActivity: string
		serviceKey:
		| "dispo_4h"
		| "dispo_4h_night"
		| "dispo_5h_out"
		| "dispo_6h"
		| "dispo_6h_night"
		| "dispo_9h"
	}
}

export type UpdateTransferRestaurant = {
	type: typeof UPDATE_TRANSFER_RESTAURANT
	payload: {
		value: number
		typeUpdate: "transfer" | "priceTransfer"
		dayIndex: number
		typeEvent: "morningEvents" | "afternoonEvents" | "lunch" | "dinner"
		idTransfer: string
		idRestaurant: string
		serviceKey:
		| "dispo_4h"
		| "dispo_4h_night"
		| "dispo_5h_out"
		| "dispo_6h"
		| "dispo_6h_night"
		| "dispo_9h"
	}
}

export type UpdatedOvernightHotelPrice = {
	type: typeof UPDATE_OVERNIGHT_HOTEL_PRICE
	payload: {
		value: number
		key: "DUIprice" | "DoubleRoomNr" | "DoubleRoomPrice" | "breakfast" | "DailyTax"
		id: string
		dayIndex: number
	}
}

export type UpdateRestaurantVenue = {
	type: typeof UPDATE_RESTAURANT_VENUE
	payload: {
		value: number
		typeMeal: 'lunch' | 'dinner'
		restaurantId: string
		dayIndex: number
		keyVenue:
		| "cocktail_units"
		| "catering_units"
		| "staff_units"
		| "rental"
		| "cocktail_price"
		| "catering_price"
		| "catering_price"
		| "staff_menu_price"
		| "audiovisuals"
		| "cleaning"
		| "security"
		| "entertainment"
	}
}

export type UpdateGift = {
	type: typeof UPDATE_GIFT
	payload: {
		value: number
		idGift: string
		keyGift: "qty" | "price"
	}
}

export type UpdateRestaurantEntertaiment = {
	type: typeof UPDATE_RESTAURANT_ENTERTAIMENT
	payload: {
		value: number
		dayIndex: number
		typeMeal: 'lunch' | 'dinner'
		idRestaurant: string
		idEntertaiment: string
		keyEntertainmentPrice:
		| "artistsFee"
		| "aavv"
		| "lighting"
		| "travelAllowance"
		| "mealAllowance"
		| "other"
	}
}

export type UpdateGiftCost = {
	type: typeof UPDATE_GIFT_COST
	payload: {
		value: number
	}
}

type MeetingKey = keyof Omit<
	IMeeting,
	'hotel'
	| 'imageContentUrl'
	| 'introduction'
	| "hotelName"
	| "_id"
>
export type UpdateMeeting = {
	type: typeof UPDATE_MEETING
	payload: {
		value: number
		dayIndex: number
		typeMeeting: "afternoonMeetings" | "afternoonMeetings" | "fullDayMeetings"
		idMeeting: string
		keyMeeting: MeetingKey
	}
}

export type UpdateHotelPrice = {
	type: typeof UPDATE_HOTEL_PRICE
	payload: {
		value: number
		idHotel: string
		keyHotelPrice: | 'DUInr'
		| 'DUIprice'
		| 'DoubleRoomNr'
		| 'DoubleRoomPrice'
		| 'breakfast'
		| 'DailyTax'
	}
}

export type UpdateAssistanceTransfersItinerary = {
	type: typeof UPDATE_ASSISTANCE_TRANSFERS_ITINERARY
	payload: {
		value: number
		key: "assistance" | "assistanceCost"
		dayIndex: number
	}
}

export type UpdateTransfersItinerary = {
	type: typeof UPDATE_TRANSFERS_ITINERARY
	payload: {
		value: number
		typeUpdate: "transfer" | "priceTransfer"
		dayIndex: number
		idTransfer: string
		serviceKey:
		| "dispo_4h"
		| "dispo_4h_night"
		| "dispo_5h_out"
		| "dispo_6h"
		| "dispo_6h_night"
		| "dispo_9h"
	}
}

export type UpdateMorningActivityItinerary = {
	type: typeof UPDATE_MORNING_ACTIVITY_ITINERARY
	payload: {
		value: number
		key: "participants" | "price"
		id: string
		dayIndex: number
	}
}

export type UpdateLunchRestaurantItinerary = {
	type: typeof UPDATE_LUNCH_RESTAURANT_ITINERARY
	payload: {
		value: number
		key: "participants" | "price"
		id: string
		dayIndex: number
	}
}


export type BudgetActions =
	| SetSelectedHotelAction
	| SetSelectedHotelCostAction
	| UpdateTransfersInCost
	| UpdateTransfersOutCost
	| UpdateProgramTransfersCost
	| UpdateProgramMealsCost
	| UpdateActivitiesCost
	| UpdateMeetingsCost
	| UpdateShowsCost
	| UpdateOvernightCost
	| SetBudget
	| UpdateMeetGreetTransferIn
	| UpdateAssistanceTransferIn
	| UpdateTransferIn
	| UpdateMorningActivity
	| UpdateMeetGreetTransferOut
	| UpdateAssistanceTransferOut
	| UpdateTransferOut
	| UpdateAfertnoonActivity
	| UpdateLunchRestaurant
	| UpdateDinnerRestaurant
	| UpdateAssistanceTransferActivityRestaurant
	| UpdateTransferActivity
	| UpdateTransferRestaurant
	| UpdatedOvernightHotelPrice
	| UpdateRestaurantVenue
	| UpdateRestaurantEntertaiment
	| UpdateGift
	| UpdateGiftCost
	| UpdateMeeting
	| UpdateHotelPrice
	| UpdateAssistanceTransfersItinerary
	| UpdateTransfersItinerary
	| UpdateMorningActivityItinerary
	| UpdateLunchRestaurantItinerary
