import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RestaurantListItem from './RestaurantListItem'
import {
	useCurrentProject,
	useGetRestaurants,
	useGetDocumentLength
} from '../../../hooks'
import { TableHeaders } from '../../../ui'
import { CityFilter, PriceFilter, RestaurantVenueFilter } from '../../../ui'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'

const RestaurantList = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const [restaurant] = useState({})
	const [price, setPrice] = useState(0)
	const [venueOrRestaurant, setVenueOrRestaurant] = useState('all')
	const [searchItem, setSearchItem] = useState('')
	const { currentProject } = useCurrentProject()
	const { groupLocation } = currentProject
	const [city, setCity] = useState(groupLocation || '')
	const [page, setPage] = useState(1)
	const { restaurants, setRestaurants, isLoading } = useGetRestaurants(
		city,
		price,
		venueOrRestaurant,
		page
	)
	const filterOptions = ['city', 'price[lte]', 'isVenue']
	const valuesRute = [
		{ name: 'city', value: city === 'none' ? undefined : city },
		{ name: 'price[lte]', value: price === 'none' ? undefined : price },
		{
			name: 'isVenue',
			value: venueOrRestaurant === 'all' ? undefined : venueOrRestaurant
		}
	]
	const [foundRestaurants, setFoundRestaurants] = useState([])
	const { results } = useGetDocumentLength(
		'restaurants',
		valuesRute,
		filterOptions
	)
	const [totalPages, setTotalPages] = useState(page ?? 1)

	useEffect(() => {
		setFoundRestaurants(restaurants)
		setTotalPages(results)
	}, [restaurants, results])

	const addRestaurantToProject = (restaurant) => {
		navigate(`/app/project/schedule/${restaurant._id}`, {
			state: {
				event: restaurant,
				dayOfEvent: location.state.dayOfEvent,
				timeOfEvent: location.state.timeOfEvent
			}
		})
	}

	const filterList = (e) => {
		setSearchItem(e.target.value)
		const result = restaurants.filter((data) =>
			data.name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		setFoundRestaurants(result)
		if (searchItem === '') {
			setFoundRestaurants(restaurants)
		}
	}

	const onChangePage = (direction) => {
		if (direction === 'prev' && page > 1) {
			setPage(page === 1 ? page : page - 1)
		} else if (direction === 'next' && page < totalPages) {
			setPage(page === totalPages ? page : page + 1)
		}
	}

	useMemo(() => {
		setPage(1)
	}, [price, venueOrRestaurant, city])

	const handleClick = () =>
		navigate('/app/restaurant/specs', { state: { restaurant } })

	const restaurantList = foundRestaurants?.map((restaurant) => (
		<RestaurantListItem
			key={restaurant._id}
			restaurant={restaurant}
			restaurants={restaurants}
			setRestaurants={setRestaurants}
			addRestaurantToProject={addRestaurantToProject}
			canBeAddedToProject={location.state}
		/>
	))

	return (
		<>
			<ListHeader
				title="Restaurant List"
				handleClick={handleClick}
				searchItem={searchItem}
				filterList={filterList}
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
					{restaurantList}
				</table>
			)}
		</>
	)
}

export default RestaurantList
