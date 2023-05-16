import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	project: JSON.parse(localStorage.getItem('currentProject')) || {},
	meetGreetOrDispatch: [],
	assistance: []
}

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
			const typesTransfers = ['transfer_in', 'transfer_out']
			if (typesTransfers.includes(timeOfEvent)) {
				state.project.schedule[dayOfEvent][`${timeOfEvent}`] = [event].flat(2)
			} else {
				const updatedSchedule = state.project.schedule.map((day, index) => {
					if (index === dayOfEvent) {
						return {
							...day,
							[timeOfEvent]: [...day[timeOfEvent], event].flat(2)
						}
					}
					return day
				})
				state.project.schedule = updatedSchedule
			}
		},
		ADD_GIFT_TO_PROJECT: (state, action) => {
			state.project.gifts = [...state.project.gifts, action.payload]
		},
		REMOVE_GIFT_FROM_PROJECT: (state, action) => {
			const { id } = action.payload
			state.project.gifts = state.project.gifts.filter(
				(el) => el._id !== id
			)
		},
		REMOVE_HOTEL_FROM_PROJECT: (state, action) => {
			state.project.hotels = state.project.hotels.filter(
				(hotel) => hotel._id !== action.payload
			)
		},
		REMOVE_EVENT_FROM_SCHEDULE: (state, action) => {
			const { dayOfEvent, timeOfEvent, eventId } = action.payload
			const updatedSchedule = state.project.schedule.map((day, index) => {
				if (index === dayOfEvent) {
					return {
						...day,
						[timeOfEvent]: day[timeOfEvent].filter(
							(event) => event._id !== eventId
						)
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
			const {
				dayStartIndex,
				timeOfEventStart,
				startIndexDayEvent,
				index,
				event,
				dayIndex
			} = action.payload
			const isEventOfType = (
				eventType,
				event,
				timeOfEventStart,
				destinationArray
			) => {
				const isEventTypeIncluded = eventType.includes(timeOfEventStart) && eventType.includes(event)
				const isDestinationArrayEmpty = destinationArray.length === 0
				return (isEventTypeIncluded || (isDestinationArrayEmpty && isEventTypeIncluded))
			}

			const moveEvent = (
				sourceArray,
				startIndex,
				destinationArray,
				endIndex
			) => {
				const [elementEvent] = sourceArray.splice(startIndex, 1)
				destinationArray.splice(endIndex, 0, elementEvent)
			}
			const sourceArray = state.project.schedule[dayStartIndex][timeOfEventStart]
			const destinationArray = state.project.schedule[dayIndex][event]
			const meetings = ['morningMeetings', 'afternoonMeetings', 'fullDayMeetings']
			const morningOrAfternoonEvent = [...meetings, 'morningEvents', 'afternoonEvents']
			const lunchOrDinner = ['lunch', 'dinner']
			if (isEventOfType(morningOrAfternoonEvent, event, timeOfEventStart, destinationArray)
				||
				isEventOfType(lunchOrDinner, event, timeOfEventStart, destinationArray)
			) {
				moveEvent(sourceArray, startIndexDayEvent, destinationArray, index)
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
			const { pricesEdit, textContentEdit, imageContentUrlEdit, id } = action.payload
			const hotelIndex = state.project.hotels.findIndex(el => el._id === id)
			const findHotel = state.project.hotels.find(el => el._id === id)
			findHotel.price[0] = pricesEdit
			findHotel.textContent = textContentEdit
			findHotel.imageContentUrl = imageContentUrlEdit
			state.project.hotels.splice(hotelIndex, 1)
			state.project.hotels.splice(hotelIndex, 0, findHotel)
		},
		EDIT_GIFT: (state, action) => {
			const { qty, indexGift } = action.payload	
			state.project.gifts[indexGift].qty = qty  > 0 ? qty : 1
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
	DRAG_AND_DROP_HOTEL,
	EDIT_MODAL_HOTEL,
	EDIT_GIFT,
	CLEAR_PROJECT
} = currentProjectSlice.actions

export const selectCurrentProject = (state) => state.currentProject.project
export const selectMeetGreetOrDispatch = (state) => state.currentProject.meetGreetOrDispatch
export const selectAssistance = (state) => state.currentProject.assistance

export default currentProjectSlice.reducer
