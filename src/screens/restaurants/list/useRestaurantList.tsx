import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	useCurrentProject,
	useGetRestaurants,
	useGetDocumentLength,
	usePagination
} from '../../../hooks'
import { useRestaurantFilters } from './useRestaurantFilters'

import { IProject, IRestaurant } from 'src/interfaces'
import { useFilterValues } from './useFilterValues'

const FilterRoutes: string[] = ['city', 'price[lte]', 'isVenue']

export const useRestaurantList = () => {
	const navigate = useNavigate()
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { groupLocation } = currentProject
	const restaurant: IRestaurant = {} as IRestaurant
	const {
		city,
		setCity,
		price,
		setPrice,
		venueOrRestaurant,
		setVenueOrRestaurant
	} = useRestaurantFilters(groupLocation)

	const [searchItem, setSearchItem] = useState<string>('')
	const [foundRestaurants, setFoundRestaurants] = useState<IRestaurant[]>([])
	const [totalPages, setTotalPages] = useState<number>(1)

	const { page, setPage, onChangePage } = usePagination(1, totalPages)

	const { restaurants, setRestaurants, isLoading } = useGetRestaurants(
		city,
		price,
		venueOrRestaurant,
		page
	)
	const filterValues = useFilterValues(city, price, venueOrRestaurant)

	const { results } = useGetDocumentLength(
		'restaurants',
		filterValues,
		FilterRoutes
	)

	useEffect(() => {
		setFoundRestaurants(restaurants)
		setTotalPages(results)
	}, [restaurants, results])

	useEffect(() => {
		setPage(1)
	}, [price, venueOrRestaurant, city])

	const handleFilterList = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchItem(e.target.value)
		const result = restaurants.filter((data) =>
			data.name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		setFoundRestaurants(result)
		if (searchItem === '') {
			setFoundRestaurants(restaurants)
		}
	}

	const handleListHeaderClick = () =>
		navigate('/app/restaurant/specs', { state: { restaurant } })

	return {
		city,
		setCity,
		price,
		setPrice,
		venueOrRestaurant,
		setVenueOrRestaurant,
		searchItem,
		setSearchItem,
		foundRestaurants,
		setFoundRestaurants,
		page,
		setPage,
		onChangePage,
		totalPages,
		isLoading,
		restaurants,
		setRestaurants,
		handleFilterList,
		handleListHeaderClick
	}
}
