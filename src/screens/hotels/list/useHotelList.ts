import { useState, useEffect } from 'react'
import { useFilterList, useGetDocumentLength } from '../../../hooks'
import { useFilterValues } from './useFilterValues'
import { IHotel } from 'src/interfaces'
import { useFetchHotels } from 'src/hooks/fetchData'
import { useHotel } from '../context/HotelsContext'

const FilterRoutes: string[] = ['city', 'numberRooms[lte]', 'numberStars']

const filterFunction = (data: IHotel, value: string) =>
	data.name.toLowerCase().includes(value.toLowerCase()) ||
	data.city.toLowerCase().includes(value.toLowerCase())

export const useHotelList = () => {
	const { state, dispatch } = useHotel()
	const [isSearching, setIsSearching] = useState(false)

	const filterValues = useFilterValues(
		state.currentHotel?.city || '',
		state.currentHotel?.numberStars || 0,
		state.currentHotel?.numberRooms || 0
	)

	const { hotels, setHotels, isLoading } = useFetchHotels({
		city: state.currentHotel?.city || '',
		numberStars: state.currentHotel?.numberStars || 0,
		numberRooms: state.currentHotel?.numberRooms || 0,
		page: state.page,
		fetchAll: isSearching
	})

	const { results } = useGetDocumentLength('hotels', filterValues, FilterRoutes)

	const {
		filteredData: foundHotels,
		searchTerm: searchItem,
		filterList,
		setData: setFoundHotels
	} = useFilterList(hotels, filterFunction)

	useEffect(() => {
		setFoundHotels(hotels)

		dispatch({ type: 'SET_TOTAL_PAGES', payload: Number(results) })
	}, [hotels, results, dispatch])

	useEffect(() => {
		if (searchItem) {
			setIsSearching(true)
		} else {
			setIsSearching(false)
		}
	}, [searchItem])

	useEffect(() => {
		dispatch({ type: 'SET_PAGE', payload: 1 })
		setIsSearching(false)
	}, [state.currentHotel, dispatch])

	return {
		hotels,
		setHotels,
		isLoading,
		foundHotels,
		searchItem,
		filterList
	}
}
