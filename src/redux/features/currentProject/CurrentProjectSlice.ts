import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
	AddEventAction,
	AddEventToIteneraryPayload,
	AddHotelOvernightPayload,
	AddItenerayTransferPayload,
	DragAndDropHotelOvernightPayload,
	EditModalRestaurantPayload,
	IInitialState,
	IntroEventItineraryPayload,
	RemoveEventToItineraryPayload,
	TimeOfEvent,
	TimeOfEventWithTransfers,
	TimeOfMeeting,
	TransfersAction
} from './types'

import { projectValidationSchema } from '@screens/projects/specs/ProjectValidation'
import * as Yup from 'yup'
import { IGift } from '@interfaces/gift'
import { ITransfer } from '@interfaces/transfer'
const initialState: IInitialState = {
	project: JSON.parse(localStorage.getItem('currentProject') || '{}'),
	modalIsOpen: false,
	errors: {}
}

export const currentProjectSlice = createSlice({
	name: 'currentProject',
	initialState,
	reducers: {
		SET_CURRENT_PROJECT: (state: IInitialState, action) => {
			state.project = action.payload
		},
		ADD_HOTEL_TO_PROJECT: (state, action) => {
			state.project.hotels = [...state.project.hotels, action.payload]
		},
		ADD_HOTEL_OVERNIGHT_TO_SCHEDULE: (
			state,
			action: PayloadAction<AddHotelOvernightPayload>
		) => {
			const { dayIndex, hotel } = action.payload
			state.project.schedule[dayIndex].overnight.hotels = [
				...state.project.schedule[dayIndex]?.overnight.hotels,
				hotel
			]
		},
		ADD_EVENT_TO_SCHEDULE: (state, action: AddEventAction) => {
			const { dayOfEvent, timeOfEvent, event } = action.payload
			const updatedSchedule = state.project.schedule?.map((day, index) => {
				const timeOfEventKey: TimeOfEvent = timeOfEvent
				if (index === dayOfEvent) {
					switch (timeOfEventKey) {
						case 'morningEvents':
						case 'afternoonEvents':
							return {
								...day,
								[timeOfEventKey]: {
									...day[timeOfEventKey],
									events: [...day[timeOfEventKey].events, event]
								}
							}
						case 'morningMeetings':
						case 'afternoonMeetings':
						case 'fullDayMeetings':
							return {
								...day,
								[timeOfEventKey]: {
									...day[timeOfEventKey],
									meetings: [...day[timeOfEventKey].meetings, event]
								}
							}
						case 'lunch':
						case 'dinner':
							return {
								...day,
								[timeOfEventKey]: {
									...day[timeOfEventKey],
									restaurants: [...day[timeOfEventKey].restaurants, event]
								}
							}
						default:
							return day
					}
				}
				return day
			})
			state.project.schedule = updatedSchedule
		},
		ADD_GIFT_TO_PROJECT: (state, action) => {
			const gift: IGift = action.payload
			if (!gift.qty) {
				gift.qty = 1
			}
			state.project.gifts = [...state.project.gifts, gift]
		},
		ADD_ITENERARY_TRANSFER_TO_SCHEDULE: (
			state,
			action: PayloadAction<AddItenerayTransferPayload>
		) => {
			const { dayIndex, starts, ends, transfers } = action.payload
			state.project.schedule[dayIndex].itinerary.starts = starts
			state.project.schedule[dayIndex].itinerary.ends = ends
			state.project.schedule[dayIndex].itinerary.itinerary = transfers
		},
		ADD_EVENT_TO_ITENERARY: (
			state,
			action: PayloadAction<AddEventToIteneraryPayload>
		) => {
			const { dayIndex, typeOfEvent, event } = action.payload
			const typesMeals = ['lunch', 'dinner']
			const typesActivities = [
				'morningActivity',
				'afternoonActivity',
				'nightActivity'
			]
			const itinerary = state.project.schedule[dayIndex].itinerary
			if (itinerary.itinerary.length === 0) {
				throw new Error('ERROR! The Itinerary has no Transfer/s')
			}
			if (typesMeals.includes(typeOfEvent)) {
				itinerary[typeOfEvent].restaurants = [
					...itinerary[typeOfEvent].restaurants,
					event
				]
			}
			if (typesActivities.includes(typeOfEvent)) {
				itinerary[typeOfEvent].events = [
					...itinerary[typeOfEvent].events,
					event
				]
			}
		},
		REMOVE_GIFT_FROM_PROJECT: (state, action) => {
			const { id } = action.payload
			state.project.gifts = state.project.gifts.filter((el) => el._id !== id)
		},
		REMOVE_HOTEL_FROM_PROJECT: (state, action) => {
			const timesMeeting: TimeOfMeeting[] = [
				'morningMeetings',
				'afternoonMeetings',
				'fullDayMeetings'
			]
			const hotelId = action.payload
			for (let i = 0; i < state.project.schedule.length; i++) {
				for (let j = 0; j < timesMeeting.length; j++) {
					state.project.schedule[i][timesMeeting[j]].meetings =
						state.project.schedule[i][timesMeeting[j]].meetings.filter(
							(el) => el.hotel[0] !== hotelId
						)
				}
			}

			state.project.hotels = state.project.hotels.filter(
				(hotel) => hotel._id !== hotelId
			)
		},
		REMOVE_HOTEL_OVERNIGHT_FROM_SCHEDULE: (state, action) => {
			const { dayIndex, hotelId } = action.payload
			const hotelsFilter = state.project.schedule[
				dayIndex
			].overnight.hotels.filter((el) => el._id !== hotelId)
			state.project.schedule[dayIndex].overnight.hotels = hotelsFilter
		},
		REMOVE_EVENT_FROM_SCHEDULE: (state, action) => {
			const { dayIndex, timeOfEvent, eventId } = action.payload

			const updatedSchedule = state.project.schedule.map((day, index) => {
				const timeOfEventKey: TimeOfEvent = timeOfEvent as TimeOfEvent
				if (index === dayIndex) {
					switch (timeOfEventKey) {
						case 'morningEvents':
						case 'afternoonEvents':
							return {
								...day,
								[timeOfEventKey]: {
									...day[timeOfEventKey],
									events: day[timeOfEventKey].events.filter(
										(event) => event._id !== eventId
									)
								}
							}
						case 'morningMeetings':
						case 'afternoonMeetings':
						case 'fullDayMeetings':
							return {
								...day,
								[timeOfEventKey]: {
									...day[timeOfEventKey],
									meetings: day[timeOfEventKey].meetings.filter(
										(event) => event._id !== eventId
									)
								}
							}
						case 'lunch':
						case 'dinner':
							return {
								...day,
								[timeOfEventKey]: {
									...day[timeOfEventKey],
									restaurants: day[timeOfEventKey].restaurants.filter(
										(event) => event._id !== eventId
									)
								}
							}
					}
				}
				return day
			})
			state.project.schedule = updatedSchedule
		},
		REMOVE_EVENT_TO_ITENERARY: (
			state,
			action: PayloadAction<RemoveEventToItineraryPayload>
		) => {
			const { dayIndex, typeOfEvent, idEvent } = action.payload
			const typesMeals = ['lunch', 'dinner']
			const typesActivities = [
				'morningActivity',
				'afternoonActivity',
				'nightActivity'
			]
			const itinerary = state.project.schedule[dayIndex].itinerary
			if (typesActivities.includes(typeOfEvent)) {
				const keyActivity = typeOfEvent as
					| 'morningActivity'
					| 'afternoonActivity'
					| 'nightActivity'
				const activitiesFilter = itinerary[keyActivity].events.filter(
					(el) => el._id !== idEvent
				)
				itinerary[keyActivity].events = activitiesFilter
			}
			if (typesMeals.includes(typeOfEvent)) {
				const keyMeal = typeOfEvent as 'lunch' | 'dinner'
				const restaurantsFilter = itinerary[keyMeal].restaurants.filter(
					(el) => el._id !== idEvent
				)
				itinerary[keyMeal].restaurants = restaurantsFilter
			}
		},
		REMOVE_TRANSFER_FROM_SCHEDULE: (state, action) => {
			const { timeOfEvent, transferId } = action.payload
			const transfersIn: ITransfer[] = state.project.schedule[0].transfer_in
			const lastIndex = state.project.schedule.length - 1
			const transfersOut: ITransfer[] =
				state.project.schedule[lastIndex].transfer_out
			const transfers =
				timeOfEvent === 'transfer_in' ? transfersIn : transfersOut
			const index = transfers.findIndex((el) => el._id === transferId)
			if (timeOfEvent === 'transfer_in') {
				transfersIn.splice(index, 1)
			}
			if (timeOfEvent === 'transfer_out') {
				transfersOut.splice(index, 1)
			}
		},
		REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE: (state, action) => {
			const { dayIndex, transferId } = action.payload
			const transfers = [
				...state.project.schedule[dayIndex].itinerary.itinerary
			]
			const transfersFilter = transfers.filter((el) => el._id !== transferId)
			state.project.schedule[dayIndex].itinerary.itinerary = transfersFilter
		},
		EXPAND_TRANSFERS_TO_OPTIONS: (state) => {
			state.project.schedule = state.project.schedule.map((day) => {
				const transferEvents: TimeOfEventWithTransfers[] = [
					'morningEvents',
					'afternoonEvents',
					'lunch',
					'dinner'
				]

				transferEvents.forEach((event) => {
					const eventKey: TimeOfEventWithTransfers =
						event as TimeOfEventWithTransfers

					switch (eventKey) {
						case 'morningEvents':
						case 'afternoonEvents':
							day[eventKey].events = day[eventKey].events.map((ev) => {
								if (ev.transfer) {
									return {
										...ev,
										transfer: day[eventKey].events[0].transfer
									}
								}
								return ev
							})
							break
						case 'lunch':
						case 'dinner':
							day[eventKey].restaurants = day[eventKey].restaurants.map(
								(ev) => {
									if (ev.transfer) {
										return {
											...ev,
											transfer: day[eventKey].restaurants[0].transfer
										}
									}
									return ev
								}
							)
							break
					}
				})
				return day
			})
		},

		DRAG_AND_DROP_EVENT: (state, action) => {
			const { newSchedule } = action.payload
			if (newSchedule) {
				state.project.schedule = newSchedule
				return
			}
		},
		DRAG_AND_DROP_RESTAURANT: (state, action) => {
			const { newSchedule } = action.payload
			if (newSchedule) {
				state.project.schedule = newSchedule
				return
			}
		},
		DRAG_AND_DROP_HOTEL: (state, action) => {
			const { startHotelIndex, endHotelIndex } = action.payload
			const copyHotels = [...state.project.hotels]
			const [hotelDragStart] = copyHotels.splice(startHotelIndex, 1)
			copyHotels.splice(endHotelIndex, 0, hotelDragStart)
			state.project.hotels = copyHotels
		},
		DRAG_AND_DROP_HOTEL_OVERNIGHT: (
			state,
			action: PayloadAction<DragAndDropHotelOvernightPayload>
		) => {
			const { newSchedule } = action.payload
			if (newSchedule) {
				state.project.schedule = newSchedule
				return
			}
		},
		EDIT_MODAL_HOTEL: (state, action) => {
			const {
				pricesEdit,
				textContentEdit,
				imageContentUrlEdit,
				meetingImageContentUrl,
				meetingDetails,
				id
			} = action.payload
			const hotelIndex = state.project.hotels.findIndex((el) => el._id === id)
			const findHotel = state.project.hotels.find((el) => el._id === id)
			if (findHotel === undefined) throw new Error('ERROR! Hotel not found')
			if (pricesEdit) {
				findHotel.price[0] = pricesEdit
			}
			if (textContentEdit) {
				findHotel.textContent = textContentEdit
			}
			if (imageContentUrlEdit) {
				findHotel.imageContentUrl = imageContentUrlEdit
			}
			//  "meetingImageContentUrl" AND "meetingDetails" EDITO EN "AddMeetingsImagesModal.jsx"
			if (meetingImageContentUrl) {
				findHotel.meetingImageContentUrl = meetingImageContentUrl
			}
			if (meetingDetails) {
				findHotel.meetingDetails = meetingDetails
			}
			state.project.hotels.splice(hotelIndex, 1)
			state.project.hotels.splice(hotelIndex, 0, findHotel)
		},
		EDIT_MODAL_HOTEL_OVERNIGHT: (state, action) => {
			const {
				pricesEdit,
				textContentEdit,
				imageContentUrlEdit,
				meetingImageContentUrl,
				meetingDetails,
				dayIndex,
				id
			} = action.payload
			const hotelIndex = state.project.schedule[
				dayIndex
			].overnight.hotels.findIndex((el) => el._id === id)
			const findHotel = state.project.schedule[dayIndex].overnight.hotels.find(
				(el) => el._id === id
			)
			if (findHotel === undefined) throw new Error('ERROR! Hotel not found')
			if (pricesEdit) {
				findHotel.price[0] = pricesEdit
			}
			if (textContentEdit) {
				findHotel.textContent = textContentEdit
			}
			if (imageContentUrlEdit) {
				findHotel.imageContentUrl = imageContentUrlEdit
			}
			//  "meetingImageContentUrl" AND "meetingDetails" EDITO EN "AddMeetingsImagesModal.jsx"
			if (meetingImageContentUrl) {
				findHotel.meetingImageContentUrl = meetingImageContentUrl
			}
			if (meetingDetails) {
				findHotel.meetingDetails = meetingDetails
			}
			state.project.schedule[dayIndex].overnight.hotels.splice(hotelIndex, 1)
			state.project.schedule[dayIndex].overnight.hotels.splice(
				hotelIndex,
				0,
				findHotel
			)
		},
		EDIT_GIFT: (state, action) => {
			const {
				qty = null,
				indexGift = null,
				price = null,
				textContent = null
			} = action.payload
			if (qty) {
				state.project.gifts[indexGift].qty = qty
			}
			if (price) {
				state.project.gifts[indexGift].price = price
			}
			if (textContent) {
				state.project.gifts[indexGift].textContent = textContent
			}
		},
		EDIT_MODAL_EVENT: (state, action) => {
			const { id, dayIndex, typeOfEvent, data, imagesEvent, textContent } =
				action.payload
			const typeOfEventKey = typeOfEvent as 'morningEvents' | 'afternoonEvents'
			const findEvent = state.project.schedule[dayIndex][
				typeOfEventKey
			].events.find((el) => el._id === id)
			if (!findEvent) {
				throw new Error('ERROR! Event not found')
			}
			const updateEvent = {
				...findEvent,
				price: data.price,
				pricePerPerson: data.pricePerPerson,
				textContent,
				imageContentUrl: imagesEvent
			}
			const findIndexEvent = state.project.schedule[dayIndex][
				typeOfEventKey
			].events.findIndex((el) => el._id === id)
			const copyEvents = [
				...state.project.schedule[dayIndex][typeOfEventKey].events
			]
			copyEvents.splice(findIndexEvent, 1)
			copyEvents.splice(findIndexEvent, 0, updateEvent)
			state.project.schedule[dayIndex][typeOfEventKey].events = copyEvents
		},
		EDIT_MODAL_RESTAURANT: (
			state,
			action: PayloadAction<EditModalRestaurantPayload>
		) => {
			const { id, dayIndex, typeOfEvent, data, imagesEvent, textContent } =
				action.payload
			const typeOfEventKey = typeOfEvent as 'lunch' | 'dinner'
			const findEvent = state.project.schedule[dayIndex][
				typeOfEventKey
			].restaurants.find((el) => el._id === id)
			if (!findEvent) {
				throw new Error('ERROR! Event not found')
			}
			const updateEvent = {
				...findEvent,
				price: data.price,
				isVenue: data.isVenue,
				textContent,
				imageContentUrl: imagesEvent
			}
			const findIndexEvent = state.project.schedule[dayIndex][
				typeOfEventKey
			].restaurants.findIndex((el) => el._id === id)
			const copyEvents = [
				...state.project.schedule[dayIndex][typeOfEventKey].restaurants
			]
			copyEvents.splice(findIndexEvent, 1)
			copyEvents.splice(findIndexEvent, 0, updateEvent)
			state.project.schedule[dayIndex][typeOfEventKey].restaurants = copyEvents
		},
		EDIT_MODAL_MEETING: (state, action) => {
			const { id, dayIndex, typeOfEvent, data } = action.payload
			const typeOfEventKey = typeOfEvent as
				| 'morningMeetings'
				| 'afternoonMeetings'
				| 'fullDayMeetings'
			const updateMeeting = {
				...data
			}
			const findIndexMeeting = state.project.schedule[dayIndex][
				typeOfEventKey
			].meetings.findIndex((el) => el._id === id)
			const copyMeetings = [
				...state.project.schedule[dayIndex][typeOfEventKey].meetings
			]
			copyMeetings.splice(findIndexMeeting, 1)
			copyMeetings.splice(findIndexMeeting, 0, updateMeeting)
			state.project.schedule[dayIndex][typeOfEventKey].meetings = copyMeetings
		},
		ADD_INTRO_RESTAURANT: (state, action) => {
			const { dayIndex, typeEvent, textContent } = action.payload
			const typeOfEventKey = typeEvent as 'lunch' | 'dinner'
			const isRestaurants = Object.keys(
				state.project.schedule[dayIndex][typeOfEventKey]
			).includes('restaurants')
			if (isRestaurants) {
				const copyAllEvents = {
					restaurants: [
						...state.project.schedule[dayIndex][typeOfEventKey].restaurants
					],
					intro: textContent
				}
				state.project.schedule[dayIndex][typeOfEventKey] = copyAllEvents
			} else {
				const copyAllEvents = {
					restaurants: [
						...state.project.schedule[dayIndex][typeOfEventKey].restaurants
					],
					intro: textContent
				}
				state.project.schedule[dayIndex][typeOfEventKey] = copyAllEvents
			}
		},
		ADD_INTRO_EVENT: (state, action) => {
			const { dayIndex, typeEvent, textContent } = action.payload
			const typeOfEventKey = typeEvent as 'morningEvents' | 'afternoonEvents'
			const isEvents = Object.keys(
				state.project.schedule[dayIndex][typeOfEventKey]
			).includes('events')
			if (isEvents) {
				const copyAllEvents = {
					events: [...state.project.schedule[dayIndex][typeOfEventKey].events],
					intro: textContent
				}
				state.project.schedule[dayIndex][typeOfEventKey] = copyAllEvents
			} else {
				const copyAllEvents = {
					events: [...state.project.schedule[dayIndex][typeOfEventKey].events],
					intro: textContent
				}
				state.project.schedule[dayIndex][typeOfEventKey] = copyAllEvents
			}
		},
		ADD_INTRO_MEETING: (state, action) => {
			const { dayIndex, typeEvent, textContent } = action.payload
			const typeOfEventKey = typeEvent as
				| 'morningMeetings'
				| 'afternoonMeetings'
				| 'fullDayMeetings'
			const copyAllEvents = {
				meetings: [
					...state.project.schedule[dayIndex][typeOfEventKey].meetings
				],
				intro: textContent !== '<p><br></p>' ? textContent : ''
			}
			state.project.schedule[dayIndex][typeOfEventKey] = copyAllEvents
		},
		ADD_INTRO_HOTEL_OVERNIGHT: (state, action) => {
			const { dayIndex, typeEvent, textContent } = action.payload
			const typeOfEventKey = typeEvent as 'overnight'
			const copyAllEvents = {
				hotels: [...state.project.schedule[dayIndex][typeOfEventKey].hotels],
				intro: textContent !== '<p><br></p>' ? textContent : ''
			}
			state.project.schedule[dayIndex][typeOfEventKey] = copyAllEvents
		},
		ADD_INTRO_TRANSFER_TO_ITINERARY: (state, action) => {
			const { dayIndex, typeEvent, textContent } = action.payload
			const intro = textContent !== '<p><br></p>' ? textContent : ''
			state.project.schedule[dayIndex].itinerary.intro = intro
		},

		ADD_INTRO_EVENT_TO_ITENERARY: (
			state,
			action: PayloadAction<IntroEventItineraryPayload>
		) => {
			const { dayIndex, typeOfEvent, textContent } = action.payload
			const typesMeals = ['lunch', 'dinner']
			const typesActivities = [
				'morningActivity',
				'afternoonActivity',
				'nightActivity'
			]
			if (typesActivities.includes(typeOfEvent)) {
				const keyActivity = typeOfEvent as
					| 'morningActivity'
					| 'afternoonActivity'
					| 'nightActivity'
				const copyAllEvents = {
					events: [
						...state.project.schedule[dayIndex].itinerary[keyActivity].events
					],
					intro: textContent !== '<p><br></p>' ? textContent : ''
				}
				state.project.schedule[dayIndex].itinerary[keyActivity] = copyAllEvents
			}
			if (typesMeals.includes(typeOfEvent)) {
				const keyMeal = typeOfEvent as 'lunch' | 'dinner'
				const copyAllEvents = {
					restaurants: [
						...state.project.schedule[dayIndex].itinerary[keyMeal].restaurants
					],
					intro: textContent !== '<p><br></p>' ? textContent : ''
				}
				state.project.schedule[dayIndex].itinerary[keyMeal] = copyAllEvents
			}
		},
		ADD_TRANSFER_TO_SCHEDULE: (state, action: TransfersAction) => {
			const { timeOfEvent, transfers } = action.payload
			if (timeOfEvent === 'transfer_in') {
				state.project.schedule[0].transfer_in = transfers
				return
			}
			if (timeOfEvent === 'transfer_out') {
				const lastIndex = state.project.schedule.length - 1
				state.project.schedule[lastIndex].transfer_out = transfers
				return
			}
		},
		ADD_TRANSFER_IN_OR_TRANSFER_OUT_TO_SCHEDULE: (state, action) => {
			const { dayOfEvent, timeOfEvent, event } = action.payload
			const dayOfEventKey = dayOfEvent as number
			const timeOfEventKey = timeOfEvent as TimeOfEvent
			state.project.schedule[dayOfEventKey][timeOfEventKey] = event
		},
		EDIT_TRANSFER_EVENT_OR_RESTAURANT: (state, action) => {
			const { typeEvent, dayIndex, idEvent, transferEdit } = action.payload
			const typesActivities = ['morningEvents', 'afternoonEvents']
			const typesMeals = ['lunch', 'dinner']
			if (typesActivities.includes(typeEvent)) {
				const eventKey = typeEvent as 'morningEvents' | 'afternoonEvents'
				const event = state.project.schedule[dayIndex][eventKey].events.find(
					(el) => el._id === idEvent
				)
				if (!event) {
					throw new Error('ERROR! Event not found')
				}
				const updateEvent = { ...event, transfer: transferEdit }
				const findIndexEvent = state.project.schedule[dayIndex][
					eventKey
				].events.findIndex((el) => el._id === idEvent)
				const copyEvents = [
					...state.project.schedule[dayIndex][eventKey].events
				]
				copyEvents.splice(findIndexEvent, 1)
				copyEvents.splice(findIndexEvent, 0, updateEvent)
				state.project.schedule[dayIndex][eventKey].events = copyEvents
				return
			}
			if (typesMeals.includes(typeEvent)) {
				const restaurantKey = typeEvent as 'lunch' | 'dinner'
				const restaurant = state.project.schedule[dayIndex][
					restaurantKey
				].restaurants.find((el) => el._id === idEvent)
				if (!restaurant) {
					throw new Error('ERROR! Restaurant not found')
				}
				const updateRestaurant = { ...restaurant, transfer: transferEdit }
				const findIndexRestaurant = state.project.schedule[dayIndex][
					restaurantKey
				].restaurants.findIndex((el) => el._id === idEvent)
				const copyRestaurants = [
					...state.project.schedule[dayIndex][restaurantKey].restaurants
				]
				copyRestaurants.splice(findIndexRestaurant, 1)
				copyRestaurants.splice(findIndexRestaurant, 0, updateRestaurant)
				state.project.schedule[dayIndex][restaurantKey].restaurants =
					copyRestaurants
				return
			}
		},
		ADD_OR_EDIT_VENUE: (state, action) => {
			const { typeMeal, dayIndex, idRestaurant, venueEdit } = action.payload
			const restaurantKey = typeMeal as 'lunch' | 'dinner'
			const restaurant = state.project.schedule[dayIndex][
				restaurantKey
			].restaurants.find((el) => el._id === idRestaurant)
			if (!restaurant) {
				throw new Error('ERROR! Restaurant not found')
			}
			const updateRestaurant = { ...restaurant, venue_price: venueEdit }
			const findIndexRestaurant = state.project.schedule[dayIndex][
				restaurantKey
			].restaurants.findIndex((el) => el._id === idRestaurant)
			state.project.schedule[dayIndex][restaurantKey].restaurants[
				findIndexRestaurant
			] = updateRestaurant
		},
		ADD_ENTERTAINMENT_IN_RESTAURANT: (state, action) => {
			const { typeMeal, dayIndex, idRestaurant, entertainmentShow } =
				action.payload
			const restaurantKey = typeMeal as 'lunch' | 'dinner'
			const restaurant = state.project.schedule[dayIndex][
				restaurantKey
			].restaurants.find((el) => el._id === idRestaurant)
			if (!restaurant) {
				throw new Error('ERROR! Restaurant not found')
			}
			const findIndexRestaurant = state.project.schedule[dayIndex][
				restaurantKey
			].restaurants.findIndex((el) => el._id === idRestaurant)
			restaurant.entertainment?.push(entertainmentShow)
			state.project.schedule[dayIndex][restaurantKey].restaurants[
				findIndexRestaurant
			] = restaurant
		},
		DELETED_ENTERTAINMENT_IN_RESTAURANT: (state, action) => {
			const { typeMeal, dayIndex, idRestaurant, idEntertainment } =
				action.payload
			const restaurantKey = typeMeal as 'lunch' | 'dinner'
			const restaurant = state.project.schedule[dayIndex][
				restaurantKey
			].restaurants.find((el) => el._id === idRestaurant)
			if (!restaurant) {
				throw new Error('ERROR! Restaurant not found')
			}
			restaurant.entertainment = restaurant.entertainment?.filter(
				(el) => el._id !== idEntertainment
			)
			const findIndexRestaurant = state.project.schedule[dayIndex][
				restaurantKey
			].restaurants.findIndex((el) => el._id === idRestaurant)
			state.project.schedule[dayIndex][restaurantKey].restaurants[
				findIndexRestaurant
			] = restaurant
		},
		EDIT_ENTERTAINMENT_IN_RESTAURANT: (state, action) => {
			const { typeMeal, dayIndex, idRestaurant, idEntertainment, editPrice } =
				action.payload
			const restaurantKey = typeMeal as 'lunch' | 'dinner'
			const restaurant = state.project.schedule[dayIndex][
				restaurantKey
			].restaurants.find((el) => el._id === idRestaurant)
			if (!restaurant) {
				throw new Error('ERROR! Restaurant not found')
			}
			const findIndexEntertainment = restaurant.entertainment?.findIndex(
				(el) => el._id === idEntertainment
			) as number
			if (!restaurant.entertainment) {
				throw new Error(
					'ERROR! Entertainment property not found in the Restaurant'
				)
			}
			if (findIndexEntertainment === -1) {
				console.log(findIndexEntertainment)
				throw new Error('ERROR! Entertainment not found')
			}
			restaurant.entertainment[findIndexEntertainment].price = editPrice
			// const findIndexRestaurant = state.project.schedule[dayIndex][restaurantKey].restaurants.
			// 	findIndex(el => el._id === idRestaurant)
			// state.project.schedule[dayIndex][restaurantKey].restaurants[findIndexRestaurant] = restaurant
		},
		REMOVE_MEETINGS_BY_HOTEL_FROM_PROJECT: (state, action) => {
			const timesMeeting: TimeOfMeeting[] = [
				'morningMeetings',
				'afternoonMeetings',
				'fullDayMeetings'
			]
			const hotelId = action.payload
			for (let i = 0; i < state.project.schedule.length; i++) {
				for (let j = 0; j < timesMeeting.length; j++) {
					state.project.schedule[i][timesMeeting[j]].meetings =
						state.project.schedule[i][timesMeeting[j]].meetings.filter(
							(el) => el.hotel[0] !== hotelId
						)
				}
			}
		},
		HANDLE_PROJECT_INPUT_CHANGE: (
			state,
			action: PayloadAction<{
				name: string
				value: string | boolean
				type?: string
			}>
		) => {
			const { name, value, type } = action.payload

			const newValue =
				type === 'checkbox' || type === 'radio' ? Boolean(value) : value

			state.project = {
				...state.project,
				[name]: newValue
			}
		},
		HANDLE_PROJECT_BLUR: (
			state,
			action: PayloadAction<{
				name: string
				value: string | boolean
				checked?: boolean
				type: string
			}>
		) => {
			const { name, value, checked, type } = action.payload

			try {
				// Validate the field using Yup schema
				projectValidationSchema.validateSyncAt(name, {
					[name]: type === 'checkbox' ? checked : value
				})
				// Clear the error if validation passes
				state.errors[name] = ''
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					// Set the error message if validation fails
					state.errors[name] = err.message
				}
			}
		},
		CLEAR_PROJECT: (state) => {
			state.project = {
				code: '',
				accountManager: [],
				groupName: '',
				groupLocation: '',
				arrivalDay: '',
				departureDay: '',
				nrPax: 0,
				projectIntro: [],
				suplementaryText: false,
				hotels: [],
				status: 'Received',
				hideDates: false,
				estimate: 0,
				budget: 'budget',
				imageContentUrl: [],
				hasSideMenu: true,
				hasExternalCorporateImage: false,
				clientAccManager: [],
				clientCompany: [],
				schedule: [],
				gifts: [],
				multiDestination: false,
				languageVendorDescriptions: '',
				invoices: [],
				collectionsFromClient: []
			}
		},
		TOGGLE_MODAL: (state) => {
			state.modalIsOpen = !state.modalIsOpen
		}
	}
})

