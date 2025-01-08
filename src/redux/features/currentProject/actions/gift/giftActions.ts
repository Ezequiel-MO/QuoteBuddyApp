import { IGift } from '@interfaces/index'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { UpdateGiftPayload } from '../../types'
import {
	ADD_GIFT_TO_PROJECT,
	EDIT_GIFT,
	REMOVE_GIFT_FROM_PROJECT,
	UPDATE_GIFT_COST
} from '../../CurrentProjectSlice'
import * as thunks from './thunks'

export const useGiftActions = () => {
	const dispatch = useAppDispatch()

	const addGiftToProject = (gift: IGift) => {
		dispatch(ADD_GIFT_TO_PROJECT(gift))
	}
	const removeGiftFromProject = (giftId: string) => {
		dispatch(REMOVE_GIFT_FROM_PROJECT(giftId))
	}
	const editGift = (gift: IGift, indexGift: number) => {
		dispatch(
			EDIT_GIFT({
				indexGift,
				qty: gift.qty,
				price: gift.price,
				textContent: gift.textContent
			})
		)
	}

	const updateGift = <K extends keyof IGift>(payload: UpdateGiftPayload<K>) => {
		dispatch(thunks.updateGiftThunk(payload))
	}

	const updateGiftCost = (value: number) => dispatch(UPDATE_GIFT_COST(value))

	return {
		addGiftToProject,
		removeGiftFromProject,
		editGift,
		updateGift,
		updateGiftCost
	}
}
