import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	TableHeaders,
	CityFilter,
	NrStarsFilter,
	NrHotelRoomsFilter
} from '../../../ui'

import { Spinner, LanguageFilter } from '../../../components/atoms'
import { HotelListItem } from '..'
import { ListHeader } from '../../../components/molecules'
import { useHotelList } from './useHotelList'
import { IHotel } from 'src/interfaces'
import { listStyles } from 'src/constants/listStyles'
import { createBlankHotel } from '../context/createBlankHotel'
import { useHotel } from '../context/HotelsContext'

export const HotelList: FC = () => {
	const { dispatch } = useHotel()
	const navigate = useNavigate()
	const {
		hotel,
		numberStars,
		setNumberStars,
		numberRooms,
		setNumberRooms,
		page,
		totalPages,
		onChangePage,
		city,
		setCity,
		hotels,
		setHotels,
		isLoading,
		foundHotels,
		searchItem,
		filterList,
		currentProjectIsLive,
		language,
		setLanguage
	} = useHotelList()

	const handleClick = () => {
		const newHotel = createBlankHotel()
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: false
		})
		dispatch({
			type: 'SET_HOTEL',
			payload: newHotel
		})
		navigate('/app/hotel/specs')
	}

	return (
		<>
			<ListHeader
				title="Hotels"
				handleClick={handleClick}
				searchItem={searchItem}
				filterList={filterList}
				page={page}
				totalPages={totalPages}
				onChangePage={onChangePage}
			>
				<CityFilter city={city} setCity={setCity} />
				<NrStarsFilter
					numberStars={numberStars}
					setNumberStars={setNumberStars}
				/>
				<NrHotelRoomsFilter
					numberRooms={numberRooms}
					setNumberRooms={setNumberRooms}
				/>
				<div className="absolute ml-[200px] ">
					<LanguageFilter language={language} setLanguage={setLanguage} />
				</div>
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
							canBeAddedToProject={currentProjectIsLive}
						/>
					))}
				</table>
			)}
		</>
	)
}
