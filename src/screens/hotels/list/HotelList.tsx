import { ChangeEvent, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	TableHeaders,
	CityFilter,
	NrStarsFilter,
	NrHotelRoomsFilter
} from '../../../ui'
import { Spinner } from '../../../components/atoms'
import { HotelListItem } from '..'
import { ListHeader } from '../../../components/molecules'
import { IHotel } from 'src/interfaces'
import { listStyles } from 'src/constants/listStyles'
import { useHotel } from '../context/HotelsContext'
import { useCurrentProject } from 'src/hooks'

export const HotelList: FC = () => {
	const { dispatch, state, handleChange } = useHotel()
	const { currentProject } = useCurrentProject()
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

			{state.hotels ? (
				<table className={listStyles.table}>
					<TableHeaders headers="hotel" />
					{state.hotels?.map((hotel: IHotel) => (
						<HotelListItem
							key={hotel._id}
							hotel={hotel}
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
