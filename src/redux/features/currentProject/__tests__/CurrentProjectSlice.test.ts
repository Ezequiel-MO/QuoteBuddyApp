import { IBudget } from '@interfaces/budget'
import {
	ADD_GIFT_TO_PROJECT,
	ADD_HOTEL_OVERNIGHT_TO_SCHEDULE,
	ADD_HOTEL_TO_PROJECT,
	CLEAR_MEETINGS_BUDGET,
	CLEAR_PROJECT,
	currentProjectSlice,
	EDIT_GIFT,
	EDIT_MODAL_HOTEL,
	EDIT_MODAL_HOTEL_OVERNIGHT,
	HANDLE_PROJECT_INPUT_CHANGE,
	HANDLE_SCHEDULE_DAYS,
	REMOVE_GIFT_FROM_PROJECT,
	REMOVE_HOTEL_FROM_PROJECT,
	REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE,
	SET_BUDGET,
	SET_CURRENT_PROJECT,
	UPDATE_GIFT,
	UPDATE_GIFT_COST,
	UPDATE_MEETINGS_TOTAT_COST,
	UPDATE_PROJECT_SCHEDULE
} from '../CurrentProjectSlice'
import { defaultProject } from '../defaultProjectState'
import { defaultBudget } from '../../budget/defaultBudgetState'
import {
	starterGift,
	starterHotel,
	starterMeeting,
	starterSchedule,
	starterTransfer
} from 'src/constants/starterObjects'
import { IDay, IProject } from '@interfaces/project'
import { IGift } from '@interfaces/gift'
import { IHotel } from '@interfaces/hotel'
import { IMeeting } from '@interfaces/meeting'
import { ITransfer } from '@interfaces/transfer'

