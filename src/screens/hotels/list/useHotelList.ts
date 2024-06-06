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
	const [isLoading, setIsLoading] = useState(false)
	const { state, dispatch } = useHotel()

	const [isSearching, setIsSearching] = useState(false)

	const filterValues = useFilterValues(
		state.currentHotel?.city || '',
		state.currentHotel?.numberStars || 0,
		state.currentHotel?.numberRooms || 0
	)

	const { hotels, setHotels } = useFetchHotels({
		city: state.currentHotel?.city || '',
		numberStars: state.currentHotel?.numberStars || 0,
		numberRooms: state.currentHotel?.numberRooms || 0,
		page: state.page,
		fetchAll: isSearching
	})

	const {
		filteredData: foundHotels,
		searchTerm: searchItem,
		filterList,
		setData: setFoundHotels
	} = useFilterList(hotels, filterFunction)

	useEffect(() => {
		setFoundHotels(hotels)
	}, [hotels, dispatch])

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
