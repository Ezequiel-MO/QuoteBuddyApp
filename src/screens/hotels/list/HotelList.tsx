import { ChangeEvent, FC } from 'react'
import { useLocation } from 'react-router-dom'
import { CityFilter, NrStarsFilter, NrHotelRoomsFilter } from '../../../ui'
import { HotelListItem } from '..'
import { ListHeader } from '../../../components/molecules'
import { useHotel } from '../context/HotelsContext'
import { ListTable } from '@components/molecules/table/ListTable'
import initialState from '../context/initialState'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { usePagination } from 'src/hooks/lists/usePagination'

export const HotelList: FC = () => {
	const { dispatch, state, handleChange } = useHotel()
	const location = useLocation()
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
				title="Hotels"
				handleClick={createNewItem}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page ?? 1}
				totalPages={state.totalPages ?? 1}
				onChangePage={changePage}
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
			<hr />
			<ListTable
				items={state.hotels || []}
				headers="hotel"
				ListItemComponent={HotelListItem}
				isLoading={state.hotels === undefined || state.hotels?.length === 0}
				canBeAddedToProject={canBeAddedToProject}
			/>
		</>
	)
}
