import { useState, useMemo } from 'react'

export const usePagination = (initialPage = 1, dataFetcher) => {
	const [page, setPage] = useState(initialPage)
	const [totalPages, setTotalPages] = useState(initialPage)

	useMemo(() => {
		const fetchTotalPages = async () => {
			const fetchedTotalPages = await dataFetcher()
			setTotalPages(fetchedTotalPages)
		}

		fetchTotalPages()
	}, [dataFetcher])

	const handlePageChange = (direction) => {
		if (direction === 'prev' && page > 1) {
			setPage(page - 1)
		} else if (direction === 'next' && page < totalPages) {
			setPage(page + 1)
		}
	}

	return { page, totalPages, handlePageChange }
}
