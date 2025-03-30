import { ChangeEvent } from 'react'
import LocationListItem from './LocationListItem'
import { ListHeader } from '@components/molecules'
import { useLocation } from '../context/LocationsContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListTable } from '@components/molecules/table/ListTable'
import { CountryFilter } from '@components/atoms'
import { Button } from 'src/components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'
import {LocationListRestoreItem} from './restore/LocationListRestoreItem'

const classButton = 'flex items-center uppercase  px-3 py-1 text-sm  text-white-0 bg-green-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'

const LocationList: React.FC = () => {
	const {
		state,
		dispatch,
		handleChange,
		setForceRefresh,
		isLoading,
		filterIsDeleted,
		setFilterIsDeleted
	} = useLocation()

	const { auth } = useAuth()

	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentLocation,
		context: 'location'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title={!filterIsDeleted ? 'Locations' : 'Locations Restore'}
				handleClick={() => {
					setFilterIsDeleted(false)
					createNewItem()
				}}
				titleCreate="Location"
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
				<CountryFilter
					country={state.currentLocation?.country || ''}
					setCountry={(country: string) => {
						handleChange({
							target: { name: 'country', value: country }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
			</ListHeader>
			{auth.role === 'admin' && (
				<div className="flex justify-end  mb-3 mr-2">
					<Button
						icon="hugeicons:data-recovery"
						widthIcon={20}
						newClass={classButton}
						type="button"
						handleClick={() => setFilterIsDeleted((prev) => !prev)}
					>
						{!filterIsDeleted ? `activate restore` : 'exit restore'}
					</Button>
				</div>
			)}
			<hr />

			<ListTable
				items={state.locations || []}
				headers={!filterIsDeleted ? 'location' : 'locationRestore'}
				ListItemComponent={!filterIsDeleted ? LocationListItem : LocationListRestoreItem}
				isLoading={isLoading || state.locations === undefined}
				searchTerm={state.searchTerm}
				canBeAddedToProject={false}
			/>
		</>
	)
}

export default LocationList
