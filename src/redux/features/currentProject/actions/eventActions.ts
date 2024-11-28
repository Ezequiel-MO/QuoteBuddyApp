import { AppThunk } from 'src/redux/store'
import {
	ADD_EVENT_TO_SCHEDULE,
	ADD_INTRO_EVENT,
	EDIT_MODAL_EVENT,
	REMOVE_EVENT_FROM_SCHEDULE
} from '../CurrentProjectSlice'
import { IAddIntro, AddEventAction } from '../types'
import { useAppDispatch } from 'src/hooks/redux/redux'

export const useEventActions = () => {
	const dispatch = useAppDispatch()

	const addEventToSchedule = (payload: AddEventAction['payload']) => {
		dispatch(addEventToScheduleThunk(payload))
	}

	const removeEventFromSchedule = ({
		dayIndex,
		timeOfEvent,
		eventId
	}: {
		dayIndex: number
		timeOfEvent: string
		eventId: string
	}) => {
		dispatch(REMOVE_EVENT_FROM_SCHEDULE({ dayIndex, timeOfEvent, eventId }))
	}

	const editModalEvent = (eventModal: any) => {
		dispatch(EDIT_MODAL_EVENT(eventModal))
	}

	const addIntroEvent = (introEvent: IAddIntro) => {
		dispatch(ADD_INTRO_EVENT(introEvent))
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
