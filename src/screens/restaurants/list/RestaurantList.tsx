import { FC, ChangeEvent, useEffect } from 'react'
import { RestaurantListItem } from './RestaurantListItem'
import { CityFilter, PriceFilter } from '../../../ui'
import { ListHeader } from '@components/molecules'
import { useRestaurant } from '../context/RestaurantsContext'
import { useNavigate } from 'react-router-dom'
import IsVenueFilter from '@components/atoms/filters/IsVenueFilter'
import { ListTable } from '@components/molecules/table/ListTable'

export const RestaurantList: FC = () => {
	const { state, dispatch, handleChange } = useRestaurant()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch({
			type: 'UPDATE_RESTAURANT_FIELD',
			payload: { name: 'city', value: '' }
		})
		dispatch({
			type: 'UPDATE_RESTAURANT_FIELD',
			payload: { name: 'isVenue', value: false }
		})
		dispatch({
			type: 'UPDATE_RESTAURANT_FIELD',
			payload: { name: 'price', value: 0 }
		})
	}, [dispatch])

	const handleCreateNewRestaurant = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: false
		})
		navigate('/app/restaurant/specs')
	}

	const handleChangePage = (direction: 'prev' | 'next') => {
		const newPage =
			direction === 'prev'
				? Math.max(1, state.page - 1)
				: Math.min(state.totalPages, state.page + 1)
		dispatch({ type: 'SET_PAGE', payload: newPage })
	}

	return (
		<>
			<ListHeader
				title="Restaurants"
				handleClick={handleCreateNewRestaurant}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={handleChangePage}
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
				isLoading={
					state.restaurants === undefined || state.restaurants?.length === 0
				}
			/>
		</>
	)
}
