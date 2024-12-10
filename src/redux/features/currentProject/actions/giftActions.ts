import { IGift } from '@interfaces/index'

import {
	ADD_GIFT_TO_PROJECT,
	EDIT_GIFT,
	REMOVE_GIFT_FROM_PROJECT
} from '../CurrentProjectSlice'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { UpdateGiftPayload } from '../types'
import { AppThunk } from 'src/redux/store'
import { UPDATE_GIFT } from '@screens/budget/context/budgetReducer'

export const useGiftActions = () => {
	const dispatch = useAppDispatch()

	const addGiftToProject = (gift: IGift) => {
		dispatch(ADD_GIFT_TO_PROJECT(gift))
	}
	const removeGiftFromProject = (giftId: string) => {
		dispatch(REMOVE_GIFT_FROM_PROJECT(giftId))
	}
	const editGift = (gift: IGift) => {
		dispatch(EDIT_GIFT(gift))
	}

	const updateGift = <K extends keyof IGift>(payload: UpdateGiftPayload<K>) => {
		dispatch(updateGiftThunk(payload))
	}

	return {
		addGiftToProject,
		removeGiftFromProject,
		editGift,
		updateGift
	}
}

const updateGiftThunk =
	<K extends keyof IGift>(payload: UpdateGiftPayload<K>): AppThunk =>
	(dispatch, getState) => {
		const { idGift, keyGift, value } = payload
		const state = getState()
		const currentGifts: IGift[] = state.currentProject.project.gifts

		// Deep copy the gifts array
		const copyGifts = JSON.parse(JSON.stringify(currentGifts))

		// Find the gift to update
		const gift: IGift | undefined = copyGifts.find(
			(g: IGift) => g._id === idGift
		)
		if (!gift) {
			console.error(`Gift with ID ${idGift} not found.`)
			return
		}

		// Update the specified key
		gift[keyGift] = value

		// Dispatch the action
		dispatch({
			type: UPDATE_GIFT,
			payload: { gifts: copyGifts }
		})
	}
