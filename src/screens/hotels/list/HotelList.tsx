import { ChangeEvent, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { CityFilter, NrStarsFilter, NrHotelRoomsFilter } from '../../../ui'
import { HotelListItem } from '..'
import { ListHeader } from '../../../components/molecules'
import { useHotel } from '../context/HotelsContext'
import { ListTable } from '@components/molecules/table/ListTable'

export const HotelList: FC = () => {
	const { dispatch, state, handleChange } = useHotel()
	const navigate = useNavigate()

	const handleCreateNewHotel = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: false
		})
		navigate('/app/hotel/specs')
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
				title="Hotels"
				handleClick={handleCreateNewHotel}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page ?? 1}
				totalPages={state.totalPages ?? 1}
				onChangePage={handleChangePage}
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
			/>
		</>
	)
}
