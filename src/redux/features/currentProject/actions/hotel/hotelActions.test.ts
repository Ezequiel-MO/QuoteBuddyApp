import { IHotel } from '@interfaces/hotel'
import {
	starterHotel,
	starterMeeting,
	starterSchedule
} from 'src/constants/starterObjects'
import store from 'src/redux/store'
import { currentProjectSlice } from '../../CurrentProjectSlice'
import * as thunks from './thunks'

describe('hotelActions thunks', () => {
	const { actions } = currentProjectSlice

	const mockHotel: IHotel = {
		...starterHotel,
		_id: 'mock-hotel-1'
	}

	beforeEach(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		vi.spyOn(console, 'warn').mockImplementation(() => {})
		store.dispatch({ type: actions.CLEAR_PROJECT.type })
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe('addHotelOvernightToScheduleThunk', () => {
		it('should add the hotel to the schedule overnight when dayIndex is valid', async () => {
			store.dispatch(
				thunks.addHotelOvernightToScheduleThunk({
					dayIndex: 0,
					hotel: mockHotel
				})
			)
			const state = store.getState().currentProject
			expect(state.project.schedule[0].overnight.hotels).toContainEqual(
				mockHotel
			)
			expect(console.error).not.toHaveBeenCalled()
		})

		it('should log an error if dayIndex is invalid', () => {
			store.dispatch(
				thunks.addHotelOvernightToScheduleThunk({
					dayIndex: 999,
					hotel: mockHotel
				})
			)

			expect(console.error).toHaveBeenCalledWith('ERROR! Day not found')
		})
	})

	describe('removeHotelFromProjectThunk', () => {
		it('should remove the hotel from the project and any meeting references', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					hotels: [mockHotel],
					schedule: [
						{
							...starterSchedule[0],
							morningMeetings: {
								intro: '',
								meetings: [
									{
										...starterMeeting,
										hotel: [mockHotel._id]
									}
								]
							}
						}
					]
				}
			})

			store.dispatch(thunks.removeHotelFromProjectThunk('mock-hotel-1'))
			const state = store.getState().currentProject
			expect(state.project.hotels).toEqual([])
			expect(
				state.project.schedule[0].morningMeetings?.meetings[0]?.hotel ?? []
			).not.toContain('mock-hotel-1')
		})

		it('should do nothing special if the hotel does not exist', () => {
			store.dispatch(thunks.removeHotelFromProjectThunk('non-existent-hotel'))
			expect(console.error).not.toHaveBeenCalled()
			const state = store.getState().currentProject
			expect(state.project.hotels).toEqual([])
		})
	})

	describe('updateHotelPriceThunk', () => {
		it('should update the hotel price if found, and recalc budget if it is selectedHotel', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					hotels: [mockHotel]
				}
			})

			store.dispatch({
				type: actions.SET_BUDGET.type,
				payload: {
					...store.getState().currentProject.budget,
					selectedHotel: {
						...mockHotel
					}
				},
				meta: { reason: 'init budget' }
			})

			const initialCost =
				store.getState().currentProject.budget.selectedHotelCost

			expect(initialCost).toBe(0)

			store.dispatch(
				thunks.updateHotelPriceThunk({
					idHotel: 'mock-hotel-1',
					keyHotelPrice: 'DUIprice',
					value: 200
				})
			)

			const state = store.getState().currentProject
			const updatedHotel = state.project.hotels.find(
				(h) => h._id === 'mock-hotel-1'
			)
			expect(updatedHotel?.price?.[0].DUIprice).toBe(200)
			expect(state.budget.selectedHotelCost).toBe(90000)
			expect(console.warn).not.toHaveBeenCalled()
		})

		it('should warn if hotel not found or price is missing', () => {
			store.dispatch(
				thunks.updateHotelPriceThunk({
					idHotel: 'non-existent-hotel',
					keyHotelPrice: 'DUIprice',
					value: 999
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'Hotel with id non-existent-hotel not found or price not available.'
			)
		})
	})

	describe('updateOvernightHotelPriceThunk', () => {
		it('should update the overnight hotel price if valid dayIndex/hotel', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							...starterSchedule[0],
							overnight: {
								...starterSchedule[0].overnight,
								hotels: [mockHotel]
							}
						}
					]
				}
			})

			store.dispatch(
				thunks.updateOvernightHotelPriceThunk({
					dayIndex: 0,
					id: 'mock-hotel-1',
					key: 'DUIprice',
					value: 250
				})
			)

			const state = store.getState().currentProject
			const overnightHotel = state.project.schedule[0].overnight.hotels.find(
				(h) => h._id === 'mock-hotel-1'
			)
			expect(overnightHotel?.price?.[0].DUIprice).toBe(250)
			expect(console.warn).not.toHaveBeenCalled()
		})

		it('should warn if hotel is not found at given dayIndex', () => {
			store.dispatch(
				thunks.updateOvernightHotelPriceThunk({
					dayIndex: 0,
					id: 'non-existent-hotel',
					key: 'DUIprice',
					value: 300
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'Hotel with id non-existent-hotel not found on dayIndex 0'
			)
		})

		it('should warn if price array is missing or empty', () => {
			const noPriceHotel: IHotel = { ...mockHotel, price: [] }
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					schedule: [
						{
							...starterSchedule[0],
							overnight: {
								hotels: [noPriceHotel],
								intro: ''
							}
						}
					]
				}
			})
			store.dispatch(
				thunks.updateOvernightHotelPriceThunk({
					dayIndex: 0,
					id: 'mock-hotel-1',
					key: 'DUIprice',
					value: 300
				})
			)
			expect(console.warn).toHaveBeenCalledWith(
				'Price array is missing or empty for hotel id mock-hotel-1 on dayIndex 0'
			)
		})
	})

	describe('editModalHotelThunk', () => {
		it('should edit hotel if it exists', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					hotels: [mockHotel]
				}
			})

			store.dispatch(
				thunks.editModalHotelThunk({
					id: 'mock-hotel-1',
					textContentEdit: 'New Text Content',
					pricesEdit: {
						DUInr: 99,
						DUIprice: 99,
						DoubleRoomNr: 99,
						DoubleRoomPrice: 99
					}
				})
			)

			const state = store.getState().currentProject
			const edited = state.project.hotels.find((h) => h._id === 'mock-hotel-1')
			expect(edited?.textContent).toBe('New Text Content')
			expect(edited?.price?.[0].DUInr).toBe(99)
			expect(console.error).not.toHaveBeenCalled()
		})

		it('should log an error if the hotel is not found', () => {
			store.dispatch(
				thunks.editModalHotelThunk({
					id: 'non-existent',
					textContentEdit: 'Not Found Hotel'
				})
			)
			expect(console.error).toHaveBeenCalledWith('ERROR! Hotel not found')
		})
	})

	describe('editOvernightHotelModalThunk', () => {
		it('should log an error if dayIndex or id is undefined', () => {
			store.dispatch(
				thunks.editOvernightHotelModalThunk({
					id: undefined
				} as any)
			)
			expect(console.error).toHaveBeenCalledWith(
				'ERROR! dayIndex or id is undefined'
			)
		})
	})
})
