import { ChangeEvent, FC } from 'react'
import { useLocation } from 'react-router-dom'
import { CityFilter } from '../../../ui'
import { HotelListItem } from '..'
import { ListHeader } from '../../../components/molecules'
import { useHotel } from '../context/HotelsContext'
import { ListTable } from '@components/molecules/table/ListTable'
import initialState from '../context/initialState'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { usePagination } from 'src/hooks/lists/usePagination'
import { Button } from 'src/components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'
import { HotelListRestoreItem } from './restore/HotelListRestoreItem'
import { NrHotelRoomsFilter, NrStarsFilter } from '../components'

export const HotelList: FC = () => {
	const {
		dispatch,
		state,
		handleChange,
		setForceRefresh,
		isLoading,
		setFilterIsDeleted,
		filterIsDeleted
	} = useHotel()

	const location = useLocation()

	const { auth } = useAuth()

	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentHotel,
		context: 'hotel'
	})

	const { changePage } = usePagination({ state, dispatch })

	const canBeAddedToProject = location?.state?.canbeAddedToProject ?? false

	return (
		<>
			<ListHeader
				title={!filterIsDeleted ? `Hotels` : 'Hotels Restore'}
				handleClick={() => {
					setFilterIsDeleted(false)
					createNewItem()
				}}
				titleCreate="Hotel"
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page ?? 1}
				totalPages={state.totalPages ?? 1}
				onChangePage={(direction) => {
					changePage(direction)
					setForceRefresh((prev) => prev + 1)
				}}
			>
				<CityFilter
					city={state.currentHotel?.city || ''}
					setCity={(city: string) => {
						handleChange({
							target: { name: 'city', value: city }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
				<NrStarsFilter />
				<NrHotelRoomsFilter />
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
					items={state.hotels || []}
					headers={!filterIsDeleted ? 'hotel' : 'hotelRestore'}
					ListItemComponent={
						!filterIsDeleted ? HotelListItem : HotelListRestoreItem
					}
					isLoading={isLoading || state.hotels === undefined}
					searchTerm={state.searchTerm}
					canBeAddedToProject={canBeAddedToProject}
				/>
			</div>
		</>
	)
}
