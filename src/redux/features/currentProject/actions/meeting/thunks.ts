import { AppThunk } from 'src/redux/store'
import {
	EVENT_TYPES_MEETINGS,
	IEditModalMeeting,
	UpdateMeetingPayload
} from '../../types'
import { IDay } from '@interfaces/project'
import { IMeeting } from '@interfaces/meeting'
import { SET_BUDGET, UPDATE_PROJECT_SCHEDULE } from '../../CurrentProjectSlice'
import { IBudget } from '@interfaces/budget'
import { RemoveMeetingActionPayload } from './meetingActions'
import { getDay, getTimeOfMeetingBudget } from '../../helpers/helpers'

export const updateMeetingThunk =
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

export const editModalMeetingThunk =
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

export const removeMeetingsByHotelFromProjectThunk =
	(hotelId: string): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = JSON.parse(
			JSON.stringify(state.currentProject.project.schedule)
		)
		const timesMeeting = [
			'morningMeetings',
			'afternoonMeetings',
			'fullDayMeetings'
		] as const
		for (let i = 0; i < currentSchedule.length; i++) {
			for (let j = 0; j < timesMeeting.length; j++) {
				currentSchedule[i][timesMeeting[j]].meetings = currentSchedule[i][
					timesMeeting[j]
				].meetings.filter((el) => {
					const firstHotel = el.hotel[0]
					if (!firstHotel) return true
					if (typeof firstHotel === 'object') {
						return firstHotel._id !== hotelId
					}
					return firstHotel !== hotelId
				})
			}
		}
		dispatch(
			UPDATE_PROJECT_SCHEDULE(currentSchedule, 'Remove Meetings By Hotel')
		)
	}

export const removeMeetingFromScheduleThunk =
	(payload: RemoveMeetingActionPayload): AppThunk =>
	(dispatch, getState) => {
		const { dayIndex, timeOfMeeting, meetingId } = payload
		const state = getState()

		// 1) Validate the meeting type
		if (!EVENT_TYPES_MEETINGS.includes(timeOfMeeting)) {
			console.error(`Invalid timeOfMeeting: ${timeOfMeeting}`)
			throw Error(`Ups , Error in deleted a meeting!`)
		}

		// 2) Clone the schedule and remove the meeting from the specified day/time
		const currentSchedule: IDay[] = JSON.parse(
			JSON.stringify(state.currentProject.project.schedule)
		)
		const meetings: IMeeting[] =
			currentSchedule[dayIndex][timeOfMeeting].meetings

		// Check if the meeting exists
		const isMeeting = meetings.some((el) => el._id === meetingId)
		if (!isMeeting) {
			console.error(`Invalid _id , meeting does not exist: ${timeOfMeeting}`)
			throw Error(`Ups , Error in deleted a meeting!`)
		}

		// Filter out the meeting
		const updatedMeetings = meetings.filter((item) => item._id !== meetingId)
		currentSchedule[dayIndex][timeOfMeeting].meetings = updatedMeetings

		// 3) Dispatch updated schedule
		dispatch(UPDATE_PROJECT_SCHEDULE(currentSchedule, 'Remove Meeting by id'))

		// 4) Logic for removing it from the budget if it matches the selected hotel
		const budget: IBudget = JSON.parse(
			JSON.stringify(state.currentProject.budget)
		)
		const day = getDay(dayIndex, currentSchedule.length) // e.g. 'day0'
		const keyMeeting = getTimeOfMeetingBudget(timeOfMeeting) as
			| 'morning'
			| 'afternoon'
			| 'full_day'
			| ''

		// If there's no mapping for this timeOfMeeting, skip
		if (!keyMeeting) {
			return
		}

		// Guard #1: If budget.meetings[day] doesn't exist, skip
		if (!budget.meetings[day]) {
			console.warn(`No budget meetings found for day: ${day}`)
			return
		}

		// Guard #2: If there's no meeting object at that key, skip
		if (!budget.meetings[day][keyMeeting]) {
			return
		}

		// Check if the removed meeting matches the selectedHotel in budget
		if (
			budget.meetings[day][keyMeeting].hotelName === budget.selectedHotel?.name
		) {
			// Remove the meeting from the budget as well
			delete budget.meetings[day][keyMeeting]
			dispatch(
				SET_BUDGET(
					budget,
					'removeMeetingFromScheduleThunk , remove meeting in budget'
				)
			)
		}
	}
