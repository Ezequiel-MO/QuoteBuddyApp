import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import LocationListItem from './LocationListItem'
import { useGetLocations } from '../../../hooks'
import { Spinner } from '../../../components/atoms'
import { TableHeaders } from '../../../ui'

const LocationList = () => {
	const navigate = useNavigate()
	const [location] = useState({})
	const { locations, setLocations, isLoading } = useGetLocations()

	return (
		<>
			<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
				<div className="flex flex-col w-full">
					<h1 className="text-2xl">List of Available Locations</h1>
					<div className="flex flex-row justify-between">
						<button
							onClick={() =>
								navigate('/app/location/specs', { state: { location } })
							}
							className="focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
						>
							Create New Location
						</button>
					</div>
				</div>
			</div>

			<hr />

			<div className="flex-1 m-4 flex-col">
				{isLoading ? (
					<Spinner />
				) : (
					<table className="w-full p-5">
						<TableHeaders headers="location" />
						{locations.map((location) => (
							<LocationListItem
								key={location._id}
								location={location}
								locations={locations}
								setLocations={setLocations}
							/>
						))}
					</table>
				)}
			</div>
		</>
	)
}

export default LocationList
