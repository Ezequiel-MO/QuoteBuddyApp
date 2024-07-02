import { useCallback } from 'react'

interface UseImageModalParams {
	dispatch: React.Dispatch<any>
}

export const useImageModal = ({ dispatch }: UseImageModalParams) => {
	const openModal = useCallback(() => {
		dispatch({
			type: 'SET_IMAGES_MODAL_OPEN',
			payload: true
		})
	}, [dispatch])

	const closeModal = useCallback(() => {
		dispatch({
			type: 'SET_IMAGES_MODAL_OPEN',
			payload: false
		})
	}, [dispatch])

	return { openModal, closeModal }
}
