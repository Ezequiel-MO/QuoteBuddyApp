import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	CityFilter,
	NrStarsFilter,
	NrHotelRoomsFilter,
	TableHeaders,
	SearchInput
} from '../../../ui'

import {
	useCurrentProject,
	useGetDocumentLength,
	useGetHotels
} from '../../../hooks'
import { Pagination, Spinner } from '../../../components/atoms'
import { HotelListItem } from '../'

export const HotelList = () => {
	const navigate = useNavigate()
	const [hotel] = useState({})
	const [numberStars, setNumberStars] = useState(0)
	const [numberRooms, setNumberRooms] = useState(0)
	const [page, setPage] = useState(1)
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

	// console.log(city)
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
	const [totalPages, setTotalPages] = useState(page ?? 1)

	useEffect(() => {
		setFoundHotels(hotels)
		setTotalPages(results)
	}, [hotels, results])

	const currentProjectIsLive = Object.keys(currentProject).length !== 0

	//busca solamente en esa page el search
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

	const onChangePage = (direction) => {
		if (direction === 'prev' && page > 1) {
			setPage(page === 1 ? page : page - 1)
		} else if (direction === 'next' && page < totalPages) {
			setPage(page === totalPages ? page : page + 1)
		}
	}

	useMemo(() => {
		setPage(1)
	}, [numberStars, numberRooms, city])

	const hotelList = foundHotels?.map((hotel) => (
		<HotelListItem
			key={hotel._id}
			hotel={hotel}
			hotels={hotels}
			setHotels={setHotels}
			canBeAddedToProject={currentProjectIsLive}
		/>
	))

	return (
		<>
			<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mr-8 ml-8 relative">
				<div className="flex flex-col w-full">
					<h1 className="text-2xl">Hotel List</h1>
					<div className="flex flex-row justify-start items-center mb-1">
						<div>
							{currentProjectIsLive ? null : (
								<CityFilter setCity={setCity} city={city} />
							)}
							<NrStarsFilter
								setNumberStars={setNumberStars}
								numberStars={numberStars}
							/>
							<NrHotelRoomsFilter
								setNumberRooms={setNumberRooms}
								numberRooms={numberRooms}
							/>
						</div>
						<button
							onClick={() => navigate('/app/hotel/specs', { state: { hotel } })}
							className="mx-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
						>
							Create New Hotel
						</button>
						<SearchInput searchItem={searchItem} filterList={filterList} />
						<div className="absolute right-10 top-[50px]">
							<Pagination
								page={page}
								totalPages={totalPages}
								onChangePage={onChangePage}
							/>
						</div>
					</div>
				</div>
			</div>
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
