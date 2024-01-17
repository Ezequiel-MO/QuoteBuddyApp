/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import {
	useCurrentProject,
	useFilterList,
	useGetDocumentLength,
	usePagination
} from '../../../hooks'
import { useFilterValues } from './useFilterValues'
import { IHotel, IProject } from 'src/interfaces'
import { useFetchHotels } from 'src/hooks/fetchData'

const FilterRoutes: string[] = ['city', 'numberRooms[lte]', 'numberStars']

const filterFunction = (data: IHotel, value: string) =>
	data.name.toLowerCase().includes(value.toLowerCase()) ||
	data.city.toLowerCase().includes(value.toLowerCase())

export const useHotelList = () => {
	const hotel: IHotel = {} as IHotel
	const [numberStars, setNumberStars] = useState<number>(0)
	const [numberRooms, setNumberRooms] = useState<number>(0)
	const [totalPages, setTotalPages] = useState<number>(1)
	const [isSearching, setIsSearching] = useState(false)
	const { page, setPage, onChangePage } = usePagination(1, totalPages)

	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { groupLocation } = currentProject
	const [city, setCity] = useState<string>(groupLocation || '')
	const filterValues = useFilterValues(city, numberStars, numberRooms)

	const {
		hotels: fetchedHotels,
		setHotels,
		isLoading
	} = useFetchHotels({
		city,
		numberStars,
		numberRooms,
		page,
		fetchAll: isSearching
	})

	const hotels = fetchedHotels as unknown as IHotel[]

	const { results } = useGetDocumentLength('hotels', filterValues, FilterRoutes)

	useEffect(() => {
		setFoundHotels(hotels)
		setTotalPages(results)
	}, [hotels, results])

	const {
		filteredData: foundHotels,
		searchTerm: searchItem,
		filterList,
		setData: setFoundHotels
	} = useFilterList(hotels, filterFunction)

	useEffect(() => {
		if (searchItem) {
			setIsSearching(true)
		} else {
			setIsSearching(false)
		}
	}, [searchItem])

	useEffect(() => {
		setPage(1)
		setIsSearching(false)
	}, [city, numberStars, numberRooms])

	const currentProjectIsLive: boolean = Object.keys(currentProject).length !== 0

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
