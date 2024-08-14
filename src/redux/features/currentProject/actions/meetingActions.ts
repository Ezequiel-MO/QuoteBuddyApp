import { useDispatch } from 'react-redux'
import {
	ADD_INTRO_MEETING,
	EDIT_MODAL_MEETING,
	REMOVE_MEETINGS_BY_HOTEL_FROM_PROJECT
} from '../CurrentProjectSlice'
import { IAddIntro } from '../types'

export const useMeetingActions = () => {
	const dispatch = useDispatch()

	const editModalMeeting = (meetingModal: any) => {
		dispatch(EDIT_MODAL_MEETING(meetingModal))
	}

	const addIntroMeeting = (introMeeting: IAddIntro) => {
		dispatch(ADD_INTRO_MEETING(introMeeting))
	}

	const removeMeetingsByHotel = (hotelId: string) => {
		dispatch(REMOVE_MEETINGS_BY_HOTEL_FROM_PROJECT(hotelId))
	}

	return {
		editModalMeeting,
		addIntroMeeting,
		removeMeetingsByHotel
	}
}
