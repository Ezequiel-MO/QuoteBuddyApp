import { FC } from 'react'

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

export const HotelList: FC = () => {
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
		currentProjectIsLive
	} = useHotelList()

	const handleClick = () => navigate('/app/hotel/specs', { state: { hotel } })

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
