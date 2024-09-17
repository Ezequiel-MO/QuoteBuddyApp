import { useDispatch } from 'react-redux'
import { TOGGLE_MODAL } from '../CurrentProjectSlice'

export const useModalActions = () => {
	const dispatch = useDispatch()

	const toggleModal = () => {
		dispatch(TOGGLE_MODAL())
	}

	return {
		toggleModal
	}
}
