import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RestaurantListItem from './RestaurantListItem'
import {
	useCurrentProject,
	useGetRestaurants,
	useGetDocumentLength,
	usePagination
} from '../../../hooks'
import {
	CityFilter,
	PriceFilter,
	RestaurantVenueFilter,
	TableHeaders
} from '../../../ui'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'
import { useRestaurantFilters } from './useRestaurantFilters'

const FilterRoutes = ['city', 'price[lte]', 'isVenue']

const RestaurantList = () => {
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
	const filterValues = [
		{ name: 'city', value: city === 'none' ? undefined : city },
		{ name: 'price[lte]', value: price === 'none' ? undefined : price },
		{
			name: 'isVenue',
			value: venueOrRestaurant === 'all' ? undefined : venueOrRestaurant
		}
	]
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

	return (
		<>
			<ListHeader
				title="Restaurants"
				handleClick={handleListHeaderClick}
				searchItem={searchItem}
				filterList={handleFilterList}
				page={page}
				totalPages={totalPages}
				onChangePage={onChangePage}
			>
				<CityFilter setCity={setCity} city={city} />
				<PriceFilter setPrice={setPrice} price={price} />
				<RestaurantVenueFilter
					setVenueOrRestaurant={setVenueOrRestaurant}
					venueOrRestaurant={venueOrRestaurant}
				/>
			</ListHeader>

			<hr />
			{isLoading ? (
				<Spinner />
			) : (
				<table className="w-full p-5">
					<TableHeaders headers="restaurant" />
					{foundRestaurants?.map((restaurant) => (
						<RestaurantListItem
							key={restaurant._id}
							restaurant={restaurant}
							restaurants={restaurants}
							setRestaurants={setRestaurants}
							addRestaurantToProject={handleAddRestaurantToProject}
							canBeAddedToProject={location.state}
						/>
					))}
				</table>
			)}
		</>
	)
}

export default RestaurantList
