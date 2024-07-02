// usePagination.ts
import { useCallback } from 'react'

interface UsePaginationParams {
	state: any
	dispatch: React.Dispatch<any>
}

export const usePagination = ({ state, dispatch }: UsePaginationParams) => {
	const changePage = useCallback(
		(direction: 'prev' | 'next') => {
			const newPage =
				direction === 'prev'
					? Math.max(1, state.page - 1)
					: Math.min(state.totalPages, state.page + 1)
			dispatch({ type: 'SET_PAGE', payload: newPage })
		},
		[dispatch, state.page, state.totalPages]
	)

	return { changePage }
}
