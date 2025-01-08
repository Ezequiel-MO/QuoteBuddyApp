import { IBudget } from '@interfaces/budget'
import { IHotel } from '@interfaces/hotel'
import { ITransfer } from '@interfaces/transfer'
import {
	starterHotel,
	starterRestaurant,
	starterTransfer
} from 'src/constants/starterObjects'
import store from 'src/redux/store'
import { currentProjectSlice } from '../../CurrentProjectSlice'
import * as thunks from './thunks'
import { IRestaurant } from '@interfaces/restaurant'

const mockHotel: IHotel = { ...starterHotel }
const mockRestaurant: IRestaurant = { ...starterRestaurant }
const partialBudget: Partial<IBudget> = {
	nrPax: 50,
	gifts: []
}
const mockTransfer: ITransfer = { ...starterTransfer }

describe('budgetActions thunks', () => {
	const { actions } = currentProjectSlice

	beforeEach(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		vi.spyOn(console, 'warn').mockImplementation(() => {})
		store.dispatch({ type: actions.CLEAR_PROJECT.type })
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe('setBudgetThunk', () => {
		it('should merge partial budget data into the existing budget', () => {
			store.dispatch(thunks.setBudgetThunk(partialBudget))
			const state = store.getState().currentProject
			expect(state.budget.nrPax).toBe(50)
			expect(console.error).not.toHaveBeenCalled()
		})
	})

	describe('setBudgetSelectedHotelThunk', () => {
		it('should update the selectedHotel in the budget', () => {
			store.dispatch(thunks.setBudgetSelectedHotelThunk(mockHotel))

			const state = store.getState().currentProject
			expect(state.budget.selectedHotel?._id).toBe('1')
			expect(console.error).not.toHaveBeenCalled()
		})
	})

	describe('setBudgetSelectedHotelCostThunk', () => {
		it('should calculate the hotel cost for the given nights', () => {
			store.dispatch(thunks.setBudgetSelectedHotelCostThunk(mockHotel, 1))
			const state = store.getState().currentProject
			expect(state.budget.selectedHotelCost).toBe(80000)
		})

		it('should set cost to 0 if the hotel has no price array', () => {
			const noPriceHotel: IHotel = { ...mockHotel, price: [] }
			store.dispatch(thunks.setBudgetSelectedHotelCostThunk(noPriceHotel, 2))
			expect(store.getState().currentProject.budget.selectedHotelCost).toBe(0)
		})
	})

	describe('updateBudgetTransfersInCostThunk', () => {
		it('should sum up transfer_in plus assistance/meetGreet costs for the first item', () => {
			const transferInArray = [mockTransfer]
			store.dispatch(thunks.updateBudgetTransfersInCostThunk(transferInArray))

			const state = store.getState().currentProject
			expect(state.budget.transfersInCost).toBe(500)
		})

		it('should handle empty array gracefully', () => {
			store.dispatch(thunks.updateBudgetTransfersInCostThunk([]))
			const state = store.getState().currentProject
			expect(state.budget.transfersInCost).toBe(0)
		})
	})

	describe('updateBudgetTransfersOutCostThunk', () => {
		it('should sum up transfer_out plus assistance/meetGreet costs for the first item', () => {
			const transferOutArray = [mockTransfer]
			store.dispatch(thunks.updateBudgetTransfersOutCostThunk(transferOutArray))

			expect(store.getState().currentProject.budget.transfersOutCost).toBe(520)
		})

		it('should handle empty array gracefully', () => {
			store.dispatch(thunks.updateBudgetTransfersOutCostThunk([]))
			expect(store.getState().currentProject.budget.transfersOutCost).toBe(0)
		})
	})

	describe('updateProgramTransfersCostThunk', () => {
		it('should compute serviceCost = selectedService * count + assistanceCost (once)', () => {
			const payload = {
				date: '2025-01-01',
				transfer: { ...starterTransfer },
				count: 3,
				type: 'lunch'
			}
			store.dispatch(thunks.updateProgramTransfersCostThunk(payload))

			const { budget } = store.getState().currentProject
			expect(budget.programTransfersCost).toBe(500)
			expect(console.error).not.toHaveBeenCalled()
		})

		it('should log an error if service cost is invalid', () => {
			const payload = {
				date: '2025-01-01',
				transfer: {
					...starterTransfer,
					selectedService: 'unknownKey' as any
				},
				count: 1,
				type: 'lunch'
			}
			store.dispatch(thunks.updateProgramTransfersCostThunk(payload))

			expect(console.error).toHaveBeenCalledWith(
				"The service cost for the service 'unknownKey' is not a valid number."
			)
		})

		describe('updateProgramMealsCostThunk', () => {
			it('should compute a normal restaurant cost if not isVenue', () => {
				const payload = {
					date: '2025-01-01',
					restaurant: {
						...mockRestaurant
					},
					pax: 3,
					type: 'lunch' as 'lunch'
				}
				store.dispatch(thunks.updateProgramMealsCostThunk(payload))
				expect(store.getState().currentProject.budget.mealsCost).toBe(300)
			})

			it('should handle a venue with custom cost fields', () => {
				const payload = {
					date: '2025-01-01',
					restaurant: {
						_id: 'venue-1',
						name: 'Mock Venue',
						isVenue: true,
						venue_price: {
							rental: 800,
							cocktail_units: 2,
							cocktail_price: 50
						}
					},
					pax: 5, // not used for venue
					type: 'dinner' as 'dinner'
				}
				store.dispatch(thunks.updateProgramMealsCostThunk(payload))
				expect(store.getState().currentProject.budget.mealsCost).toBe(900)
			})
		})
	})
})
