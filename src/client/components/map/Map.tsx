import React, { useState, useEffect, useRef, useCallback } from 'react'
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api'
import { Spinner } from '@components/atoms'
import { useLoadGoogleMap } from './useLoadGoogleMap'
import { useCurrentProject } from 'src/hooks'
import { extractLocationData } from './utils/extractLocationData'
import { Icon } from '@iconify/react'

// Define the LocationData interface
interface LocationData {
	lat: number
	lng: number
	name: string
	type: 'event' | 'hotel' | 'restaurant' | 'activity'
	imageUrl?: string
	originalId?: string
}

// Custom notification component for debugging
const MapNotification = ({
	message,
	type = 'info',
	onDismiss
}: {
	message: string
	type?: 'info' | 'warning' | 'error'
	onDismiss: () => void
}) => {
	const bgColor =
		type === 'error'
			? 'bg-red-500'
			: type === 'warning'
			? 'bg-yellow-500'
			: 'bg-blue-500'

	return (
		<div
			className={`${bgColor} text-white p-3 rounded-lg shadow-lg mb-2 flex justify-between items-center`}
		>
			<span>{message}</span>
			<button onClick={onDismiss} className="ml-2 text-white">
				<Icon icon="mdi:close" className="w-5 h-5" />
			</button>
		</div>
	)
}

