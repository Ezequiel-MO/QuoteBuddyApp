import { AppThunk } from 'src/redux/store'
import { UPDATE_PROJECT_SCHEDULE } from '../CurrentProjectSlice'
import { IEditModalMeeting, UpdateMeetingPayload } from '../types'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { IDay } from '@interfaces/project'
import { IMeeting } from '@interfaces/meeting'

export const useMeetingActions = () => {
	const dispatch = useAppDispatch()

	const updateMeeting = (payload: UpdateMeetingPayload) => {
		dispatch(updateMeetingThunk(payload))
	}

	const editModalMeeting = (meetingModal: IEditModalMeeting) => {
		dispatch(editModalMeetingThunk(meetingModal))
	}

	const removeMeetingsByHotel = (hotelId: string) => {
		dispatch(removeMeetingsByHotelFromProjectThunk(hotelId))
	}

	return {
		updateMeeting,
		editModalMeeting,
		removeMeetingsByHotel
	}
}

const updateMeetingThunk =
	(payload: UpdateMeetingPayload): AppThunk =>
	(dispatch, getState) => {
		const { dayIndex, typeMeeting, idMeeting, keyMeeting, value } = payload
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Validate dayIndex
		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			console.error('Invalid day index')
			return
		}

		const validEventTypes = [
			'morningMeetings',
			'afternoonMeetings',
			'fullDayMeetings'
		]

		// Validate typeMeeting
		if (!validEventTypes.includes(typeMeeting)) {
			console.error('Invalid type of meeting')
			return
		}

		// Create a new schedule array using .map
		const updatedSchedule: IDay[] = currentSchedule.map((day, index) => {
			if (index === dayIndex) {
				// Create a new day object
				const updatedDay = {
					...day,
					[typeMeeting]: {
						...day[typeMeeting],
						// Create a new meetings array
						meetings: day[typeMeeting].meetings.map((meeting: IMeeting) => {
							if (meeting._id === idMeeting) {
								// Update the specific meeting property
								return {
									...meeting,
									[keyMeeting]: value
								}
							}
							return meeting
						})
					}
				}
				return updatedDay
			}
			return day
		})

		// Dispatch the action to update the schedule
		dispatch(UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Update Meeting'))
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

		dispatch(UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Edit Meeting Modal'))
	}

const removeMeetingsByHotelFromProjectThunk =
	(hotelId: string): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = JSON.parse(JSON.stringify(state.currentProject.project.schedule))
		const timesMeeting = [
			'morningMeetings',
			'afternoonMeetings',
			'fullDayMeetings'
		] as const
			for (let i = 0; i < currentSchedule.length; i++) {
				for (let j = 0; j < timesMeeting.length; j++) {
					currentSchedule[i][timesMeeting[j]].meetings = 
					    currentSchedule[i][timesMeeting[j]].meetings.filter((el) => el.hotel[0] !== hotelId);
				}
			}
		dispatch(
			UPDATE_PROJECT_SCHEDULE(currentSchedule, 'Remove Meetings By Hotel')
		)
	}
