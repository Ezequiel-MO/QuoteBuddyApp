import { AppThunk } from 'src/redux/store'
import {
	ADD_EVENT_TO_SCHEDULE,
	ADD_INTRO_EVENT,
	EDIT_MODAL_EVENT,
	REMOVE_EVENT_FROM_SCHEDULE
} from '../CurrentProjectSlice'
import { IAddIntro, AddEventAction, RemoveEventActionPayload } from '../types'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { IActivity, IDay } from '@interfaces/project'

export const useEventActions = () => {
	const dispatch = useAppDispatch()

	const addEventToSchedule = (payload: AddEventAction['payload']) => {
		dispatch(addEventToScheduleThunk(payload))
	}

	const removeEventFromSchedule = (payload: RemoveEventActionPayload) => {
		dispatch(removeEventFromScheduleThunk(payload))
	}

	const editModalEvent = (eventModal: any) => {
		dispatch(EDIT_MODAL_EVENT(eventModal))
	}

	const addIntroEvent = (introEvent: IAddIntro) => {
		dispatch(addIntroEventThunk(introEvent))
	}

	return {
		addEventToSchedule,
		removeEventFromSchedule,
		editModalEvent,
		addIntroEvent
	}
}

const addEventToScheduleThunk = (
	payload: AddEventAction['payload']
): AppThunk => {
	return (dispatch, getState) => {
		// Access the current state
		const state = getState()
		const currentProject = state.currentProject.project

		const { dayOfEvent, timeOfEvent, event } = payload

		// Perform the logic to compute the updated schedule
		const updatedSchedule = currentProject.schedule?.map((day, index) => {
			if (index === dayOfEvent) {
				switch (timeOfEvent) {
					case 'morningEvents':
					case 'afternoonEvents':
						return {
							...day,
							[timeOfEvent]: {
								...day[timeOfEvent],
								events: [...day[timeOfEvent].events, event]
							}
						}
					case 'morningMeetings':
					case 'afternoonMeetings':
					case 'fullDayMeetings':
						return {
							...day,
							[timeOfEvent]: {
								...day[timeOfEvent],
								meetings: [...day[timeOfEvent].meetings, event]
							}
						}
					case 'lunch':
					case 'dinner':
						return {
							...day,
							[timeOfEvent]: {
								...day[timeOfEvent],
								restaurants: [...day[timeOfEvent].restaurants, event]
							}
						}
					default:
						return day
				}
			}
			return day
		})

		// Dispatch the action with the updated schedule
		dispatch(ADD_EVENT_TO_SCHEDULE(updatedSchedule))
	}
}

const addIntroEventThunk = (introEvent: IAddIntro): AppThunk => {
	return (dispatch, getState) => {
		const { dayIndex, typeEvent, textContent } = introEvent
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			console.error(`Invalid dayIndex: ${dayIndex}`)
			return
		}

		if (!['morningEvents', 'afternoonEvents'].includes(typeEvent)) {
			console.error(`Invalid typeEvent: ${typeEvent}`)
			return
		}

		// Extract the day to update
		const dayToUpdate = currentSchedule[dayIndex]

		// Ensure the typeEvent key exists and has the expected structure
		const eventGroup = dayToUpdate[typeEvent]
		if (
			!eventGroup ||
			typeof eventGroup !== 'object' ||
			!Array.isArray(eventGroup.events)
		) {
			console.error(
				`Invalid structure for ${typeEvent}. Expected an object with 'events' and 'intro' keys.`,
				eventGroup
			)
			return
		}

		// Update the intro of the matching typeEvent
		const updatedEventGroup = {
			...eventGroup,
			intro: textContent
		}

		// Create the updated day
		const updatedDay = {
			...dayToUpdate,
			[typeEvent]: updatedEventGroup
		}

		// Create the updated schedule
		const updatedSchedule = [
			...currentSchedule.slice(0, dayIndex),
			updatedDay,
			...currentSchedule.slice(dayIndex + 1)
		]

		dispatch(ADD_INTRO_EVENT(updatedSchedule))
	}
}

const removeEventFromScheduleThunk = (
	payload: RemoveEventActionPayload
): AppThunk => {
	return (dispatch, getState) => {
		const { dayIndex, timeOfEvent, eventId } = payload
		const state = getState()
		const currentSchedule = state.currentProject.project.schedule

		//Perform the state manipulation logic

		const updatedSchedule = currentSchedule?.map((day, index) => {
			if (index === dayIndex) {
				switch (timeOfEvent) {
					case 'morningEvents':
					case 'afternoonEvents':
						return {
							...day,
							[timeOfEvent]: {
								...day[timeOfEvent],
								events: day[timeOfEvent].events.filter(
									(event) => event._id !== eventId
								)
							}
						}
					case 'morningMeetings':
					case 'afternoonMeetings':
					case 'fullDayMeetings':
						return {
							...day,
							[timeOfEvent]: {
								...day[timeOfEvent],
								meetings: day[timeOfEvent].meetings.filter(
									(meeting) => meeting._id !== eventId
								)
							}
						}
					case 'lunch':
					case 'dinner':
						return {
							...day,
							[timeOfEvent]: {
								...day[timeOfEvent],
								restaurants: day[timeOfEvent].restaurants.filter(
									(restaurant) => restaurant._id !== eventId
								)
							}
						}
					default:
						return day
				}
			}
			return day
		})
		dispatch(REMOVE_EVENT_FROM_SCHEDULE(updatedSchedule))
	}
}
