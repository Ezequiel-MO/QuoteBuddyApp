import { IEditModalMeeting, UpdateMeetingPayload } from '../../types'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { TimeOfEvent } from '../../types'
import * as thunks from './thunks'

export interface RemoveMeetingActionPayload {
	dayIndex: number
	timeOfMeeting: TimeOfEvent
	meetingId: string
}

export const useMeetingActions = () => {
	const dispatch = useAppDispatch()

	const updateMeeting = (payload: UpdateMeetingPayload) => {
		dispatch(thunks.updateMeetingThunk(payload))
	}

	const editModalMeeting = (meetingModal: IEditModalMeeting) => {
		dispatch(thunks.editModalMeetingThunk(meetingModal))
	}

	const removeMeetingsByHotel = (hotelId: string) => {
		dispatch(thunks.removeMeetingsByHotelFromProjectThunk(hotelId))
	}

	const removeMeetingFromSchedule = (payload: RemoveMeetingActionPayload) => {
		dispatch(thunks.removeMeetingFromScheduleThunk(payload))
	}

	return {
		updateMeeting,
		editModalMeeting,
		removeMeetingsByHotel,
		removeMeetingFromSchedule
	}
}
