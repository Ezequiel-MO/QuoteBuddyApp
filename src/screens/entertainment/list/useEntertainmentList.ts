import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	useCurrentProject,
	useFilterList,
	useGetDocumentLength,
	useGetEntertainmentShows,
	usePagination
} from 'src/hooks'
import { IProject } from 'src/interfaces'

const filterRoutes = ['city']

export const useEntertainmentList = () => {
	const navigate = useNavigate()
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { groupLocation } = currentProject
	const [city, setCity] = useState<string>(groupLocation || '')
	const [totalPages, setTotalPages] = useState<number>(1)
	const [isSearching, setIsSearching] = useState<boolean>(false)
	const { page, setPage, onChangePage } = usePagination(1, totalPages)
	const entertainmentShow = {}

	const filterValues = [
		{ name: 'city', value: city === 'none' ? undefined : city }
	]

	const { isLoading, entertainmentShows, setEntertainmentShows } =
		useGetEntertainmentShows(city, page, filterValues, isSearching)

	const { results } = useGetDocumentLength(
		'entertainments',
		filterValues,
		filterRoutes
	)

	const filterFunction = (data: any, value: any) =>
		data.name.toLowerCase().includes(value.toLowerCase())

	const {
		filteredData: foundEntertainmentShows,
		searchTerm: searchItem,
		filterList,
		setData: setFoundEntertainmentShows
	} = useFilterList(entertainmentShows, filterFunction)

	useEffect(() => {
		setFoundEntertainmentShows(entertainmentShows)
		setTotalPages(results)
	}, [entertainmentShows, results])

	useEffect(() => {
		if (searchItem) {
			setIsSearching(true)
		} else {
			setIsSearching(false)
		}
	}, [searchItem])

	useEffect(() => {
		setPage(1)
	}, [city])

	const handleClick = () =>
		navigate('/app/entertainment/specs', { state: { entertainmentShow } })

	return {
		city,
		setCity,
		entertainmentShows,
		setEntertainmentShows,
		foundEntertainmentShows,
		setFoundEntertainmentShows,
		searchItem,
		filterList,
		handleClick,
		page,
		totalPages,
		onChangePage,
		isLoading,
		entertainmentShow
	}
}
