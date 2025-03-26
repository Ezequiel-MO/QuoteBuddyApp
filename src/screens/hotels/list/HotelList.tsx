import { ChangeEvent, FC, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CityFilter, NrStarsFilter, NrHotelRoomsFilter } from '../../../ui'
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

export const HotelList: FC = () => {
	const { dispatch, state, handleChange, setForceRefresh, isLoading, setFilterIsDeleted, filterIsDeleted } = useHotel()

	const location = useLocation()

	const { auth } = useAuth()

	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentHotel,
		context: 'hotel'
	})

	const { changePage } = usePagination({ state, dispatch })

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 600)
	}, [filterIsDeleted])

	const canBeAddedToProject = location?.state?.canbeAddedToProject ?? false

	const classButton = 'flex items-center uppercase  px-6 py-3 text-white-0 bg-green-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'

	return (
		<>
			<ListHeader
				title={!filterIsDeleted ? `Hotels` : 'Hotels Restore'}
				handleClick={() => {
					setFilterIsDeleted(false)
					createNewItem()
				}}
				titleCreate='Hotel'
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
			{
				auth.role === 'admin' &&
				<div className='mb-4'>
					<Button
						icon='hugeicons:data-recovery'
						widthIcon={20}
						newClass={classButton}
						type='button'
						handleClick={() => setFilterIsDeleted(prev => !prev)}
					>
						{!filterIsDeleted ? `activate restore` : 'exit restore'}
					</Button>
				</div>
			}
			<hr />
			<ListTable
				items={state.hotels || []}
				headers={!filterIsDeleted ? 'hotel' : 'hotelRestore'}
				ListItemComponent={!filterIsDeleted ? HotelListItem : HotelListRestoreItem}
				isLoading={isLoading || state.hotels === undefined}
				searchTerm={state.searchTerm}
				canBeAddedToProject={canBeAddedToProject}
			/>
		</>
	)
}
