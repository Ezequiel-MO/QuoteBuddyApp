import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import RestaurantListItem from './RestaurantListItem'
import {
	useCurrentProject,
	useGetRestaurants,
	useGetDocumentLength
} from '../../../hooks'
import { TableHeaders } from '../../../ui'
import {
	CityFilter,
	PriceFilter,
	RestaurantVenueFilter,
	SearchInput
} from '../../../ui'
import { Pagination, Spinner } from '../../../components/atoms'

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
	const filterOptions = ["city", "price[lte]", "isVenue"]
	const valuesRute = [
		{ name: "city", value: city === "none" ? undefined : city },
		{ name: "price[lte]", value: price === "none" ? undefined : price },
		{ name: "isVenue", value: venueOrRestaurant === "all" ? undefined : venueOrRestaurant }
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

	/* 	const currentProjectIsLive = Object.keys(currentProject).length !== 0 */

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
			<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
				<div className="flex flex-col w-full">
					<h1 className="text-2xl">Restaurant List</h1>
					<div className="flex flex-row justify-start items-center">
						<div>
							{/*  {currentProjectIsLive ? null : (
                <CityFilter setCity={setCity} city={city} />
              )} */}
							<CityFilter setCity={setCity} city={city} />
							<PriceFilter setPrice={setPrice} price={price} />
							<RestaurantVenueFilter
								setVenueOrRestaurant={setVenueOrRestaurant}
								venueOrRestaurant={venueOrRestaurant}
							/>
						</div>

						<button
							onClick={() =>
								navigate('/app/restaurant/specs', { state: { restaurant } })
							}
							className="mx-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
						>
							Create New Restaurant
						</button>
						<SearchInput searchItem={searchItem} filterList={filterList} />
						<div className="absolute right-20 top-[218px]">
							<Pagination
								page={page}
								totalPages={totalPages}
								onChangePage={onChangePage}
							/>
						</div>
					</div>
				</div>
			</div>

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