describe('currentProjectSlice reducer', () => {
	let initialState: ReturnType<typeof currentProjectSlice.getInitialState>

	beforeEach(() => {
		initialState = currentProjectSlice.getInitialState()
	})

	const mockHotel: IHotel = {
		...starterHotel
	}

	const mockMeeting: IMeeting = {
		...starterMeeting
	}

	const mockGift: IGift = { ...starterGift }
	const mockTransfer: ITransfer = { ...starterTransfer }
	const mockProject: IProject = { ...defaultProject }
	const mockSchedule: IDay[] = starterSchedule
	const mockBudget: IBudget = { ...defaultBudget }

	describe('Project Actions', () => {
		it('should handle UPDATE_PROJECT_SCHEDULE action with meta', () => {
			const action = UPDATE_PROJECT_SCHEDULE(mockSchedule, 'Updated schedule')
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project.schedule).toEqual(mockSchedule)
			expect(action.meta.reason).toBe('Updated schedule')
		})

		it('should handle SET_CURRENT_PROJECT action', () => {
			const action = SET_CURRENT_PROJECT(mockProject)
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project).toEqual(mockProject)
		})

		it('should handle ADD_HOTEL_TO_PROJECT action', () => {
			const action = ADD_HOTEL_TO_PROJECT(mockHotel)
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project.hotels).toContain(mockHotel)
		})

		it('should handle REMOVE_HOTEL_FROM_PROJECT action', () => {
			const stateWithHotel = {
				...initialState,
				project: {
					...initialState.project,
					hotels: [mockHotel],
					schedule: [
						{
							...mockSchedule[0],
							overnight: {
								...mockSchedule[0].overnight,
								hotels: [mockHotel]
							}
						},
						mockSchedule[1]
					]
				}
			}
			const action = REMOVE_HOTEL_FROM_PROJECT({
				hotelId: mockHotel._id as string,
				updatedSchedule: stateWithHotel.project.schedule
			})

			const newState = currentProjectSlice.reducer(stateWithHotel, action)
			expect(newState.project.hotels).not.toContain(mockHotel)
		})

		it('should handle CLEAR_PROJECT action', () => {
			const stateWithCustomProject = {
				...initialState,
				project: { ...defaultProject, name: 'Custom Project' }
			}
			const action = CLEAR_PROJECT()
			const newState = currentProjectSlice.reducer(
				stateWithCustomProject,
				action
			)
			expect(newState.project).toEqual(defaultProject)
		})
	})
	describe('Budget Actions', () => {
		it('should handle SET_BUDGET action', () => {
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

		it('should handle UPDATE_MEETINGS_TOTAL_COST action', () => {
			const newCost = 300
			const action = UPDATE_MEETINGS_TOTAT_COST(newCost)
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.budget.meetingsCost).toBe(newCost)
		})

		it('should handle CLEAR_MEETINGS_BUDGET action', () => {
			const stateWithMeetings = {
				...initialState,
				budget: {
					...initialState.budget,
					meetings: {
						'2025-10-01': {
							morning: mockMeeting,
							afternoon: undefined,
							full_day: undefined
						},
						'2025-10-02': {
							morning: undefined,
							afternoon: mockMeeting,
							full_day: undefined
						}
					}
				}
			}
			const action = CLEAR_MEETINGS_BUDGET()
			const newState = currentProjectSlice.reducer(stateWithMeetings, action)
			expect(newState.budget.meetings).toEqual({})
		})

		it('should handle CLEAR_MEETINGS_BUDGET action with no meetings', () => {
			const action = CLEAR_MEETINGS_BUDGET()
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.budget.meetings).toEqual({})
		})

		it('should not affect other budget properties when clearing meetings', () => {
			const stateWithMeetings = {
				...initialState,
				budget: {
					...initialState.budget,
					meetings: {
						'2025-10-01': {
							morning: mockMeeting,
							afternoon: undefined,
							full_day: undefined
						}
					},
					selectedHotelCost: 500,
					giftCost: 200
				}
			}

			const action = CLEAR_MEETINGS_BUDGET()
			const newState = currentProjectSlice.reducer(stateWithMeetings, action)
			expect(newState.budget.meetings).toEqual({})
			expect(newState.budget.selectedHotelCost).toBe(500)
			expect(newState.budget.giftCost).toBe(200)
		})
	})

	describe('Gift Actions', () => {
		const updatedQty = 2
		const updatedPrice = 150
		const updatedText = 'Updated Gift Text'

		it('should handle EDIT_GIFT action with qty update', () => {
			const stateWidthGift = {
				...initialState,
				project: {
					...initialState.project,
					gifts: [mockGift]
				}
			}
			const action = EDIT_GIFT({ indexGift: 0, qty: updatedQty })
			const newState = currentProjectSlice.reducer(stateWidthGift, action)
			expect(newState.project.gifts[0].qty).toBe(updatedQty)
		})

		it('should handle EDIT_GIFT action with price update', () => {
			const stateWidthGift = {
				...initialState,
				project: {
					...initialState.project,
					gifts: [mockGift]
				}
			}
			const action = EDIT_GIFT({ indexGift: 0, price: updatedPrice })
			const newState = currentProjectSlice.reducer(stateWidthGift, action)
			expect(newState.project.gifts[0].price).toBe(updatedPrice)
		})

		it('should handle EDIT_GIFT action with textContent update', () => {
			const stateWidthGift = {
				...initialState,
				project: {
					...initialState.project,
					gifts: [mockGift]
				}
			}
			const action = EDIT_GIFT({ indexGift: 0, textContent: updatedText })
			const newState = currentProjectSlice.reducer(stateWidthGift, action)
			expect(newState.project.gifts[0].textContent).toBe(updatedText)
		})

		it('should handle ADD_GIFT_TO_PROJECT action', () => {
			const action = ADD_GIFT_TO_PROJECT(mockGift)
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project.gifts).toContain(mockGift)
		})

		it('should handle UPDATE_GIFT action', () => {
			const newGifts: IGift[] = [{ ...starterGift, _id: 'new-gift' }]
			const action = UPDATE_GIFT({ gifts: newGifts })
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project.gifts).toEqual(newGifts)
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
		it('should handle HANDLE_SCHEDULE_DAYS action', () => {
			const action = HANDLE_SCHEDULE_DAYS(mockSchedule)
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project.schedule).toEqual(mockSchedule)
		})

		it('should handle REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE action', () => {
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

	describe('Project Input Actions', () => {
		it('should handle HANDLE_PROJECT_INPUT_CHANGE action for string input', () => {
			const fieldName: keyof IProject = 'code'
			const fieldValue = 'New Project Name'
			const action = HANDLE_PROJECT_INPUT_CHANGE({
				name: fieldName,
				value: fieldValue
			})
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project[fieldName]).toBe(fieldValue)
		})

		it('should handle HANDLE_PROJECT_INPUT_CHANGE action for boolean input', () => {
			const fieldName: keyof IProject = 'multiDestination'
			const fieldValue = true
			const action = HANDLE_PROJECT_INPUT_CHANGE({
				name: fieldName,
				value: fieldValue,
				type: 'checkbox'
			})
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project[fieldName]).toBe(fieldValue)
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

	describe('Hotel Modal Actions', () => {
		it('should handle EDIT_MODAL_HOTEL action', () => {
			const updatedHotels = [mockHotel]
			const action = EDIT_MODAL_HOTEL(updatedHotels)
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project.hotels).toEqual(updatedHotels)
		})

		it('should handle EDIT_MODAL_HOTEL_OVERNIGHT action', () => {
			const dayIndex = 0
			const updatedOvernightHotels = [mockHotel]
			const action = EDIT_MODAL_HOTEL_OVERNIGHT({
				dayIndex,
				updatedOvernightHotels
			})
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project.schedule[dayIndex].overnight.hotels).toEqual(
				updatedOvernightHotels
			)
		})
	})
})
