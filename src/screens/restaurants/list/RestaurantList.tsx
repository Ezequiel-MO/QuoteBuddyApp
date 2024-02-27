import { FC } from 'react'
import { RestaurantListItem } from './RestaurantListItem'
import {
	CityFilter,
	PriceFilter,
	RestaurantVenueFilter,
	TableHeaders
} from '../../../ui'
import { Spinner, LanguageFilter } from '@components/atoms'
import { ListHeader } from '@components/molecules'
import { useRestaurantList } from './useRestaurantList'
import { listStyles } from 'src/constants/listStyles'

export const RestaurantList: FC = () => {

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
		handleFilterList,
		handleListHeaderClick,
		canBeAddedToProject,
		language,
		setLanguage
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
				<PriceFilter
					setPrice={setPrice}
					price={price}
					otherPrices={undefined}
				/>
				<RestaurantVenueFilter
					setVenueOrRestaurant={setVenueOrRestaurant}
					venueOrRestaurant={venueOrRestaurant}
				/>
				<div className='absolute ml-[200px] '>
					<LanguageFilter language={language} setLanguage={setLanguage} />
				</div>
			</ListHeader>

			<hr />
			{isLoading ? (
				<Spinner />
			) : (
				<table className={listStyles.table}>
					<TableHeaders headers="restaurant" />
					{foundRestaurants?.map((restaurant) => (
						<RestaurantListItem
							key={restaurant._id}
							restaurant={restaurant}
							restaurants={restaurants}
							setRestaurants={setRestaurants}
							canBeAddedToProject={canBeAddedToProject}
						/>
					))}
				</table>
			)}
		</>
	)
}
