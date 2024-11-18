import { ChangeEvent } from 'react'
import LocationListItem from './LocationListItem'
import { ListHeader } from '@components/molecules'
import { useLocation } from '../context/LocationsContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListTable } from '@components/molecules/table/ListTable'
import { CountryFilter } from '@components/atoms'

const LocationList: React.FC = () => {
	const { state, dispatch, handleChange, setForceRefresh, isLoading } =
		useLocation()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentLocation,
		context: 'location'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title="Locations"
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
				<CountryFilter
					country={state.currentLocation?.country || ''}
					setCountry={(country: string) => {
						handleChange({
							target: { name: 'country', value: country }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
			</ListHeader>

			<hr />

			<ListTable
				items={state.locations || []}
				headers="location"
				ListItemComponent={LocationListItem}
				isLoading={isLoading || state.locations === undefined}
				searchTerm={state.searchTerm}
				canBeAddedToProject={false}
			/>
		</>
	)
}

export default LocationList
