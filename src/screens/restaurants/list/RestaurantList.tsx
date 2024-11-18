import { FC, ChangeEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { RestaurantListItem } from './RestaurantListItem'
import { CityFilter, PriceFilter } from '../../../ui'
import { ListHeader } from '@components/molecules'
import { useRestaurant } from '../context/RestaurantsContext'
import IsVenueFilter from '@components/atoms/filters/IsVenueFilter'
import { ListTable } from '@components/molecules/table/ListTable'
import initialState from '../context/initialState'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { usePagination } from 'src/hooks/lists/usePagination'

export const RestaurantList: FC = () => {
	const { state, dispatch, handleChange, setForceRefresh, isLoading } =
		useRestaurant()
	const location = useLocation()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentRestaurant,
		context: 'restaurant'
	})
	const { changePage } = usePagination({ state, dispatch })

	const canBeAddedToProject = location?.state?.canbeAddedToProject ?? false

	return (
		<>
			<ListHeader
				title="Restaurants"
				handleClick={createNewItem}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={(direction) => {
					changePage(direction)
					setForceRefresh((prev) => prev + 1)
				}}
			>
				<CityFilter
					city={state.currentRestaurant?.city || ''}
					setCity={(city: string) => {
						handleChange({
							target: { name: 'city', value: city }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
				<IsVenueFilter
					isVenue={state.currentRestaurant?.isVenue as boolean}
					handleChange={handleChange}
				/>
				<PriceFilter
					setPrice={handleChange}
					price={state.currentRestaurant?.price || 0}
					otherPrices={undefined}
				/>
				{/* 	
				<div className="absolute ml-[200px] ">
					<LanguageFilter language={language} setLanguage={setLanguage} />
				</div> */}
			</ListHeader>

			<hr />
			<ListTable
				items={state.restaurants || []}
				headers="restaurant"
				ListItemComponent={RestaurantListItem}
				isLoading={isLoading || state.restaurants === undefined}
				searchTerm={state.searchTerm}
				canBeAddedToProject={canBeAddedToProject}
			/>
		</>
	)
}
