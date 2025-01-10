import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import store from 'src/redux/store'
import { currentProjectSlice } from '../../CurrentProjectSlice'
import { IDay } from '@interfaces/project'
import { ITransfer } from '@interfaces/transfer'
import { starterSchedule, starterTransfer } from 'src/constants/starterObjects'
import * as thunks from './thunks'

describe('transferActions thunks', () => {
	const { actions } = currentProjectSlice

	// Reset store and mock console each test
	beforeEach(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		vi.spyOn(console, 'warn').mockImplementation(() => {})
		store.dispatch({ type: actions.CLEAR_PROJECT.type })
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	// Minimal schedule reference
	const mockSchedule: IDay[] = starterSchedule

	// Use your starterTransfer as the base
	const mockTransfer: ITransfer = {
		...starterTransfer,
		_id: 'mock-trans-id' // we can override if needed
	}

	// ─────────────────────────────────────────────────────────
	// 1) addItineraryTransferToScheduleThunk
	// ─────────────────────────────────────────────────────────
	describe('addItineraryTransferToScheduleThunk', () => {
		it('should add the itinerary transfers if dayIndex is valid', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: mockSchedule
				}
			})

			store.dispatch(
				thunks.addItineraryTransferToScheduleThunk({
					dayIndex: 0,
					starts: 'morning',
					ends: 'night',
					transfers: [mockTransfer]
				})
			)

			const finalSchedule = store.getState().currentProject.project.schedule
			expect(finalSchedule[0].itinerary.itinerary.length).toBe(1)
			expect(finalSchedule[0].itinerary.itinerary[0]._id).toBe('mock-trans-id')
			expect(finalSchedule[0].itinerary.starts).toBe('morning')
			expect(finalSchedule[0].itinerary.ends).toBe('night')
		})

		it('should log an error if dayIndex is invalid', () => {
			store.dispatch(
				thunks.addItineraryTransferToScheduleThunk({
					dayIndex: 999,
					starts: 'morning',
					ends: 'night',
					transfers: [mockTransfer]
				})
			)
			expect(console.error).toHaveBeenCalledWith('Invalid dayIndex:', 999)
		})
	})

	// ─────────────────────────────────────────────────────────
	// 2) addTransferToScheduleThunk
	// ─────────────────────────────────────────────────────────
	describe('addTransferToScheduleThunk', () => {
		it('should add transfer_in to the first day if timeOfEvent=transfer_in', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: mockSchedule
				}
			})

			store.dispatch(
				thunks.addTransferToScheduleThunk({
					timeOfEvent: 'transfer_in',
					transfers: [{ ...mockTransfer, _id: 'trans-in' }]
				})
			)

			const final = store.getState().currentProject.project.schedule
			expect(final[0].transfer_in.length).toBe(1)
			expect(final[0].transfer_in[0]._id).toBe('trans-in')
		})

		it('should add transfer_out to the last day if timeOfEvent=transfer_out', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: mockSchedule
				}
			})

			store.dispatch(
				thunks.addTransferToScheduleThunk({
					timeOfEvent: 'transfer_out',
					transfers: [{ ...mockTransfer, _id: 'trans-out' }]
				})
			)

			const final = store.getState().currentProject.project.schedule
			const lastDayIndex = final.length - 1
			expect(final[lastDayIndex].transfer_out.length).toBe(1)
			expect(final[lastDayIndex].transfer_out[0]._id).toBe('trans-out')
		})

		it('should log an error if timeOfEvent is invalid', () => {
			store.dispatch(
				thunks.addTransferToScheduleThunk({
					timeOfEvent: 'invalidEvent' as any,
					transfers: [mockTransfer]
				})
			)
			expect(console.error).toHaveBeenCalledWith(
				'Invalid timeOfEvent:',
				'invalidEvent'
			)
		})
	})

	// ─────────────────────────────────────────────────────────
	// 3) updateMeetGreetTransferInThunk
	// ─────────────────────────────────────────────────────────
	describe('updateMeetGreetTransferInThunk', () => {
		it('should update all transfersIn with the given key/unit', () => {
			// day 0 => transfer_in => [ mockTransfer with meetGreet=2 ]
			const scheduleWithTransfers = [
				{
					...mockSchedule[0],
					transfer_in: [{ ...mockTransfer, _id: 'tIn' }]
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithTransfers
				}
			})

			// Suppose we set 'meetGreet=5'
			store.dispatch(
				thunks.updateMeetGreetTransferInThunk({
					unit: 5,
					key: 'meetGreet'
				})
			)

			const final = store.getState().currentProject.project.schedule
			expect(final[0].transfer_in[0].meetGreet).toBe(5)
		})
	})

	// ─────────────────────────────────────────────────────────
	// 4) updateMeetGreetTransferOutThunk
	// ─────────────────────────────────────────────────────────
	describe('updateMeetGreetTransferOutThunk', () => {
		it('should update all transfersOut in the last day', () => {
			// last day => transfer_out => [ mockTransfer with meetGreet=2 ]
			const scheduleWithTransfers = [
				{
					...mockSchedule[0]
				},
				{
					...mockSchedule[1],
					transfer_out: [{ ...mockTransfer, _id: 'tOut' }]
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithTransfers
				}
			})

			store.dispatch(
				thunks.updateMeetGreetTransferOutThunk({
					value: 10,
					key: 'meetGreet'
				})
			)

			const final = store.getState().currentProject.project.schedule
			const lastIndex = final.length - 1
			expect(final[lastIndex].transfer_out[0].meetGreet).toBe(10)
		})
	})

	// ─────────────────────────────────────────────────────────
	// 5) updateAssistanceTransferInThunk
	// ─────────────────────────────────────────────────────────
	describe('updateAssistanceTransferInThunk', () => {
		it('should update assistance or any key in day 0 => transfer_in', () => {
			const scheduleWithTransfers = [
				{
					...mockSchedule[0],
					transfer_in: [{ ...mockTransfer, _id: 'in-1', assistance: 2 }]
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithTransfers
				}
			})

			store.dispatch(
				thunks.updateAssistanceTransferInThunk({
					value: 5,
					key: 'assistance'
				})
			)

			const final = store.getState().currentProject.project.schedule
			expect(final[0].transfer_in[0].assistance).toBe(5)
		})
	})

	// ─────────────────────────────────────────────────────────
	// 6) updateAssistanceTransferOutThunk
	// ─────────────────────────────────────────────────────────
	describe('updateAssistanceTransferOutThunk', () => {
		it('should update assistance for the last day => transfer_out', () => {
			const scheduleWithTransfers = [
				{
					...mockSchedule[0]
				},
				{
					...mockSchedule[1],
					transfer_out: [{ ...mockTransfer, _id: 'out-1', assistance: 2 }]
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithTransfers
				}
			})

			store.dispatch(
				thunks.updateAssistanceTransferOutThunk({
					value: 10,
					key: 'assistance'
				})
			)

			const final = store.getState().currentProject.project.schedule
			const lastIndex = final.length - 1
			expect(final[lastIndex].transfer_out[0].assistance).toBe(10)
		})
	})

	// ─────────────────────────────────────────────────────────
	// 7) updateAssistanceTransferActivityRestaurantThunk
	// ─────────────────────────────────────────────────────────
	describe('updateAssistanceTransferActivityRestaurantThunk', () => {
		it('should update transfer in a restaurant for dayIndex', () => {
			// day 0 => lunch => restaurants => [ { _id:'rest1', transfer:[ { _id:'tranX' } ] } ]
			const scheduleWithLunch = [
				{
					...mockSchedule[0],
					lunch: {
						intro: '',
						included: true,
						restaurants: [
							{
								_id: 'rest1',
								name: 'Mock Restaurant',
								city: 'AnyCity',
								address: '',
								numberStars: 0,
								numberRooms: 0,
								checkin_out: '',
								meetingRooms: '',
								wheelChairAccessible: false,
								wifiSpeed: '',
								swimmingPool: '',
								restaurants: '',
								textContent: '',
								imageContentUrl: [],
								meetingImageContentUrl: [],
								meetingDetails: {
									capacity: 0,
									naturalLight: false,
									size: 0,
									visibility: '',
									generalComments: ''
								},
								location: {
									type: 'Point',
									coordinates: [0, 0]
								},
								introduction: [],
								price: 100,
								deletedImage: [],
								availableLanguages: [],
								descriptions: [],
								isVenue: false,
								entertainment: [],
								venue_price: {},
								transfer: [{ ...mockTransfer, _id: 'tranX', assistance: 2 }]
							}
						]
					}
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithLunch
				}
			})

			store.dispatch(
				thunks.updateAssistanceTransferActivityRestaurantThunk({
					value: 5,
					dayIndex: 0,
					typeEvent: 'lunch',
					key: 'assistance',
					id: 'rest1'
				})
			)

			const final = store.getState().currentProject.project.schedule
			const updatedTrans =
				final[0].lunch.restaurants[0].transfer?.[0].assistance
			expect(updatedTrans).toBe(5)
		})
	})

	// ─────────────────────────────────────────────────────────
	// 8) updateTransfersInThunk
	// ─────────────────────────────────────────────────────────
	describe('updateTransfersInThunk', () => {
		it('should update the price if typeUpdate=priceTransfer', () => {
			// day 0 => transfer_in => [ { _id:'tin1', transfer_in=100 } ]
			const scheduleWithTransfers = [
				{
					...mockSchedule[0],
					transfer_in: [{ ...mockTransfer, _id: 'tin1', transfer_in: 100 }]
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithTransfers
				}
			})

			// from 100 => 200
			store.dispatch(
				thunks.updateTransfersInThunk({
					value: 200,
					typeUpdate: 'priceTransfer',
					id: 'tin1'
				})
			)

			const final = store.getState().currentProject.project.schedule
			expect(final[0].transfer_in[0].transfer_in).toBe(200)
		})

		it('should replicate the transfer if typeUpdate=transfer', () => {
			// if user wants multiple same transfers
			const scheduleWithTransfers = [
				{
					...mockSchedule[0],
					transfer_in: [{ ...mockTransfer, _id: 'tinX' }]
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithTransfers
				}
			})

			store.dispatch(
				thunks.updateTransfersInThunk({
					value: 3,
					typeUpdate: 'transfer',
					id: 'tinX'
				})
			)

			const final = store.getState().currentProject.project.schedule
			expect(final[0].transfer_in.length).toBe(3)
			expect(final[0].transfer_in[0]._id).toBe('tinX')
			expect(final[0].transfer_in[1]._id).toBe('tinX')
			expect(final[0].transfer_in[2]._id).toBe('tinX')
		})
	})

	// ─────────────────────────────────────────────────────────
	// 9) updateTransfersOutThunk
	// ─────────────────────────────────────────────────────────
	describe('updateTransfersOutThunk', () => {
		it('should update the price if typeUpdate=priceTransfer (transfer_out)', () => {
			const scheduleWithTransfers = [
				{
					...mockSchedule[0]
				},
				{
					...mockSchedule[1],
					transfer_out: [{ ...mockTransfer, _id: 'tout1', transfer_out: 120 }]
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithTransfers
				}
			})

			// from 120 => 300
			store.dispatch(
				thunks.updateTransfersOutThunk({
					value: 300,
					typeUpdate: 'priceTransfer',
					id: 'tout1'
				})
			)

			const final = store.getState().currentProject.project.schedule
			const lastIndex = final.length - 1
			expect(final[lastIndex].transfer_out[0].transfer_out).toBe(300)
		})

		it('should replicate the transfer if typeUpdate=transfer (transfer_out)', () => {
			const scheduleWithTransfers = [
				{
					...mockSchedule[0]
				},
				{
					...mockSchedule[1],
					transfer_out: [{ ...mockTransfer, _id: 'toutX' }]
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithTransfers
				}
			})

			store.dispatch(
				thunks.updateTransfersOutThunk({
					value: 2,
					typeUpdate: 'transfer',
					id: 'toutX'
				})
			)

			const final = store.getState().currentProject.project.schedule
			const lastIndex = final.length - 1
			expect(final[lastIndex].transfer_out.length).toBe(2)
			expect(final[lastIndex].transfer_out[0]._id).toBe('toutX')
			expect(final[lastIndex].transfer_out[1]._id).toBe('toutX')
		})
	})

	// ─────────────────────────────────────────────────────────
	// 10) editTransferEventOrRestaurantThunk
	// ─────────────────────────────────────────────────────────
	describe('editTransferEventOrRestaurantThunk', () => {
		it('should edit the transfer array for a specific event or restaurant', () => {
			// day 0 => morningEvents => events => [ { _id:'event-1', transfer:[...] } ]
			const scheduleWithEvents = [
				{
					...mockSchedule[0],
					morningEvents: {
						intro: '',
						events: [
							{
								_id: 'event-1',
								name: 'Mock Event',
								price: 100,
								pricePerPerson: false,
								textContent: '',
								imageContentUrl: [],
								transfer: [{ ...mockTransfer, _id: 'oldTrans' }]
							}
						]
					}
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithEvents
				}
			})

			store.dispatch(
				thunks.editTransferEventOrRestaurantThunk({
					typeEvent: 'morningEvents',
					dayIndex: 0,
					idEvent: 'event-1',
					transferEdit: [{ ...mockTransfer, _id: 'newTrans' }]
				})
			)

			const final = store.getState().currentProject.project.schedule
			const updatedTransfers = final[0].morningEvents.events[0].transfer
			expect(updatedTransfers?.length).toBe(1)
			expect(updatedTransfers?.[0]._id).toBe('newTrans')
		})

		it('should throw if dayIndex is out of range', () => {
			expect(() => {
				store.dispatch(
					thunks.editTransferEventOrRestaurantThunk({
						typeEvent: 'morningEvents',
						dayIndex: 999,
						idEvent: 'any',
						transferEdit: []
					})
				)
			}).toThrow('Invalid dayIndex: 999')
		})

		it('should throw if typeEvent is invalid', () => {
			expect(() => {
				store.dispatch(
					thunks.editTransferEventOrRestaurantThunk({
						// @ts-expect-error intentionally invalid
						typeEvent: 'unknownEvent',
						dayIndex: 0,
						idEvent: 'some-event',
						transferEdit: []
					})
				)
			}).toThrow('Invalid typeEvent: unknownEvent')
		})
	})

	// ─────────────────────────────────────────────────────────
	// 11) updateTransferActivityThunk
	// ─────────────────────────────────────────────────────────
	describe('updateTransferActivityThunk', () => {
		it('should replicate a specific transfer if typeUpdate=transfer', () => {
			// dayIndex=0 => morningEvents => events => [ { _id:'act1', transfer:[ { _id:'tranAct' } ] } ]
			const scheduleWithActivities = [
				{
					...mockSchedule[0],
					morningEvents: {
						intro: '',
						events: [
							{
								_id: 'act1',
								name: 'Morning Activity',
								transfer: [{ ...mockTransfer, _id: 'tranAct' }]
							}
						]
					}
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithActivities
				}
			})

			// replicate that single transfer 3 times
			store.dispatch(
				thunks.updateTransferActivityThunk({
					value: 4,
					dayIndex: 0,
					typeEvent: 'morningEvents',
					idActivity: 'act1',
					typeUpdate: 'transfer',
					idTransfer: 'tranAct',
					serviceKey: 'dispo_4h'
				})
			)

			const final = store.getState().currentProject.project.schedule
			const finalTransfers = final[0].morningEvents.events[0].transfer
			expect(finalTransfers?.length).toBe(4)
			expect(finalTransfers?.[0]._id).toBe('tranAct')
			expect(finalTransfers?.[1]._id).toBe('tranAct')
			expect(finalTransfers?.[2]._id).toBe('tranAct')
			expect(finalTransfers?.[3]._id).toBe('tranAct')
		})
	})

	// ─────────────────────────────────────────────────────────
	// 12) removeTransferFromScheduleThunk
	// ─────────────────────────────────────────────────────────
	describe('removeTransferFromScheduleThunk', () => {
		it('should remove a transfer_in from the first day by ID', () => {
			const scheduleWithTransfers = [
				{
					...mockSchedule[0],
					transfer_in: [
						{ ...mockTransfer, _id: 'removeMe' },
						{ ...mockTransfer, _id: 'keepMe' }
					]
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithTransfers
				}
			})

			// remove ID='removeMe'
			store.dispatch(
				thunks.removeTransferFromScheduleThunk('transfer_in', 'removeMe')
			)

			const final = store.getState().currentProject.project.schedule
			expect(final[0].transfer_in.length).toBe(1)
			expect(final[0].transfer_in[0]._id).toBe('keepMe')
		})

		it('should remove a transfer_out from the last day', () => {
			const scheduleWithTransfers = [
				{
					...mockSchedule[0]
				},
				{
					...mockSchedule[1],
					transfer_out: [
						{ ...mockTransfer, _id: 'removeOut' },
						{ ...mockTransfer, _id: 'keepOut' }
					]
				}
			]
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: scheduleWithTransfers
				}
			})

			store.dispatch(
				thunks.removeTransferFromScheduleThunk('transfer_out', 'removeOut')
			)

			const final = store.getState().currentProject.project.schedule
			const lastIndex = final.length - 1
			expect(final[lastIndex].transfer_out.length).toBe(1)
			expect(final[lastIndex].transfer_out[0]._id).toBe('keepOut')
		})

		it('should log error if dayIndex is invalid (like if schedule is empty)', () => {
			// If schedule is empty or dayIndex out of range
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: []
				}
			})

			store.dispatch(
				thunks.removeTransferFromScheduleThunk('transfer_in', 'any')
			)
			expect(console.error).toHaveBeenCalledWith('Invalid day index.')
		})
	})
})
