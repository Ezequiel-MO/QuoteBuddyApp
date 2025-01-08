import { useAppDispatch } from 'src/hooks/redux/redux'
import {
	AddEventAction,
	EditModalEventPayload,
	RemoveEventActionPayload,
	UpdateAfternoonActivityPayload,
	UpdateMorningActivityPayload
} from '../../types'
import * as thunks from './thunks'

export const useEventActions = () => {
	const dispatch = useAppDispatch()

	const addEventToSchedule = (payload: AddEventAction['payload']) => {
		dispatch(thunks.addEventToScheduleThunk(payload))
	}

	const updateMorningActivity = (payload: UpdateMorningActivityPayload) => {
		dispatch(thunks.updateMorningActivityThunk(payload))
	}

	const updateAfternoonActivity = (payload: UpdateAfternoonActivityPayload) => {
		dispatch(thunks.updateAfternoonActivityThunk(payload))
	}

	const removeEventFromSchedule = (payload: RemoveEventActionPayload) => {
		dispatch(thunks.removeEventFromScheduleThunk(payload))
	}

	const editModalEvent = (eventModal: EditModalEventPayload) => {
		dispatch(thunks.editModalEventThunk(eventModal))
	}

	return {
		addEventToSchedule,
		updateMorningActivity,
		updateAfternoonActivity,
		removeEventFromSchedule,
		editModalEvent
	}
}
