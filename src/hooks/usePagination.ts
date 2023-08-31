// usePagination.js
import { useState } from 'react'

export type Direction = 'prev' | 'next'

export const usePagination = (initialPage: number, totalPages: number) => {
	const [page, setPage] = useState<number>(initialPage)

	const onChangePage = (direction: Direction) => {
		if (direction === 'prev' && page > 1) {
			setPage(page - 1)
		} else if (direction === 'next' && page < totalPages) {
			setPage(page + 1)
		}
	}

	return { page, setPage, onChangePage }
}
