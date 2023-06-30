import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	project: JSON.parse(localStorage.getItem('currentProject')) || {},
	meetGreetOrDispatch: [],
	assistance: []
}

const EVENT_TYPES_ACTIVITIES = ['morningEvents', 'afternoonEvents']

export const currentProjectSlice = createSlice({
	name: 'currentProject',
	initialState,
	reducers: {
		ADD_MEETGREET_OR_DISPATCH: (state, action) => {
			state.meetGreetOrDispatch = [...state.meetGreetOrDispatch, action.payload]
		},
		ADD_ASSISTANCE: (state, action) => {
			state.assistance = [...state.assistance, action.payload]
		},
		REMOVE_MEETGREET_OR_DISPATCH: (state, action) => {
			const { id } = action.payload
			state.meetGreetOrDispatch = state.meetGreetOrDispatch.filter(
				(el) => el._id !== id
			)
		},
		REMOVE_ASSISTANCE: (state, action) => {
			const { id } = action.payload
			state.assistance = state.assistance.filter((el) => el._id !== id)
		},
		SET_CURRENT_PROJECT: (state, action) => {
			state.project = action.payload
		},
		ADD_HOTEL_TO_PROJECT: (state, action) => {
			state.project.hotels = [...state.project.hotels, action.payload]
		},
		ADD_EVENT_TO_SCHEDULE: (state, action) => {
			const { dayOfEvent, timeOfEvent, event } = action.payload
			let eventType = 'restaurants'
			if (EVENT_TYPES_ACTIVITIES.includes(timeOfEvent)) {
				eventType = 'events'
			}
			const updatedSchedule = state.project.schedule.map((day, index) => {
				if (index === dayOfEvent) {
					return {
						...day,
						[timeOfEvent]: {
							...day[timeOfEvent],
							[eventType]: [...day[timeOfEvent][eventType], event]
						}
					}
				}
				return day
			})
			state.project.schedule = updatedSchedule
		},
		ADD_GIFT_TO_PROJECT: (state, action) => {
			state.project.gifts = [...state.project.gifts, action.payload]
		},
		REMOVE_GIFT_FROM_PROJECT: (state, action) => {
			const { id } = action.payload
			state.project.gifts = state.project.gifts.filter((el) => el._id !== id)
		},
		REMOVE_HOTEL_FROM_PROJECT: (state, action) => {
			state.project.hotels = state.project.hotels.filter(
				(hotel) => hotel._id !== action.payload
			)
		},
		REMOVE_EVENT_FROM_SCHEDULE: (state, action) => {
			const { dayOfEvent, timeOfEvent, eventId } = action.payload
			let eventType = 'restaurants'
			if (EVENT_TYPES_ACTIVITIES.includes(timeOfEvent)) {
				eventType = 'events'
			}

			const updatedSchedule = state.project.schedule.map((day, index) => {
				if (index === dayOfEvent) {
					return {
						...day,
						[timeOfEvent]: {
							...day[timeOfEvent],
							[eventType]: day[timeOfEvent][eventType].filter(
								(event) => event._id !== eventId
							)
						}
					}
				}
				return day
			})
			state.project.schedule = updatedSchedule
		},

		REMOVE_TRANSFER_FROM_SCHEDULE: (state, action) => {
			if (action.payload === 'transfer_in') {
				state.project.schedule[0].transfer_in = []
			} else if (action.payload === 'transfer_out') {
				const lastIndex = state.project.schedule.length - 1
				state.project.schedule[lastIndex].transfer_out = []
			}
		},
		EXPAND_TRANSFERS_TO_OPTIONS: (state) => {
			state.project.schedule = state.project.schedule.map((day) => {
				const transferEvents = [
					'morningEvents',
					'lunch',
					'afternoonEvents',
					'dinner'
				]
				transferEvents.forEach((event) => {
					day[event] = day[event].map((ev) => {
						if (ev.transfer) {
							return {
								...ev,
								transfer: day[event][0].transfer
							}
						}
						return ev
					})
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
		EDIT_MODAL_HOTEL: (state, action) => {
			const { pricesEdit, textContentEdit, imageContentUrlEdit, id } =
				action.payload
			const hotelIndex = state.project.hotels.findIndex((el) => el._id === id)
			const findHotel = state.project.hotels.find((el) => el._id === id)
			findHotel.price[0] = pricesEdit
			findHotel.textContent = textContentEdit
			findHotel.imageContentUrl = imageContentUrlEdit
			state.project.hotels.splice(hotelIndex, 1)
			state.project.hotels.splice(hotelIndex, 0, findHotel)
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
			const findEvent = state.project.schedule[dayIndex][typeOfEvent].find(
				(el) => el._id === id
			)
			const updateEvent = {
				...findEvent,
				price: data.price,
				pricePerPerson: data.pricePerPerson,
				textContent,
				imageContentUrl: imagesEvent
			}
			const findIndexEvent = state.project.schedule[dayIndex][
				typeOfEvent
			].findIndex((el) => el._id === id)
			const copyEvents = [...state.project.schedule[dayIndex][typeOfEvent]]
			copyEvents.splice(findIndexEvent, 1)
			copyEvents.splice(findIndexEvent, 0, updateEvent)
			state.project.schedule[dayIndex][typeOfEvent] = copyEvents
		},
		EDIT_MODAL_RESTAURANT: (state, action) => {
			const { id, dayIndex, typeOfEvent, data, imagesEvent, textContent } =
				action.payload
			const findEvent = state.project.schedule[dayIndex][
				typeOfEvent
			].restaurants.find((el) => el._id === id)
			const updateEvent = {
				...findEvent,
				price: data.price,
				isVenue: data.isVenue,
				textContent,
				imageContentUrl: imagesEvent
			}
			const findIndexEvent = state.project.schedule[dayIndex][
				typeOfEvent
			].restaurants.findIndex((el) => el._id === id)
			const copyEvents = [
				...state.project.schedule[dayIndex][typeOfEvent].restaurants
			]
			copyEvents.splice(findIndexEvent, 1)
			copyEvents.splice(findIndexEvent, 0, updateEvent)
			state.project.schedule[dayIndex][typeOfEvent].restaurants = copyEvents
		},
		ADD_INTRO_RESTAURANT: (state, action) => {
			const { dayIndex, typeEvent, textContent } = action.payload
			const isRestaurants = Object.keys(
				state.project.schedule[dayIndex][typeEvent]
			).includes('restaurants')
			if (isRestaurants) {
				const copyAllEvents = {
					restaurants: [
						...state.project.schedule[dayIndex][typeEvent].restaurants
					],
					intro: textContent
				}
				state.project.schedule[dayIndex][typeEvent] = copyAllEvents
			} else {
				const copyAllEvents = {
					restaurants: [...state.project.schedule[dayIndex][typeEvent]],
					intro: textContent
				}
				state.project.schedule[dayIndex][typeEvent] = copyAllEvents
			}
		},
		ADD_INTRO_EVENT: (state, action) => {
			const { dayIndex, typeEvent, textContent } = action.payload
			const isEvents = Object.keys(state.project.schedule[dayIndex][typeEvent]).includes('events')
			if (isEvents) {
				const copyAllEvents = {
					events: [...state.project.schedule[dayIndex][typeEvent].events],
					intro: textContent
				}
				state.project.schedule[dayIndex][typeEvent] = copyAllEvents
			} else {
				const copyAllEvents = {
					events: [...state.project.schedule[dayIndex][typeEvent]],
					intro: textContent
				}
				state.project.schedule[dayIndex][typeEvent] = copyAllEvents
			}
		},
		CLEAR_PROJECT: (state) => {
			state.project = {}
		}
	}
})

export const {
	ADD_MEETGREET_OR_DISPATCH,
	ADD_ASSISTANCE,
	REMOVE_MEETGREET_OR_DISPATCH,
	REMOVE_ASSISTANCE,
	SET_CURRENT_PROJECT,
	ADD_HOTEL_TO_PROJECT,
	ADD_EVENT_TO_SCHEDULE,
	ADD_GIFT_TO_PROJECT,
	REMOVE_GIFT_FROM_PROJECT,
	REMOVE_HOTEL_FROM_PROJECT,
	REMOVE_EVENT_FROM_SCHEDULE,
	REMOVE_TRANSFER_FROM_SCHEDULE,
	EXPAND_TRANSFERS_TO_OPTIONS,
	DRAG_AND_DROP_EVENT,
	DRAG_AND_DROP_RESTAURANT,
	DRAG_AND_DROP_HOTEL,
	EDIT_MODAL_HOTEL,
	EDIT_GIFT,
	EDIT_MODAL_EVENT,
	EDIT_MODAL_RESTAURANT,
	ADD_INTRO_RESTAURANT,
	ADD_INTRO_EVENT,
	CLEAR_PROJECT
} = currentProjectSlice.actions

export const selectCurrentProject = (state) => state.currentProject.project
export const selectMeetGreetOrDispatch = (state) =>
	state.currentProject.meetGreetOrDispatch
export const selectAssistance = (state) => state.currentProject.assistance

export default currentProjectSlice.reducer
