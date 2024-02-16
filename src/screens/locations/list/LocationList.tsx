import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import LocationListItem from './LocationListItem'
import { CountryFilter, Spinner } from '../../../components/atoms'
import { TableHeaders } from '../../../ui'
import { useApiFetch } from 'src/hooks/fetchData'
import { listStyles } from 'src/constants/listStyles'
import { ILocation } from '@interfaces/location'

const LocationList: React.FC = () => {
	const navigate = useNavigate()
	const [location] = useState({})
	const [country, setCountry] = useState<string>('')
	const {
		data: locations,
		setData: setLocations,
		isLoading
	} = useApiFetch<ILocation>('locations')

	const [filteredData, setFilteredData] = useState<ILocation[]>(locations)

	useEffect(() => {
		if (country === '') {
			setFilteredData(locations)
		} else {
			setFilteredData(
				locations.filter((location) => location?.country?.includes(country))
			)
		}
	}, [country, locations])

	return (
		<>
			<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
				<div className="flex flex-col w-full">
					<h1 className="text-2xl">List of Available Locations</h1>
					<div className="flex flex-row justify-between">
						<div>
							<CountryFilter setCountry={setCountry} country={country} />
						</div>
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
					<table className={listStyles.table}>
						<TableHeaders headers="location" />
						{filteredData.map((location) => (
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
