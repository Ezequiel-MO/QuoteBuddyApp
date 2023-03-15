import { CityFilter, NrHotelRoomsFilter, NrStarsFilter } from '../../../ui'

export const FilterControls = ({
	city,
	setCity,
	numberStars,
	setNumberStars,
	numberRooms,
	setNumberRooms
}) => {
	return (
		<div>
			<CityFilter setCity={setCity} city={city} />
			<NrStarsFilter
				setNumberStars={setNumberStars}
				numberStars={numberStars}
			/>
			<NrHotelRoomsFilter
				setNumberRooms={setNumberRooms}
				numberRooms={numberRooms}
			/>
		</div>
	)
}
