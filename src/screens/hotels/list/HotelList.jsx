import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	TableHeaders,
	CityFilter,
	NrStarsFilter,
	NrHotelRoomsFilter
} from '../../../ui'

import {
	useCurrentProject,
	useGetDocumentLength,
	useGetHotels,
	usePagination
} from '../../../hooks'
import { Spinner } from '../../../components/atoms'
import { HotelListItem } from '../'
import { ListHeader } from '../../../components/molecules'

export const HotelList = () => {
	const navigate = useNavigate()
	const [hotel] = useState({})
	const [numberStars, setNumberStars] = useState(0)
	const [numberRooms, setNumberRooms] = useState(0)
	const [totalPages, setTotalPages] = useState(1)
	const { page, setPage, onChangePage } = usePagination(1, totalPages)

	const [searchItem, setSearchItem] = useState('')
	const { currentProject } = useCurrentProject()
	const { groupLocation } = currentProject
	const [city, setCity] = useState(groupLocation || '')
	const { hotels, setHotels, isLoading } = useGetHotels(
		city,
		numberStars,
		numberRooms,
		page
	)

	const valuesRute = [
		{ name: 'city', value: city === 'none' ? undefined : city },
		{
			name: 'numberStars',
			value: numberStars === 'none' ? undefined : numberStars
		},
		{
			name: 'numberRooms[lte]',
			value: numberRooms === 'none' ? undefined : numberRooms
		}
	]
	const filterOptions = ['city', 'numberRooms[lte]', 'numberStars']
	const { results } = useGetDocumentLength('hotels', valuesRute, filterOptions)
	const [foundHotels, setFoundHotels] = useState([])

	useEffect(() => {
		setFoundHotels(hotels)
		setTotalPages(results)
	}, [hotels, results])

	const currentProjectIsLive = Object.keys(currentProject).length !== 0

	const filterList = (e) => {
		setSearchItem(e.target.value)
		const result = hotels.filter((data) =>
			data.name.toLowerCase().includes(e.target.value.toLowerCase())
		)

		setFoundHotels(result)
		if (searchItem === '') {
			setFoundHotels(hotels)
		}
	}

	useEffect(() => {
		setPage(1)
	}, [setPage, city, numberStars, numberRooms])

	const hotelList = foundHotels?.map((hotel) => (
		<HotelListItem
			key={hotel._id}
			hotel={hotel}
			hotels={hotels}
			setHotels={setHotels}
			canBeAddedToProject={currentProjectIsLive}
		/>
	))

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
				<table className="w-full p-5">
					<TableHeaders headers="hotel" />
					{hotelList}
				</table>
			)}
		</>
	)
}