export const {
	SET_CURRENT_PROJECT,
	ADD_HOTEL_TO_PROJECT,
	ADD_HOTEL_OVERNIGHT_TO_SCHEDULE,
	ADD_EVENT_TO_SCHEDULE,
	ADD_ITENERARY_TRANSFER_TO_SCHEDULE,
	ADD_EVENT_TO_ITENERARY,
	ADD_GIFT_TO_PROJECT,
	ADD_INTRO_RESTAURANT,
	ADD_INTRO_EVENT,
	ADD_INTRO_MEETING,
	ADD_INTRO_HOTEL_OVERNIGHT,
	ADD_INTRO_TRANSFER_TO_ITINERARY,
	ADD_INTRO_EVENT_TO_ITENERARY,
	ADD_TRANSFER_TO_SCHEDULE,
	ADD_TRANSFER_IN_OR_TRANSFER_OUT_TO_SCHEDULE,
	REMOVE_GIFT_FROM_PROJECT,
	REMOVE_HOTEL_FROM_PROJECT,
	REMOVE_HOTEL_OVERNIGHT_FROM_SCHEDULE,
	REMOVE_EVENT_FROM_SCHEDULE,
	REMOVE_EVENT_TO_ITENERARY,
	REMOVE_TRANSFER_FROM_SCHEDULE,
	REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE,
	EXPAND_TRANSFERS_TO_OPTIONS,
	DRAG_AND_DROP_EVENT,
	DRAG_AND_DROP_RESTAURANT,
	DRAG_AND_DROP_HOTEL,
	DRAG_AND_DROP_HOTEL_OVERNIGHT,
	EDIT_MODAL_HOTEL,
	EDIT_MODAL_HOTEL_OVERNIGHT,
	EDIT_GIFT,
	EDIT_MODAL_EVENT,
	EDIT_MODAL_RESTAURANT,
	EDIT_MODAL_MEETING,
	EDIT_TRANSFER_EVENT_OR_RESTAURANT,
	ADD_OR_EDIT_VENUE,
	ADD_ENTERTAINMENT_IN_RESTAURANT,
	DELETED_ENTERTAINMENT_IN_RESTAURANT,
	EDIT_ENTERTAINMENT_IN_RESTAURANT,
	REMOVE_MEETINGS_BY_HOTEL_FROM_PROJECT,
	CLEAR_PROJECT,
	HANDLE_PROJECT_BLUR,
	HANDLE_PROJECT_INPUT_CHANGE,
	TOGGLE_MODAL
} = currentProjectSlice.actions

export default currentProjectSlice.reducer
