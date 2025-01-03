import { IBudget } from '@interfaces/budget'
import {
	ADD_GIFT_TO_PROJECT,
	ADD_HOTEL_OVERNIGHT_TO_SCHEDULE,
	ADD_HOTEL_TO_PROJECT,
	currentProjectSlice,
	HANDLE_SCHEDULE_DAYS,
	REMOVE_GIFT_FROM_PROJECT,
	REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE,
	SET_BUDGET,
	SET_CURRENT_PROJECT,
	UPDATE_GIFT_COST,
	UPDATE_PROJECT_SCHEDULE
} from '../CurrentProjectSlice'
import { defaultProject } from '../defaultProjectState'
import { defaultBudget } from '../../budget/defaultBudgetState'
import {
	starterGift,
	starterHotel,
	starterSchedule,
	starterTransfer
} from 'src/constants/starterObjects'
import { IDay, IProject } from '@interfaces/project'
import { IGift } from '@interfaces/gift'
import { IHotel } from '@interfaces/hotel'

describe('currentProjectSlice reducer', () => {
	let initialState: ReturnType<typeof currentProjectSlice.getInitialState>

	beforeEach(() => {
		initialState = currentProjectSlice.getInitialState()
	})

	const mockHotel: IHotel = {
		...starterHotel
	}

	describe('Project Actions', () => {
		it('should handle UPDATE_PROJECT_SCHEDULE action with meta', () => {
			const mockSchedule: IDay[] = starterSchedule
			const action = UPDATE_PROJECT_SCHEDULE(mockSchedule, 'Updated schedule')
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project.schedule).toEqual(mockSchedule)
			expect(action.meta.reason).toBe('Updated schedule')
		})

		it('should handle SET_CURRENT_PROJECT action', () => {
			const mockProject: IProject = { ...defaultProject }
			const action = SET_CURRENT_PROJECT(mockProject)
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project).toEqual(mockProject)
		})

		it('should handle ADD_HOTEL_TO_PROJECT action', () => {
			const action = ADD_HOTEL_TO_PROJECT(mockHotel)
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project.hotels).toContain(mockHotel)
		})
	})
	describe('Budget Actions', () => {
		it('should handle SET_BUDGET action', () => {
			const mockBudget: IBudget = { ...defaultBudget }
			const action = SET_BUDGET(mockBudget, 'update budget')
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.budget).toEqual(mockBudget)
		})

		it('should handle UPDATE_GIFT_COST action', () => {
			const newGiftCost = 250
			const action = UPDATE_GIFT_COST(newGiftCost)
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.budget.giftCost).toBe(newGiftCost)
		})
	})

	describe('Gift Actions', () => {
		const mockGift: IGift = {
			...starterGift
		}
		it('should handle ADD_GIFT_TO_PROJECT action', () => {
			const action = ADD_GIFT_TO_PROJECT(mockGift)
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project.gifts).toContain(mockGift)
		})

		it('should handle REMOVE_GIFT_FROM_PROJECT action', () => {
			const stateWithGift = {
				...initialState,
				project: {
					...initialState.project,
					gifts: [mockGift]
				}
			}
			const action = REMOVE_GIFT_FROM_PROJECT({ id: mockGift._id })
			const newState = currentProjectSlice.reducer(stateWithGift, action)
			expect(newState.project.gifts).not.toContain(mockGift)
		})
	})

	describe('Schedule Actions', () => {
		const mockSchedule: IDay[] = starterSchedule
		it('should handle HANDLE_SCHEDULE_DAYS action', () => {
			const action = HANDLE_SCHEDULE_DAYS(mockSchedule)
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project.schedule).toEqual(mockSchedule)
		})

		it('should handle REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE action', () => {
			const mockTransfer = { ...starterTransfer }
			const scheduleWithItineraryTransfer: IDay[] = [
				{
					...mockSchedule[0],
					itinerary: {
						...mockSchedule[0].itinerary,
						itinerary: [mockTransfer]
					}
				},
				mockSchedule[1]
			]
			const stateWithSchedule = {
				...initialState,
				project: {
					...initialState.project,
					schedule: scheduleWithItineraryTransfer
				}
			}
			const action = REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE({
				dayIndex: 0,
				transferId: mockTransfer._id
			})
			const newState = currentProjectSlice.reducer(stateWithSchedule, action)
			expect(newState.project.schedule[0].itinerary.itinerary).not.toContain(
				mockTransfer
			)
		})
		it('should handle ADD_HOTEL_OVERNIGHT_TO_SCHEDULE action', () => {
			const action = ADD_HOTEL_OVERNIGHT_TO_SCHEDULE({
				dayIndex: 0,
				hotel: mockHotel
			})
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project.schedule[0].overnight.hotels).toContain(mockHotel)
		})
	})

	describe('Drag and Drop Actions', () => {
		const mockHotel1 = { ...starterHotel, _id: 'hotel-1' }
		const mockHotel2 = { ...starterHotel, _id: 'hotel-2' }

		it('should handle DRAG_AND_DROP_HOTEL action', () => {
			const stateWithHotels = {
				...initialState,
				project: {
					...initialState.project,
					hotels: [mockHotel1, mockHotel2]
				}
			}
			const action = currentProjectSlice.actions.DRAG_AND_DROP_HOTEL({
				startHotelIndex: 1,
				endHotelIndex: 0
			})
			const newState = currentProjectSlice.reducer(stateWithHotels, action)
			expect(newState.project.hotels).toEqual([mockHotel2, mockHotel1])
		})
	})
})
