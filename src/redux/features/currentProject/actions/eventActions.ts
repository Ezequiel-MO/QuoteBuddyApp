import { useDispatch } from 'react-redux'
import {
	ADD_EVENT_TO_SCHEDULE,
	ADD_INTRO_EVENT,
	EDIT_MODAL_EVENT,
	REMOVE_EVENT_FROM_SCHEDULE
} from '../CurrentProjectSlice'
import { IAddIntro } from '../types'
import { useAppDispatch } from 'src/hooks/redux/redux'

export const useEventActions = () => {
	const dispatch = useAppDispatch()

	const addEventToSchedule = (event: any) => {
		dispatch(ADD_EVENT_TO_SCHEDULE(event))
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
