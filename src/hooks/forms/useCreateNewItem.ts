import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

interface UseCreateNewItemParams {
	dispatch: React.Dispatch<any>
	initialState: any
	context: string
}

export const useCreateNewItem = ({
	dispatch,
	initialState,
	context
}: UseCreateNewItemParams) => {
	const navigate = useNavigate()

	const createNewItem = useCallback(() => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: false
		})

		dispatch({
			type: `SET_${context.toUpperCase()}`,
			payload: { ...initialState }
		})
		navigate(`/app/${context}/specs`)
	}, [dispatch, navigate, context, initialState])

	return { createNewItem }
}
