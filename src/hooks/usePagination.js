// usePagination.js
import { useState } from 'react'

export const usePagination = (initialPage, totalPages) => {
	const [page, setPage] = useState(initialPage)

	const onChangePage = (direction) => {
		if (direction === 'prev' && page > 1) {
			setPage(page - 1)
		} else if (direction === 'next' && page < totalPages) {
			setPage(page + 1)
		}
	}

	return { page, setPage, onChangePage }
}
