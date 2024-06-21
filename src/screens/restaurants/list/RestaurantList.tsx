import { FC, ChangeEvent, useEffect } from 'react'
import { RestaurantListItem } from './RestaurantListItem'
import { CityFilter, PriceFilter, TableHeaders } from '../../../ui'
import { Spinner, LanguageFilter } from '@components/atoms'
import { ListHeader } from '@components/molecules'
import { listStyles } from 'src/constants/listStyles'
import { useRestaurant } from '../context/RestaurantsContext'
import { useNavigate } from 'react-router-dom'
import { IRestaurant } from '@interfaces/restaurant'
import { useCurrentProject } from 'src/hooks'
import IsVenueFilter from '@components/atoms/filters/IsVenueFilter'

export const RestaurantList: FC = () => {
	const { state, dispatch, handleChange } = useRestaurant()
	const { currentProject } = useCurrentProject()
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

			{state.restaurants ? (
				<table className={listStyles.table}>
					<TableHeaders headers="restaurant" />
					{state.restaurants?.map((restaurant: IRestaurant) => (
						<RestaurantListItem
							key={restaurant._id}
							restaurant={restaurant}
							canBeAddedToProject={currentProject?._id !== undefined}
						/>
					))}
				</table>
			) : (
				<Spinner />
			)}
		</>
	)
}
