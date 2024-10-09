import React, { useEffect, useRef, useState } from 'react'
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api'
import { Spinner } from '@components/atoms'
import { useLoadGoogleMap } from './useLoadGoogleMap'
import { useCurrentProject } from 'src/hooks'
import { extractLocationData } from './utils/extractLocationData'
import { Icon } from '@iconify/react'

// Define the LocationData interface here
interface LocationData {
	lat: number
	lng: number
	name: string
	type: 'event' | 'hotel' | 'restaurant' | 'activity'
	imageUrl?: string
}

const Map: React.FC = () => {
	const { currentProject } = useCurrentProject()
	const { isLoaded } = useLoadGoogleMap()
	const mapRef = useRef<google.maps.Map | null>(null)
	const geocoderRef = useRef<google.maps.Geocoder | null>(null)
	const listRef = useRef<HTMLDivElement | null>(null) // Reference to the list container
	const [groupCoordinates, setGroupCoordinates] = useState<{
		lat: number
		lng: number
	} | null>(null)
	const locations: LocationData[] = extractLocationData(currentProject)
	const [selectedLocation, setSelectedLocation] = useState<number | null>(null)

	// Initialize the Geocoder when the map is loaded
	useEffect(() => {
		if (isLoaded && !geocoderRef.current) {
			geocoderRef.current = new window.google.maps.Geocoder()
		}
	}, [isLoaded])

	// Geocode the groupLocation when the component mounts
	useEffect(() => {
		if (geocoderRef.current && currentProject.groupLocation) {
			geocoderRef.current.geocode(
				{ address: currentProject.groupLocation },
				(results, status) => {
					if (status === 'OK' && results && results.length > 0) {
						const { lat, lng } = results[0].geometry.location.toJSON()
						setGroupCoordinates({ lat, lng })
					} else {
						console.error(
							'Geocode was not successful for the following reason:',
							status
						)
						// Handle the error as needed
					}
				}
			)
		}
	}, [currentProject.groupLocation, isLoaded])

	// Adjust the map's bounds and center once groupCoordinates are obtained
	useEffect(() => {
		if (mapRef.current && locations.length > 0 && groupCoordinates) {
			const bounds = new google.maps.LatLngBounds()

			// Include the groupCoordinates in bounds
			bounds.extend(groupCoordinates)

			// Filter locations within 400 km of the groupCoordinates
			const nearbyLocations = locations.filter((location) => {
				const distance = getDistanceFromLatLonInKm(
					groupCoordinates.lat,
					groupCoordinates.lng,
					location.lat,
					location.lng
				)
				return distance <= 400 // Adjust distance as needed
			})

			// Extend bounds with nearby locations
			nearbyLocations.forEach((location) => {
				bounds.extend({ lat: location.lat, lng: location.lng })
			})

			// Adjust the map to fit the bounds
			mapRef.current.fitBounds(bounds)
		}
	}, [locations, groupCoordinates])

	if (!isLoaded) return <Spinner />

	// Map location types to Iconify icon names
	const getIconName = (type: string) => {
		switch (type) {
			case 'hotel':
				return 'mdi:hotel'
			case 'restaurant':
				return 'mdi:silverware-fork-knife'
			case 'event':
				return 'mdi:calendar-star'
			case 'activity':
				return 'mdi:run-fast'
			default:
				return 'mdi:map-marker'
		}
	}

	// Function to calculate distance between two coordinates in km
	const getDistanceFromLatLonInKm = (
		lat1: number,
		lon1: number,
		lat2: number,
		lon2: number
	): number => {
		const R = 6371 // Radius of the earth in km
		const dLat = deg2rad(lat2 - lat1) // deg2rad below
		const dLon = deg2rad(lon2 - lon1)
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) *
				Math.cos(deg2rad(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2)
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
		const d = R * c // Distance in km
		return d
	}

	const deg2rad = (deg: number): number => {
		return deg * (Math.PI / 180)
	}

	// Custom icon size
	const iconSize = 40

	// Default center if groupCoordinates are not available
	const defaultCenter = { lat: 41.3851, lng: 2.1734 } // Barcelona

	// Handler for clicking on a list item
	const handleListItemClick = (index: number) => {
		setSelectedLocation(index)

		// Optional: Pan the map to the selected marker
		if (mapRef.current) {
			mapRef.current.panTo({
				lat: locations[index].lat,
				lng: locations[index].lng
			})
		}
	}

	return (
		<div className="flex flex-row w-full h-[600px]">
			{/* Side Menu List */}
			<div
				className="w-1/4 h-full overflow-y-auto bg-white-0 text-black-50 p-4"
				ref={listRef} // Reference to the list container
			>
				<h2 className="text-xl font-bold mb-4">Locations</h2>
				<ul>
					{locations.map((location, index) => (
						<li
							key={index}
							className={`flex items-center p-2 mb-2 rounded cursor-pointer hover:bg-gray-100 ${
								selectedLocation === index ? 'bg-gray-200' : ''
							}`}
							onClick={() => handleListItemClick(index)}
							id={`list-item-${index}`} // For scrolling into view
						>
							<Icon
								icon={getIconName(location.type)}
								className="text-orange-500 text-2xl mr-3"
							/>
							<div>
								<p className="font-semibold">{location.name}</p>
								<p className="text-sm text-gray-500 capitalize">
									{location.type}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>

			{/* Map Container */}
			<div className="w-3/4 h-full">
				<GoogleMap
					zoom={10}
					center={groupCoordinates || defaultCenter}
					mapContainerClassName="w-full h-full"
					options={{
						disableDefaultUI: true,
						zoomControl: true,
						styles: [
							// Optional: Add custom map styles here for a sleek look
						]
					}}
					onLoad={(map) => {
						mapRef.current = map
					}}
				>
					{locations.map((location, index) => (
						<MarkerF
							key={index}
							position={{ lat: location.lat, lng: location.lng }}
							onClick={() => {
								setSelectedLocation(index)
								// Scroll to the corresponding list item
								const listItem = document.getElementById(`list-item-${index}`)
								if (listItem && listRef.current) {
									const listItemTop = listItem.offsetTop
									const listItemHeight = listItem.offsetHeight
									const listHeight = listRef.current.offsetHeight
									const scrollTop =
										listItemTop - listHeight / 2 + listItemHeight / 2
									listRef.current.scrollTo({
										top: scrollTop,
										behavior: 'smooth'
									})
								}
							}}
						/>
					))}
					{selectedLocation !== null && (
						<InfoWindowF
							position={{
								lat: locations[selectedLocation].lat,
								lng: locations[selectedLocation].lng
							}}
							onCloseClick={() => setSelectedLocation(null)}
						>
							<div className="max-w-xs p-4 bg-white-0 text-black-50 rounded-lg shadow-lg">
								{/* Display the image if available */}
								{locations[selectedLocation].imageUrl && (
									<img
										src={locations[selectedLocation].imageUrl}
										alt={locations[selectedLocation].name}
										className="w-full h-32 object-cover rounded mb-2"
									/>
								)}
								<div className="flex items-center">
									<Icon
										icon={getIconName(locations[selectedLocation].type)}
										className="text-orange-500 text-3xl mr-3"
									/>
									<h3 className="text-xl font-bold text-gray-800">
										{locations[selectedLocation].name}
									</h3>
								</div>
								<p className="mt-2 text-sm text-gray-600">
									<span className="font-semibold">Type:</span>{' '}
									{locations[selectedLocation].type.charAt(0).toUpperCase() +
										locations[selectedLocation].type.slice(1)}
								</p>
								{/* Add more details or interactive elements here */}
							</div>
						</InfoWindowF>
					)}
				</GoogleMap>
			</div>
		</div>
	)
}

export default Map
