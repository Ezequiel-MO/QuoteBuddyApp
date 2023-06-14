import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
	useCurrentProject,
	useGetRestaurants,
	useGetDocumentLength,
	usePagination
} from '../../../hooks'
import { useRestaurantFilters } from './useRestaurantFilters'
import { useFilterValues } from '../../hotels/list/useFilterValues'

const FilterRoutes = ['city', 'price[lte]', 'isVenue']

export const useRestaurantList = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { currentProject } = useCurrentProject()
	const { groupLocation } = currentProject
	const restaurant = {}
	const {
		city,
		setCity,
		price,
		setPrice,
		venueOrRestaurant,
		setVenueOrRestaurant
	} = useRestaurantFilters(groupLocation)

	const [searchItem, setSearchItem] = useState('')
	const [foundRestaurants, setFoundRestaurants] = useState([])

	const [totalPages, setTotalPages] = useState(1)
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
	}, [setPage, price, venueOrRestaurant, city])

	const handleAddRestaurantToProject = (restaurant) => {
		navigate(`/app/project/schedule/${restaurant._id}`, {
			state: {
				event: restaurant,
				dayOfEvent: location.state.dayOfEvent,
				timeOfEvent: location.state.timeOfEvent
			}
		})
	}

	const handleFilterList = (e) => {
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
		handleAddRestaurantToProject,
		handleFilterList,
		handleListHeaderClick
	}
}
