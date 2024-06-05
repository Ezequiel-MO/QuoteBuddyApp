import { ChangeEvent, FC, useEffect } from 'react'
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
import { useHotelList } from './useHotelList'
import { IHotel } from 'src/interfaces'
import { listStyles } from 'src/constants/listStyles'
import { useHotel } from '../context/HotelsContext'
import { createBlankHotel } from '../context/createBlankHotel'
import { useCurrentProject } from 'src/hooks'

export const HotelList: FC = () => {
	const { dispatch, state, handleChange } = useHotel()
	const { currentProject } = useCurrentProject()
	const navigate = useNavigate()
	const { hotels, setHotels, isLoading, foundHotels, searchItem, filterList } =
		useHotelList()

	useEffect(() => {
		const newHotelForm = createBlankHotel()
		dispatch({ type: 'SET_HOTEL', payload: newHotelForm })
	}, [])

	const handleClick = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: false
		})
		navigate('/app/hotel/specs')
	}

	const handleChangePage = (direction: 'prev' | 'next') => {
		let newPage = state.page
		if (direction === 'prev' && state.page > 1) {
			newPage = state.page - 1
		} else if (direction === 'next' && state.page < state.totalPages) {
			newPage = state.page + 1
		}
		dispatch({ type: 'SET_PAGE', payload: newPage })
	}

	return (
		<>
			<ListHeader
				title="Hotels"
				handleClick={handleClick}
				searchItem={searchItem}
				filterList={filterList}
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
				{/* <div className="absolute ml-[200px] ">
					<LanguageFilter language={language} setLanguage={setLanguage} />
				</div> */}
			</ListHeader>
			<hr />

			{isLoading ? (
				<Spinner />
			) : (
				<table className={listStyles.table}>
					<TableHeaders headers="hotel" />
					{foundHotels?.map((hotel: IHotel) => (
						<HotelListItem
							key={hotel._id}
							hotel={hotel}
							hotels={hotels}
							setHotels={setHotels}
							canBeAddedToProject={currentProject?._id !== undefined}
						/>
					))}
				</table>
			)}
		</>
	)
}
