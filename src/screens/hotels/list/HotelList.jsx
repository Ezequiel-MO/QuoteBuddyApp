import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders, SearchInput } from '../../../ui'

import {
	useCurrentProject,
	useGetDocumentLength,
	useGetHotels
} from '../../../hooks'
import { Pagination, Spinner } from '../../../components/atoms'
import { HotelListItem } from '../'
import { FilterControls } from '../renders/FilterControls'
import { CreateHotelButton } from '../renders/CreateHotelButton'

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

	useEffect(() => {
		setPage(1)
	}, [city, numberStars, numberRooms])

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
						<FilterControls
							city={city}
							setCity={setCity}
							numberStars={numberStars}
							setNumberStars={setNumberStars}
							numberRooms={numberRooms}
							setNumberRooms={setNumberRooms}
						/>
						<CreateHotelButton hotel={hotel} navigate={navigate} />
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
