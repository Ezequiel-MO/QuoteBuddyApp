// RestaurantList.js
import RestaurantListItem from './RestaurantListItem'
import {
	CityFilter,
	PriceFilter,
	RestaurantVenueFilter,
	TableHeaders
} from '../../../ui'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'
import { useRestaurantList } from './useRestaurantList'

export const RestaurantList = () => {
	const {
		city,
		setCity,
		price,
		setPrice,
		venueOrRestaurant,
		setVenueOrRestaurant,
		searchItem,
		foundRestaurants,
		page,
		totalPages,
		onChangePage,
		isLoading,
		restaurants,
		setRestaurants,
		handleAddRestaurantToProject,
		handleFilterList,
		handleListHeaderClick
	} = useRestaurantList()

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
