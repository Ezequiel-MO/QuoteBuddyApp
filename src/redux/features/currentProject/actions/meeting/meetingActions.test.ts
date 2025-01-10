import store from 'src/redux/store'
import { currentProjectSlice } from '../../CurrentProjectSlice'
import { IDay } from '@interfaces/project'
import {
	starterHotel,
	starterMeeting,
	starterSchedule
} from 'src/constants/starterObjects'
import { IMeeting } from '@interfaces/meeting'
import { IHotel } from '@interfaces/hotel'
import * as thunks from './thunks'

describe('meetingActions thunks', () => {
	const { actions } = currentProjectSlice

	const mockSchedule: IDay[] = starterSchedule
	const mockHotel: IHotel = { ...starterHotel }
	const mockMeeting: IMeeting = { ...starterMeeting }

	const mockHotel1: IHotel = {
		...mockHotel,
		_id: 'hotel-1'
	}
	const mockHotel2: IHotel = {
		...mockHotel,
		_id: 'hotel-2'
	}
	const mockHotel3: IHotel = {
		...mockHotel,
		_id: 'hotel-3'
	}
	const mockHotel4: IHotel = {
		...mockHotel,
		_id: 'hotel-4'
	}

	// Some sample meetings referencing those hotels
	const mockMeeting1: IMeeting = {
		...mockMeeting,
		_id: 'meeting-1',
		hotel: [mockHotel1]
	}
	const mockMeeting2: IMeeting = {
		...mockMeeting,
		_id: 'meeting-2',
		hotel: [mockHotel2]
	}
	const mockMeeting3: IMeeting = {
		...mockMeeting,
		_id: 'meeting-3',
		hotel: [mockHotel3]
	}
	const mockMeeting4: IMeeting = {
		...mockMeeting,
		_id: 'meeting-4',
		hotel: [mockHotel4]
	}

	beforeEach(() => {
		// Spy on console errors/warns so we can detect invalid usage
		vi.spyOn(console, 'error').mockImplementation(() => {})
		vi.spyOn(console, 'warn').mockImplementation(() => {})

		// Reset store to a blank project
		store.dispatch({ type: actions.CLEAR_PROJECT.type })
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	// ─────────────────────────────────────────────────────────
	// 1) updateMeetingThunk
	// ─────────────────────────────────────────────────────────
	describe('updateMeetingThunk', () => {
		it('should update a meeting field if dayIndex and meeting ID are valid', () => {
			// We'll use day 0 => morningMeetings => first item => _id= 'meeting-1'
			// (starterSchedule already has a meeting with _id='meeting-1')
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: mockSchedule
				}
			})

			store.dispatch(
				thunks.updateMeetingThunk({
					dayIndex: 0,
					typeMeeting: 'morningMeetings',
					idMeeting: 'meeting-1',
					keyMeeting: 'HDRate',
					value: 500
				})
			)

			const state = store.getState().currentProject
			expect(state.project.schedule[0].morningMeetings.meetings[0].HDRate).toBe(
				500
			)
			expect(console.error).not.toHaveBeenCalled()
		})

		it('should log an error if dayIndex is out of range', () => {
			store.dispatch(
				thunks.updateMeetingThunk({
					dayIndex: 999,
					typeMeeting: 'morningMeetings',
					idMeeting: 'meeting-1',
					keyMeeting: 'HDRate',
					value: 300
				})
			)
			expect(console.error).toHaveBeenCalledWith('Invalid day index')
		})

		it('should log an error if typeMeeting is invalid', () => {
			store.dispatch(
				thunks.updateMeetingThunk({
					dayIndex: 0,
					typeMeeting: 'invalidType' as any,
					idMeeting: 'meeting-1',
					keyMeeting: 'HDRate',
					value: 300
				})
			)
			expect(console.error).toHaveBeenCalledWith('Invalid type of meeting')
		})
	})

	// ─────────────────────────────────────────────────────────
	// 2) editModalMeetingThunk
	// ─────────────────────────────────────────────────────────
	describe('editModalMeetingThunk', () => {
		it('should update an existing meeting with new data', () => {
			// Insert the schedule so day 0 => morningMeetings => has 'meeting-1'
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: mockSchedule
				}
			})

			store.dispatch(
				thunks.editModalMeetingThunk({
					id: 'meeting-1',
					dayIndex: 0,
					typeOfEvent: 'morningMeetings',
					data: {
						HDRate: 250,
						coffeeBreakUnits: 5
					}
				})
			)

			const { schedule } = store.getState().currentProject.project
			const updatedMeeting = schedule[0].morningMeetings.meetings[0]
			expect(updatedMeeting.HDRate).toBe(250)
			expect(updatedMeeting.coffeeBreakUnits).toBe(5)
		})

		it('should throw an error if dayIndex is out of range', () => {
			expect(() => {
				store.dispatch(
					thunks.editModalMeetingThunk({
						id: 'any',
						dayIndex: 999,
						typeOfEvent: 'morningMeetings',
						data: {}
					})
				)
			}).toThrow('Invalid day index')
		})

		it('should throw an error if typeOfEvent is invalid', () => {
			expect(() => {
				store.dispatch(
					thunks.editModalMeetingThunk({
						id: 'meeting-1',
						dayIndex: 0,
						typeOfEvent: 'invalidType' as any,
						data: { FDRate: 999 }
					})
				)
			}).toThrow('Invalid type of event')
		})

		it('should throw an error if meeting is not found', () => {
			// day 0 => morningMeetings => no actual meetings
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							...mockSchedule[0],
							morningMeetings: {
								intro: '',
								meetings: []
							}
						}
					]
				}
			})

			expect(() => {
				store.dispatch(
					thunks.editModalMeetingThunk({
						id: 'meeting-1',
						dayIndex: 0,
						typeOfEvent: 'morningMeetings',
						data: {}
					})
				)
			}).toThrow('Meeting not found')
		})
	})

	// ─────────────────────────────────────────────────────────
	// 3) removeMeetingsByHotelFromProjectThunk
	// ─────────────────────────────────────────────────────────
	describe('removeMeetingsByHotelFromProjectThunk', () => {
		it('should remove all meetings with a given hotel ID across all days and types', () => {
			// day 0 => morningMeetings => [ 'meeting-1'(hotel-1), 'meeting-2'(hotel-2) ]
			// day 0 => afternoonMeetings => [ 'meeting-3'(hotel-3) ]
			// day 1 => fullDayMeetings => [ 'meeting-1'(hotel-1 again?), 'meeting-4'(hotel-4) ]
			const updatedSchedule = [
				{
					...mockSchedule[0],
					morningMeetings: {
						intro: '',
						meetings: [mockMeeting1, mockMeeting2]
					},
					afternoonMeetings: {
						intro: '',
						meetings: [mockMeeting3]
					}
				},
				{
					...mockSchedule[1],
					fullDayMeetings: {
						intro: '',
						meetings: [mockMeeting1, mockMeeting4]
					}
				}
			]

			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: updatedSchedule
				}
			})

			// Remove by 'hotel-1'
			store.dispatch(thunks.removeMeetingsByHotelFromProjectThunk('hotel-1'))

			const finalSchedule = store.getState().currentProject.project.schedule

			// day 0 => morningMeetings => only 'meeting-2'(hotel-2) remains
			expect(finalSchedule[0].morningMeetings.meetings.length).toBe(1)
			expect(finalSchedule[0].morningMeetings.meetings[0]._id).toBe('meeting-2')

			// day 0 => afternoon => 'meeting-3'(hotel-3) remains untouched
			expect(finalSchedule[0].afternoonMeetings.meetings.length).toBe(1)
			expect(finalSchedule[0].afternoonMeetings.meetings[0]._id).toBe(
				'meeting-3'
			)

			// day 1 => fullDayMeetings => only 'meeting-4'(hotel-4) remains
			expect(finalSchedule[1].fullDayMeetings.meetings.length).toBe(1)
			expect(finalSchedule[1].fullDayMeetings.meetings[0]._id).toBe('meeting-4')
		})
	})

	// ─────────────────────────────────────────────────────────
	// 4) removeMeetingFromScheduleThunk
	// ─────────────────────────────────────────────────────────
	describe('removeMeetingFromScheduleThunk', () => {
		it('should remove a specific meeting by ID from the given day/timeOfMeeting', () => {
			// day 0 => morningMeetings => [ 'meeting-1'(hotel-1), 'meeting-2'(hotel-2) ]
			const scheduleWithMeetings = [
				{
					...mockSchedule[0],
					morningMeetings: {
						intro: '',
						meetings: [mockMeeting1, mockMeeting2]
					}
				}
			]

			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithMeetings
				}
			})

			// Remove 'meeting-2'
			store.dispatch(
				thunks.removeMeetingFromScheduleThunk({
					dayIndex: 0,
					timeOfMeeting: 'morningMeetings',
					meetingId: 'meeting-2'
				})
			)

			const finalSchedule = store.getState().currentProject.project.schedule
			const leftover = finalSchedule[0].morningMeetings.meetings

			expect(leftover.length).toBe(1)
			expect(leftover[0]._id).toBe('meeting-1')
		})

		it('should throw error if timeOfMeeting is invalid', () => {
			expect(() => {
				store.dispatch(
					thunks.removeMeetingFromScheduleThunk({
						dayIndex: 0,
						timeOfMeeting: 'invalidType' as any,
						meetingId: 'someId'
					})
				)
			}).toThrow('Ups , Error in deleted a meeting!')

			expect(console.error).toHaveBeenCalledWith(
				'Invalid timeOfMeeting: invalidType'
			)
		})

		it('should throw error if the meeting does not exist in that day/time', () => {
			const scheduleWithMeetings = [
				{
					...mockSchedule[0],
					morningMeetings: {
						intro: '',
						meetings: [{ ...mockMeeting1, _id: 'meeting-1' }]
					}
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithMeetings
				}
			})

			expect(() => {
				store.dispatch(
					thunks.removeMeetingFromScheduleThunk({
						dayIndex: 0,
						timeOfMeeting: 'morningMeetings',
						meetingId: 'not-found'
					})
				)
			}).toThrow('Ups , Error in deleted a meeting!')

			expect(console.error).toHaveBeenCalledWith(
				'Invalid _id , meeting does not exist: morningMeetings'
			)
		})
	})
})
