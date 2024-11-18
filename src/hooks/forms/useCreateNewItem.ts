import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

interface UseCreateNewItemParams {
	dispatch: React.Dispatch<any>
	initialState: any
	context: string
	path?: string
}

export const useCreateNewItem = ({
	dispatch,
	initialState,
	context,
	path = 'app'
}: UseCreateNewItemParams) => {
	const navigate = useNavigate()
	const createNewItem = useCallback(() => {
		dispatch({
			type: 'SET_SUPPLIER',
			payload: initialState
		})
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: false
		})

		dispatch({
			type: `SET_${context.toUpperCase()}`,
			payload: { ...initialState }
		})
		navigate(`/${path}/${context}/specs`)
	}, [dispatch, navigate, context, initialState])

	return { createNewItem }
}
