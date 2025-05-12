import { IBudget } from '@interfaces/budget'
import { currentProjectSlice } from '../CurrentProjectSlice'
import { defaultProject } from '../defaultProjectState'
import { defaultBudget } from '../../budget/defaultBudgetState'
import {
	starterGift,
	starterHotel,
	starterMeeting,
	starterSchedule,
	starterTransfer
} from '@constants/starterObjects'
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

	const { actions, reducer } = currentProjectSlice

	describe('Project Actions', () => {
		it('should handle UPDATE_PROJECT_SCHEDULE action with meta', () => {
			const action = actions.UPDATE_PROJECT_SCHEDULE(
				mockSchedule,
				'Updated schedule'
			)
			const newState = reducer(initialState, action)
			expect(newState.project.schedule).toEqual(mockSchedule)
			expect(action.meta.reason).toBe('Updated schedule')
		})

		it('should handle SET_CURRENT_PROJECT action', () => {
			const action = actions.SET_CURRENT_PROJECT(mockProject)
			const newState = reducer(initialState, action)
			expect(newState.project).toEqual(mockProject)
		})

		it('should handle ADD_HOTEL_TO_PROJECT action', () => {
			const action = actions.ADD_HOTEL_TO_PROJECT(mockHotel)
			const newState = reducer(initialState, action)
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
			const action = actions.REMOVE_HOTEL_FROM_PROJECT({
				hotelId: mockHotel._id as string,
				updatedSchedule: stateWithHotel.project.schedule
			})

			const newState = reducer(stateWithHotel, action)
			expect(newState.project.hotels).not.toContain(mockHotel)
		})

		it('should handle CLEAR_PROJECT action', () => {
			const stateWithCustomProject = {
				...initialState,
				project: { ...defaultProject, name: 'Custom Project' }
			}
			const action = actions.CLEAR_PROJECT()
			const newState = reducer(stateWithCustomProject, action)
			expect(newState.project).toEqual(defaultProject)
		})
	})
	describe('Budget Actions', () => {
		it('should handle SET_BUDGET action', () => {
			const action = actions.SET_BUDGET(mockBudget, 'update budget')
			const newState = reducer(initialState, action)
			expect(newState.budget).toEqual(mockBudget)
		})

		it('should handle UPDATE_GIFT_COST action', () => {
			const newGiftCost = 250
			const action = actions.UPDATE_GIFT_COST(newGiftCost)
			const newState = reducer(initialState, action)
			expect(newState.budget.giftCost).toBe(newGiftCost)
		})

		it('should handle UPDATE_MEETINGS_TOTAL_COST action', () => {
			const newCost = 300
			const action = actions.UPDATE_MEETINGS_TOTAT_COST(newCost)
			const newState = reducer(initialState, action)
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
			const action = actions.CLEAR_MEETINGS_BUDGET()
			const newState = reducer(stateWithMeetings, action)
			expect(newState.budget.meetings).toEqual({})
		})

		it('should handle CLEAR_MEETINGS_BUDGET action with no meetings', () => {
			const action = actions.CLEAR_MEETINGS_BUDGET()
			const newState = reducer(initialState, action)
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

			const action = actions.CLEAR_MEETINGS_BUDGET()
			const newState = reducer(stateWithMeetings, action)
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
			const action = actions.EDIT_GIFT({ indexGift: 0, qty: updatedQty })
			const newState = reducer(stateWidthGift, action)
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
			const action = actions.EDIT_GIFT({ indexGift: 0, price: updatedPrice })
			const newState = reducer(stateWidthGift, action)
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
			const action = actions.EDIT_GIFT({
				indexGift: 0,
				textContent: updatedText
			})
			const newState = reducer(stateWidthGift, action)
			expect(newState.project.gifts[0].textContent).toBe(updatedText)
		})

		it('should handle ADD_GIFT_TO_PROJECT action', () => {
			const action = actions.ADD_GIFT_TO_PROJECT(mockGift)
			const newState = reducer(initialState, action)
			expect(newState.project.gifts).toContain(mockGift)
		})

		it('should handle UPDATE_GIFT action', () => {
			const newGifts: IGift[] = [{ ...starterGift, _id: 'new-gift' }]
			const action = actions.UPDATE_GIFT({ gifts: newGifts })
			const newState = reducer(initialState, action)
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
			const action = actions.REMOVE_GIFT_FROM_PROJECT({ id: mockGift._id })
			const newState = reducer(stateWithGift, action)
			expect(newState.project.gifts).not.toContain(mockGift)
		})
	})

	describe('Schedule Actions', () => {
		it('should handle HANDLE_SCHEDULE_DAYS action', () => {
			const action = actions.HANDLE_SCHEDULE_DAYS(mockSchedule)
			const newState = reducer(initialState, action)
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
			const action = actions.REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE({
				dayIndex: 0,
				transferId: mockTransfer._id
			})
			const newState = reducer(stateWithSchedule, action)
			expect(newState.project.schedule[0].itinerary.itinerary).not.toContain(
				mockTransfer
			)
		})

		it('should handle ADD_HOTEL_OVERNIGHT_TO_SCHEDULE action', () => {
			const action = actions.ADD_HOTEL_OVERNIGHT_TO_SCHEDULE({
				dayIndex: 0,
				hotel: mockHotel
			})
			const newState = reducer(initialState, action)
			expect(newState.project.schedule[0].overnight.hotels).toContain(mockHotel)
		})
	})

	describe('Project Input Actions', () => {
		it('should handle HANDLE_PROJECT_INPUT_CHANGE action for string input', () => {
			const fieldName: keyof IProject = 'code'
			const fieldValue = 'New Project Name'
			const action = actions.HANDLE_PROJECT_INPUT_CHANGE({
				name: fieldName,
				value: fieldValue
			})
			const newState = reducer(initialState, action)
			expect(newState.project[fieldName]).toBe(fieldValue)
		})

		it('should handle HANDLE_PROJECT_INPUT_CHANGE action for boolean input', () => {
			const fieldName: keyof IProject = 'multiDestination'
			const fieldValue = true
			const action = actions.HANDLE_PROJECT_INPUT_CHANGE({
				name: fieldName,
				value: fieldValue,
				type: 'checkbox'
			})
			const newState = reducer(initialState, action)
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
			const action = actions.DRAG_AND_DROP_HOTEL({
				startHotelIndex: 1,
				endHotelIndex: 0
			})
			const newState = reducer(stateWithHotels, action)
			expect(newState.project.hotels).toEqual([mockHotel2, mockHotel1])
		})

		it('should handle DRAG_AND_DROP_HOTEL_OVERNIGHT action', () => {
			const mockHotel1 = { ...starterHotel, _id: 'hotel-1' }
			const mockHotel2 = { ...starterHotel, _id: 'hotel-2' }

			const initialSchedule = [
				{
					...mockSchedule[0],
					overnight: {
						...mockSchedule[0].overnight,
						hotels: [mockHotel1, mockHotel2]
					}
				},
				mockSchedule[1]
			]
			const newSchedule = [
				{
					...mockSchedule[0],
					overnight: {
						...mockSchedule[0].overnight,
						hotels: [mockHotel2, mockHotel1]
					}
				},
				mockSchedule[1]
			]

			const initialStateForTest = {
				...initialState,
				project: {
					...initialState.project,
					schedule: initialSchedule
				}
			}

			const action = actions.DRAG_AND_DROP_HOTEL_OVERNIGHT({
				newSchedule
			})
			const newState = reducer(initialStateForTest, action)
			expect(newState.project.schedule).toEqual(newSchedule)
		})
	})

	describe('Hotel Modal Actions', () => {
		it('should handle EDIT_MODAL_HOTEL action', () => {
			const updatedHotels = [mockHotel]
			const action = actions.EDIT_MODAL_HOTEL(updatedHotels)
			const newState = reducer(initialState, action)
			expect(newState.project.hotels).toEqual(updatedHotels)
		})

		it('should handle EDIT_MODAL_HOTEL_OVERNIGHT action', () => {
			const dayIndex = 0
			const updatedOvernightHotels = [mockHotel]
			const action = actions.EDIT_MODAL_HOTEL_OVERNIGHT({
				dayIndex,
				updatedOvernightHotels
			})
			const newState = reducer(initialState, action)
			expect(newState.project.schedule[dayIndex].overnight.hotels).toEqual(
				updatedOvernightHotels
			)
		})
	})

	describe('Toggle Modal Action', () => {
		it('should handle TOGGLE_MODAL action from close to open', () => {
			const action = actions.TOGGLE_MODAL()
			const newState = reducer(initialState, action)
			expect(newState.modalIsOpen).toBe(true)
		})

		it('should handle TOGGLE_MODAL action from open to close', () => {
			const stateWithOpenModal = {
				...initialState,
				modalIsOpen: true
			}
			const action = actions.TOGGLE_MODAL()
			const newState = reducer(stateWithOpenModal, action)
			expect(newState.modalIsOpen).toBe(false)
		})
	})
})
