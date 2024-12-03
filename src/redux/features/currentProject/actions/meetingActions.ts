import { AppThunk } from 'src/redux/store'
import {
	ADD_INTRO_MEETING,
	EDIT_MODAL_MEETING,
	REMOVE_MEETINGS_BY_HOTEL_FROM_PROJECT
} from '../CurrentProjectSlice'
import { IAddIntro, IEditModalMeeting } from '../types'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { IDay } from '@interfaces/project'

export const useMeetingActions = () => {
	const dispatch = useAppDispatch()

	const editModalMeeting = (meetingModal: IEditModalMeeting) => {
		dispatch(editModalMeetingThunk(meetingModal))
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

const editModalMeetingThunk =
	(meetingModal: IEditModalMeeting): AppThunk =>
	(dispatch, getState) => {
		const { id, dayIndex, typeOfEvent, data } = meetingModal
		const state = getState()

		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			throw new Error('Invalid day index')
		}

		const dayToUpdate = currentSchedule[dayIndex]

		const validEventTypes = [
			'morningMeetings',
			'afternoonMeetings',
			'fullDayMeetings'
		]

		if (!validEventTypes.includes(typeOfEvent)) {
			throw new Error('Invalid type of event')
		}

		const typeOfEventKey = typeOfEvent as
			| 'morningMeetings'
			| 'afternoonMeetings'
			| 'fullDayMeetings'

		const meetingIndex: number = dayToUpdate[typeOfEventKey].meetings.findIndex(
			(el) => el._id === id
		)

		if (meetingIndex === -1) {
			throw new Error('Meeting not found')
		}

		const updatedMeeting = {
			...dayToUpdate[typeOfEventKey].meetings[meetingIndex],
			...data
		}

		const updatedMeetings = [...dayToUpdate[typeOfEventKey].meetings]
		updatedMeetings[meetingIndex] = updatedMeeting

		const updatedDay: IDay = {
			...dayToUpdate,
			[typeOfEventKey]: {
				...dayToUpdate[typeOfEventKey],
				meetings: updatedMeetings
			}
		}

		const updatedSchedule: IDay[] = currentSchedule.map((day, index) =>
			index === dayIndex ? updatedDay : day
		)

		dispatch(EDIT_MODAL_MEETING(updatedSchedule))
	}
