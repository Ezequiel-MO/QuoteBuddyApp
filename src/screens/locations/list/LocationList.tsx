import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import LocationListItem from './LocationListItem'
import { CountryFilter, Spinner } from '../../../components/atoms'
import { TableHeaders } from '../../../ui'
import { useApiFetch } from 'src/hooks/fetchData'
import { listStyles } from 'src/constants/listStyles'
import { ILocation } from '@interfaces/location'
import { ListHeader } from '@components/molecules'

const LocationList: React.FC = () => {
	const navigate = useNavigate()
	const [location] = useState({} as ILocation)
	const [country, setCountry] = useState<string>('')
	const {
		data: locations,
		setData: setLocations,
		isLoading
	} = useApiFetch<ILocation[]>('locations')

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

	const navigateToLocationSpecs = useCallback(
		(location: ILocation) => {
			navigate('/app/location/specs', { state: { location } })
		},
		[navigate]
	)

	return (
		<>
			<ListHeader
				title="Locations"
				handleClick={() => navigateToLocationSpecs(location)}
			>
				<CountryFilter setCountry={setCountry} country={country} />
			</ListHeader>

			<hr />

			<div className="flex-1 m-4 flex-col">
				{isLoading ? (
					<Spinner />
				) : (
					<table className={listStyles.table}>
						<TableHeaders headers="location" />
						{filteredData?.map((location) => (
							<LocationListItem
								key={location._id}
								location={location}
								locations={locations}
								setLocations={setLocations}
								handleNavigate={navigateToLocationSpecs}
							/>
						))}
					</table>
				)}
			</div>
		</>
	)
}

export default LocationList
