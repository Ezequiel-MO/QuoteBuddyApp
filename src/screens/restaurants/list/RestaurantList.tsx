import { FC, ChangeEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { RestaurantListItem } from './RestaurantListItem'
import { CityFilter, PriceFilter } from '../../../ui'
import { ListHeader } from '@components/molecules'
import { useRestaurant } from '../context/RestaurantsContext'
import { ListTable } from '@components/molecules/table/ListTable'
import initialState from '../context/initialState'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { usePagination } from 'src/hooks/lists/usePagination'
import { Button } from 'src/components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'
import { RestaurantListRestoreItem } from './restore/RestaurantListRestoreItem'
import { MaxCapacityFilter } from '../components'
import IsVenueFilter from '../components/IsVenueFilter'

export const RestaurantList: FC = () => {
	const { auth } = useAuth()

	const {
		state,
		dispatch,
		handleChange,
		setForceRefresh,
		isLoading,
		setFilterIsDeleted,
		filterIsDeleted
	} = useRestaurant()
	const location = useLocation()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentRestaurant,
		context: 'restaurant'
	})
	const { changePage } = usePagination({ state, dispatch })

	const canBeAddedToProject = location?.state?.canbeAddedToProject ?? false

	const classButton =
		'flex items-center uppercase  px-3 py-1 text-sm  text-white-0 bg-green-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'

	return (
		<>
			<ListHeader
				title={!filterIsDeleted ? 'Restaurants' : 'Restaurants Restore'}
				handleClick={() => {
					setFilterIsDeleted(false)
					createNewItem()
				}}
				titleCreate="Restaurant"
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
				<div className="grid grid-cols-2 gap-2">
					<div className="space-y-2">
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
					</div>
					<div className="space-y-2">
						<MaxCapacityFilter
							maxCapacity={state.currentRestaurant?.maxCapacity || 0}
							setMaxCapacity={handleChange}
						/>
						<PriceFilter
							setPrice={handleChange}
							price={state.currentRestaurant?.price || 0}
							otherPrices={undefined}
						/>
					</div>
				</div>

				{/* 	
				<div className="absolute ml-[200px] ">
					<LanguageFilter language={language} setLanguage={setLanguage} />
				</div> */}
			</ListHeader>

			{auth.role === 'admin' && (
				<div className="flex justify-end -mt-8 mb-3 mr-2">
					<Button
						icon="hugeicons:data-recovery"
						widthIcon={20}
						type="button"
						handleClick={() => setFilterIsDeleted((prev) => !prev)}
					>
						{!filterIsDeleted ? `activate restore` : 'exit restore'}
					</Button>
				</div>
			)}
			<hr />
			<div className={filterIsDeleted ? 'mb-40' : ''}>
				<ListTable
					items={state.restaurants || []}
					headers={!filterIsDeleted ? 'restaurant' : 'restaurantRestore'}
					ListItemComponent={
						!filterIsDeleted ? RestaurantListItem : RestaurantListRestoreItem
					}
					isLoading={isLoading || state.restaurants === undefined}
					searchTerm={state.searchTerm}
					canBeAddedToProject={canBeAddedToProject}
				/>
			</div>
		</>
	)
}
