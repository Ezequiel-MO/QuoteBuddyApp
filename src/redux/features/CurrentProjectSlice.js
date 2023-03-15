import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	project: JSON.parse(localStorage.getItem('currentProject')) || {}
}

export const currentProjectSlice = createSlice({
	name: 'currentProject',
	initialState,
	reducers: {
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
		ADD_EVENT_FROM_SCHEDULE_IN_A_GIVEN_POSITION: (state, action) => {
			const { dayOfEvent, timeOfEvent, event, timeOfEventIndex } =
				action.payload
			//add event to the timeOfEvent array in the given position given by timeOfEventIndex
			const updatedSchedule = state.project.schedule.map((day, index) => {
				if (index === dayOfEvent) {
					return {
						...day,
						[timeOfEvent]: [
							...day[timeOfEvent].slice(0, timeOfEventIndex),
							event,
							...day[timeOfEvent].slice(timeOfEventIndex)
						]
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
				dayIndex,
				copyDayEvents
			} = action.payload
			const morningOrafternoonEvent = ["morningEvents", "afternoonEvents"]
			const lunchOrDinner = ["lunch", "dinner"]
			if (timeOfEventStart === event && dayStartIndex === dayIndex) {
				const copy = state.project.schedule[dayStartIndex][timeOfEventStart] 
				const [elementEvent] = copy.splice(startIndexDayEvent, 1) 
				copy.splice(index, 0, elementEvent) // lo guardo en el array "copy"
				// state.project.schedule[dayIndex][event] = copy
				return
			}
			if (morningOrafternoonEvent.includes(timeOfEventStart) && morningOrafternoonEvent.includes(event)  ) {
				const copy = state.project.schedule[dayStartIndex][timeOfEventStart]
				const [elementEvent] = copy.splice(startIndexDayEvent, 1)
				copyDayEvents.splice(index, 0, elementEvent) 
				state.project.schedule[dayIndex][event] = copyDayEvents 
				return
			}
			if(lunchOrDinner.includes(timeOfEventStart ) && lunchOrDinner.includes(event) ){
				const copy = state.project.schedule[dayStartIndex][timeOfEventStart]
				const [elementEvent] = copy.splice(startIndexDayEvent, 1)
				copyDayEvents.splice(index, 0, elementEvent) 
				state.project.schedule[dayIndex][event] = copyDayEvents
				return
			}

		},
		CLEAR_PROJECT: (state) => {
			state.project = {}
		}
	}
})

export const {
	SET_CURRENT_PROJECT,
	ADD_HOTEL_TO_PROJECT,
	ADD_EVENT_TO_SCHEDULE,
	REMOVE_HOTEL_FROM_PROJECT,
	REMOVE_EVENT_FROM_SCHEDULE,
	REMOVE_TRANSFER_FROM_SCHEDULE,
	EXPAND_TRANSFERS_TO_OPTIONS,
	DRAG_AND_DROP_EVENT,
	CLEAR_PROJECT
} = currentProjectSlice.actions

export const selectCurrentProject = (state) => state.currentProject.project

export default currentProjectSlice.reducer
