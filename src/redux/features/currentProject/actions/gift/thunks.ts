import { IGift } from '@interfaces/gift'
import { UpdateGiftPayload } from '../../types'
import { AppThunk } from 'src/redux/store'
import { UPDATE_GIFT } from '../../CurrentProjectSlice'

export const updateGiftThunk =
	(payload: UpdateGiftPayload): AppThunk =>
	(dispatch, getState) => {
		const { idGift, keyGift, value } = payload
		const state = getState()
		const currentGifts: IGift[] = state.currentProject.project.gifts

		// Deep copy the gifts array
		const copyGifts = currentGifts.map((g) => ({ ...g }))

		// Find the gift to update
		const gift = copyGifts.find((g) => g._id === idGift)

		if (!gift) {
			console.error(`Gift with ID ${idGift} not found.`)
			return
		}

		// Update the gift
		;(gift as any)[keyGift] = value

		// Dispatch the action
		dispatch(UPDATE_GIFT({ gifts: copyGifts }))
	}
