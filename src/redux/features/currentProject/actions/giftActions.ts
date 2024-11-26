import { IGift } from '@interfaces/index'
import { useDispatch } from 'react-redux'
import {
	ADD_GIFT_TO_PROJECT,
	EDIT_GIFT,
	REMOVE_GIFT_FROM_PROJECT
} from '../CurrentProjectSlice'
import { useAppDispatch } from 'src/hooks/redux/redux'

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

	return {
		addGiftToProject,
		removeGiftFromProject,
		editGift
	}
}
