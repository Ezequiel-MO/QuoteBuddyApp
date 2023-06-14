import { useState, useEffect } from 'react'
import {
	useCurrentProject,
	useFilterList,
	useGetDocumentLength,
	useGetHotels,
	usePagination
} from '../../../hooks'
import { useFilterValues } from './useFilterValues'

const FilterRoutes = ['city', 'numberRooms[lte]', 'numberStars']

const filterFunction = (data, value) =>
	data.name.toLowerCase().includes(value.toLowerCase()) ||
	data.city.toLowerCase().includes(value.toLowerCase())

export const useHotelList = () => {
	const hotel = {}
	const [numberStars, setNumberStars] = useState(0)
	const [numberRooms, setNumberRooms] = useState(0)
	const [totalPages, setTotalPages] = useState(1)

	const { currentProject } = useCurrentProject()
	const { groupLocation } = currentProject
	const [city, setCity] = useState(groupLocation || '')

	const { hotels, setHotels, isLoading } = useGetHotels(
		city,
		numberStars,
		numberRooms
	)

	const { page, setPage, onChangePage } = usePagination(1, totalPages)

	const filterValues = useFilterValues(city, numberStars, numberRooms)

	const { results } = useGetDocumentLength('hotels', filterValues, FilterRoutes)

	const {
		filteredData: foundHotels,
		searchTerm: searchItem,
		filterList,
		setData: setFoundHotels
	} = useFilterList(hotels, filterFunction)

	useEffect(() => {
		setFoundHotels(hotels)
		setTotalPages(results)
	}, [hotels, results])

	useEffect(() => {
		setPage(1)
	}, [setPage, city, numberStars, numberRooms])

	const currentProjectIsLive = Object.keys(currentProject).length !== 0

	return {
		hotel,
		numberStars,
		setNumberStars,
		numberRooms,
		setNumberRooms,
		page,
		totalPages,
		onChangePage,
		city,
		setCity,
		hotels,
		setHotels,
		isLoading,
		foundHotels,
		searchItem,
		filterList,
		currentProjectIsLive
	}
}
