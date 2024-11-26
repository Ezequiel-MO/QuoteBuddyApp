import { useDispatch } from 'react-redux'
import { TOGGLE_MODAL } from '../CurrentProjectSlice'
import { useAppDispatch } from 'src/hooks/redux/redux'

export const useModalActions = () => {
	const dispatch = useAppDispatch()

	const toggleModal = () => {
		dispatch(TOGGLE_MODAL())
	}

	return {
		toggleModal
	}
}
