import { useAppDispatch } from 'src/hooks/redux/redux'
import { TOGGLE_MODAL } from '../slices/project/projectSlice'

export const useModalActions = () => {
	const dispatch = useAppDispatch()

	const toggleModal = () => {
		dispatch(TOGGLE_MODAL())
	}

	return {
		toggleModal
	}
}