const Map: React.FC = () => {
	const { currentProject } = useCurrentProject()
	const { isLoaded } = useLoadGoogleMap()
	const mapRef = useRef<google.maps.Map | null>(null)
	const geocoderRef = useRef<google.maps.Geocoder | null>(null)
	const listRef = useRef<HTMLDivElement | null>(null) // Reference to the list container

	const [isMapReady, setIsMapReady] = useState(false)
	const [mapError, setMapError] = useState<string | null>(null)
	const [warnings, setWarnings] = useState<string[]>([])

	const [groupCoordinates, setGroupCoordinates] = useState<{
		lat: number
		lng: number
	} | null>(null)

	const [locations, setLocations] = useState<LocationData[]>([])
	const [selectedLocation, setSelectedLocation] = useState<number | null>(null)
	const [mapCenter, setMapCenter] = useState<{
		lat: number
		lng: number
	} | null>(null)

	// Load locations data when project changes
	useEffect(() => {
		if (currentProject) {
			try {
				// Clear previous warnings
				setWarnings([])

				// Extract location data from the project
				const extractedLocations = extractLocationData(currentProject)

				// Log information about locations found
				console.log(
					`Found ${extractedLocations.length} locations:`,
					extractedLocations.map(
						(l) => `${l.name} (${l.type}) at [${l.lat}, ${l.lng}]`
					)
				)

				// Check if any valid locations were found
				if (extractedLocations.length === 0) {
					setWarnings((prev) => [
						...prev,
						'No valid location data found in this project.'
					])
				}

				setLocations(extractedLocations)
			} catch (error) {
				console.error('Error loading location data:', error)
				setMapError('Failed to load location data. Please try again later.')
			}
		}
	}, [currentProject])

	// Initialize the Geocoder when the map is loaded
	useEffect(() => {
		if (isLoaded && !geocoderRef.current) {
			try {
				geocoderRef.current = new window.google.maps.Geocoder()
				setIsMapReady(true)
			} catch (error) {
				console.error('Error initializing Geocoder:', error)
				setMapError(
					'Failed to initialize Google Maps. Please refresh the page.'
				)
			}
		}
	}, [isLoaded])

	// Geocode the groupLocation when the component mounts
	useEffect(() => {
		if (geocoderRef.current && currentProject?.groupLocation) {
			geocoderRef.current.geocode(
				{ address: currentProject.groupLocation },
				(results, status) => {
					if (status === 'OK' && results && results.length > 0) {
						const { lat, lng } = results[0].geometry.location.toJSON()
						setGroupCoordinates({ lat, lng })
						setMapCenter({ lat, lng })
					} else {
						console.warn(
							`Geocode was not successful for ${currentProject.groupLocation}: ${status}`
						)

						// Add warning message
						setWarnings((prev) => [
							...prev,
							`Could not find location for "${currentProject.groupLocation}". Using default location.`
						])
					}
				}
			)
		}
	}, [currentProject?.groupLocation, isLoaded])

	// Adjust the map's bounds and center once groupCoordinates are obtained
	useEffect(() => {
		if (mapRef.current && locations.length > 0 && groupCoordinates) {
			try {
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

				// If no nearby locations, show a warning
				if (nearbyLocations.length === 0 && locations.length > 0) {
					setWarnings((prev) => [
						...prev,
						'No locations found within 400km of center point.'
					])
				}

				// Extend bounds with nearby locations
				nearbyLocations.forEach((location) => {
					bounds.extend({ lat: location.lat, lng: location.lng })
				})

				// Adjust the map to fit the bounds only if valid bounds
				if (!bounds.isEmpty()) {
					mapRef.current.fitBounds(bounds)
				}
			} catch (error) {
				console.error('Error adjusting map bounds:', error)
			}
		}
	}, [locations, groupCoordinates])

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

	// Handler for clicking on a list item
	const handleListItemClick = (index: number) => {
		setSelectedLocation(index)

		// Optional: Pan the map to the selected marker
		if (mapRef.current && locations[index]) {
			mapRef.current.panTo({
				lat: locations[index].lat,
				lng: locations[index].lng
			})

			// Zoom in slightly to the selected location
			mapRef.current.setZoom(14)
		}
	}

	// Handler for map load
	const handleMapLoad = useCallback((map: google.maps.Map) => {
		mapRef.current = map
		setIsMapReady(true)

		// This will be handled by the useEffect for bounds
	}, [])

	// Dismiss a warning at specific index
	const dismissWarning = (index: number) => {
		setWarnings((prev) => prev.filter((_, i) => i !== index))
	}

	// If Google Maps hasn't loaded yet
	if (!isLoaded) return <Spinner />

	// If there was an error initializing the map (or geocoder failed)
	if (mapError) {
		return (
			<div
				className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
				role="alert"
			>
				<strong className="font-bold">Error!</strong>
				<span className="block sm:inline"> {mapError}</span>
			</div>
		)
	}

	// Default center if groupCoordinates are not available
	const defaultCenter = { lat: 41.3851, lng: 2.1734 } // Barcelona

	// Check if essential google.maps objects are available before rendering map elements
	const mapsApiReady =
		isLoaded &&
		window.google &&
		window.google.maps &&
		window.google.maps.Size &&
		window.google.maps.Point &&
		window.google.maps.SymbolPath

	return (
		<div className="flex flex-col w-full h-full min-h-[600px]">
			{/* Warnings & Notifications */}
			{warnings.length > 0 && (
				<div className="mb-4">
					{warnings.map((warning, index) => (
						<MapNotification
							key={index}
							message={warning}
							type="warning"
							onDismiss={() => dismissWarning(index)}
						/>
					))}
				</div>
			)}

			<div className="flex flex-col md:flex-row w-full h-[600px]">
				{/* Side Menu List */}
				<div
					className="w-full md:w-1/4 h-60 md:h-full overflow-y-auto bg-white-0 text-black-50 p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700"
					ref={listRef}
				>
					<h2 className="text-xl font-bold mb-4">Locations</h2>

					{locations.length === 0 ? (
						<div className="text-gray-500 italic">
							No locations found. Make sure your project includes hotels,
							restaurants, or activities with valid coordinates.
						</div>
					) : (
						<ul>
							{locations.map((location, index) => (
								<li
									key={index}
									className={`flex items-center p-2 mb-2 rounded cursor-pointer hover:bg-gray-100 ${
										selectedLocation === index ? 'bg-gray-200' : ''
									}`}
									onClick={() => handleListItemClick(index)}
									id={`list-item-${index}`}
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
					)}
				</div>

				{/* Map Container */}
				<div className="w-full md:w-3/4 h-full">
					{/* Only render GoogleMap if the API script is loaded */}
					{isLoaded && (
						<GoogleMap
							zoom={10}
							center={mapCenter || defaultCenter}
							mapContainerClassName="w-full h-full"
							options={{
								disableDefaultUI: false,
								zoomControl: true,
								mapTypeControl: true,
								scaleControl: true,
								streetViewControl: false,
								rotateControl: false,
								fullscreenControl: true,
								styles: [
									// Optional: Add custom map styles here
								]
							}}
							onLoad={handleMapLoad}
						>
							{/* Render markers and info window only if the API is fully ready */}
							{mapsApiReady && (
								<>
									{/* Add a marker for the group location */}
									{groupCoordinates && (
										<MarkerF
											position={groupCoordinates}
											icon={{
												path: google.maps.SymbolPath.CIRCLE, // Ensure SymbolPath is available
												scale: 10,
												fillColor: '#ea5933',
												fillOpacity: 1,
												strokeColor: '#ffffff',
												strokeWeight: 2
											}}
											title={currentProject?.groupLocation || 'Center'}
										/>
									)}

									{/* Location markers */}
									{locations.map((location, index) => (
										<MarkerF
											key={index}
											position={{ lat: location.lat, lng: location.lng }}
											onClick={() => {
												setSelectedLocation(index)
												// Scroll to the corresponding list item
												const listItem = document.getElementById(
													`list-item-${index}`
												)
												if (listItem && listRef.current) {
													listItem.scrollIntoView({
														behavior: 'smooth',
														block: 'center'
													})
												}
											}}
											icon={{
												// Custom markers based on type
												url: `data:image/svg+xml;utf8,${encodeURIComponent(`
                          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="${
														location.type === 'hotel'
															? '#e74c3c'
															: location.type === 'restaurant'
															? '#3498db'
															: location.type === 'event'
															? '#2ecc71'
															: '#f39c12' // Fallback color for 'activity' or others
													}" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                          </svg>
                        `)}`,
												scaledSize: new google.maps.Size(36, 36), // Ensure Size is available
												anchor: new google.maps.Point(18, 36) // Ensure Point is available
											}}
										/>
									))}

									{/* InfoWindow for selected location */}
									{selectedLocation !== null && locations[selectedLocation] && (
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
													{locations[selectedLocation].type
														.charAt(0)
														.toUpperCase() +
														locations[selectedLocation].type.slice(1)}
												</p>
												<p className="mt-1 text-sm text-gray-600">
													<span className="font-semibold">Coordinates:</span>{' '}
													{locations[selectedLocation].lat.toFixed(6)},{' '}
													{locations[selectedLocation].lng.toFixed(6)}
												</p>
											</div>
										</InfoWindowF>
									)}
								</>
							)}
						</GoogleMap>
					)}
					{/* Show spinner or message if map is not loaded yet */}
					{!isLoaded && <Spinner />}
				</div>
			</div>

			{/* Map Legend */}
			<div className="mt-4 p-4 bg-white-0 dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
				<h3 className="font-semibold mb-2">Map Legend</h3>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
					<div className="flex items-center">
						<div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
						<span>Hotels</span>
					</div>
					<div className="flex items-center">
						<div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
						<span>Restaurants</span>
					</div>
					<div className="flex items-center">
						<div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
						<span>Events</span>
					</div>
					<div className="flex items-center">
						<div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
						<span>Center Location</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Map
