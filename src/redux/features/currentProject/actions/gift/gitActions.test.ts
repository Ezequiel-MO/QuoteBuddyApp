import { IGift } from '@interfaces/gift'
import { currentProjectSlice } from '../../CurrentProjectSlice'
import { starterGift } from 'src/constants/starterObjects'
import store from 'src/redux/store'
import * as thunks from './thunks'

describe('giftActions thunks', () => {
	const { actions } = currentProjectSlice

	const mockGift: IGift = {
		...starterGift
	}

	beforeEach(() => {
		vi.spyOn(console, 'error').mockImplementation(() => {})
		store.dispatch({ type: actions.CLEAR_PROJECT.type })
	})

	afterEach(() => {
		vi.restoreAllMocks()
	})

	describe('updateGiftThunk', () => {
		it('should update the gift if it exists in the store', () => {
			store.dispatch({
				type: actions.SET_CURRENT_PROJECT.type,
				payload: {
					...store.getState().currentProject.project,
					gifts: [mockGift]
				}
			})

			store.dispatch(
				thunks.updateGiftThunk({
					idGift: 'gift-1',
					keyGift: 'price',
					value: 200
				})
			)
			const state = store.getState().currentProject
			const updated = state.project.gifts.find((g) => g._id === 'gift-1')
			expect(updated?.price).toBe(200)
			expect(console.error).not.toHaveBeenCalled()
		})

		it('should log an error if the gift is not found', () => {
			store.dispatch(
				thunks.updateGiftThunk({
					idGift: 'non-existent',
					keyGift: 'price',
					value: 999
				})
			)
			expect(console.error).toHaveBeenCalledWith(
				'Gift with ID non-existent not found.'
			)
			const state = store.getState().currentProject
			expect(state.project.gifts).toEqual([])
		})
	})
})
