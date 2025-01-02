import { IBudget } from '@interfaces/budget'
import {
	ADD_GIFT_TO_PROJECT,
	currentProjectSlice,
	REMOVE_GIFT_FROM_PROJECT,
	SET_BUDGET,
	SET_CURRENT_PROJECT,
	UPDATE_GIFT_COST
} from '../CurrentProjectSlice'
import { defaultProject } from '../defaultProjectState'
import { defaultBudget } from '../../budget/defaultBudgetState'
import { IProject } from '@interfaces/project'
import { IGift } from '@interfaces/gift'
import { starterGift } from 'src/constants/starterObjects'

describe('currentProjectSlice reducer', () => {
	let initialState: ReturnType<typeof currentProjectSlice.getInitialState>

	beforeEach(() => {
		initialState = currentProjectSlice.getInitialState()
	})

	describe('Project Actions', () => {
		it('should handle SET_CURRENT_PROJECT action', () => {
			const mockProject: IProject = { ...defaultProject }
			const action = SET_CURRENT_PROJECT(mockProject)
			const newState = currentProjectSlice.reducer(initialState, action)
			expect(newState.project).toEqual(mockProject)
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
})
