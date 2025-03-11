import React, { useState, useCallback, useRef, useEffect } from 'react'
import { GoogleMap } from '@react-google-maps/api'
import { VendorList } from './VendorList'
import { CoordItem, VendorMapLogic } from './MapLogic'
import { useMapOptions } from './hooks/useMapOptions'
import { useMapZoom } from './hooks/useMapZoom'
import { useVendorCoords } from './hooks/useVendorCoords'
import { calculateMarkerSize } from './map_utils/MarkerSize'
import './map.css'

// Custom Advanced Marker component
const AdvancedMarker = ({
	position,
	title,
	icon,
	zoomLevel,
	onClick,
	map
}: {
	position: google.maps.LatLngLiteral
	title: string
	icon: any
	zoomLevel: number
	onClick: () => void
	map: google.maps.Map | null
}) => {
	const markerRef = useRef<any>(null)

	// Create and update the marker when dependencies change
	useEffect(() => {
		if (!map || !window.google || !window.google.maps) return

		const createMarker = async () => {
			try {
				// Clean up previous marker
				if (markerRef.current) {
					markerRef.current.map = null
				}

				// Import the marker library
				const { AdvancedMarkerElement } = (await google.maps.importLibrary(
					'marker'
				)) as any

				// Calculate the size based on zoom
				const size = calculateMarkerSize(zoomLevel)

				// Create a pin element with the SVG icon
				const pinBackground = {
					fill: '#FFFFFF',
					stroke: icon.fillColor,
					strokeWidth: 2
				}

				// Create a marker view for the SVG path
				const svg = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'svg'
				)
				svg.setAttribute('width', `${size}px`)
				svg.setAttribute('height', `${size}px`)
				svg.setAttribute('viewBox', '0 0 24 24')
				svg.setAttribute('fill', icon.fillColor)

				const path = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'path'
				)
				path.setAttribute('d', icon.path)
				svg.appendChild(path)

				// Create a div for the marker content
				const div = document.createElement('div')
				div.className = 'custom-marker'
				div.style.cursor = 'pointer'
				div.appendChild(svg)

				// Create the advanced marker
				const marker = new AdvancedMarkerElement({
					position,
					map,
					title,
					content: div
				})

				// Add click handler
				marker.addListener('click', onClick)

				// Store the marker reference
				markerRef.current = marker
			} catch (error) {
				console.error('Error creating advanced marker:', error)
				// Fallback to classic marker if advanced marker fails
				fallbackToClassicMarker()
			}
		}

		const fallbackToClassicMarker = () => {
			if (!map || !window.google) return

			// Clean up previous marker
			if (markerRef.current) {
				markerRef.current.setMap(null)
			}

			// Create a classic marker as fallback
			const size = calculateMarkerSize(zoomLevel)
			const marker = new google.maps.Marker({
				position,
				map,
				title,
				icon: {
					path: icon.path,
					fillColor: icon.fillColor,
					fillOpacity: icon.fillOpacity,
					strokeWeight: icon.strokeWeight,
					scale: size / 40,
					anchor: new google.maps.Point(12, 24)
				}
			})

			// Add click handler
			marker.addListener('click', onClick)

			// Store reference
			markerRef.current = marker
		}

		createMarker()

		// Clean up function
		return () => {
			if (markerRef.current) {
				markerRef.current.map = null
			}
		}
	}, [map, position, title, icon, zoomLevel, onClick])

	return null // This component doesn't render anything
}

// Custom Info Window component
const CustomInfoWindow = ({
	position,
	content,
	onClose,
	map
}: {
	position: google.maps.LatLngLiteral
	content: React.ReactNode
	onClose: () => void
	map: google.maps.Map | null
}) => {
	const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)

	useEffect(() => {
		if (!map || !window.google) return

		// Clean up previous info window
		if (infoWindowRef.current) {
			infoWindowRef.current.close()
		}

		// Create DOM element for content
		const contentDiv = document.createElement('div')
		contentDiv.className =
			'bg-white-50 rounded-lg shadow-md p-4 dark:bg-gray-500'
		contentDiv.innerHTML = `
      <div class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
        ${typeof content === 'string' ? content : ''}
      </div>
    `

		// Create the info window
		const infoWindow = new google.maps.InfoWindow({
			content: contentDiv,
			position,
			pixelOffset: new google.maps.Size(0, -20)
		})

		// Open the info window
		infoWindow.open(map)

		// Add close listener
		infoWindow.addListener('closeclick', onClose)

		// Store reference
		infoWindowRef.current = infoWindow

		return () => {
			if (infoWindowRef.current) {
				infoWindowRef.current.close()
			}
		}
	}, [map, position, content, onClose])

	return null // This component doesn't render anything
}

export const VendorMap: React.FC = () => {
	const { centralCoords } = VendorMapLogic()

	const [zoom, setZoom] = useState<number>(14)
	const [map, setMap] = useState<google.maps.Map | null>(null)
	const [location, setLocation] = useState<CoordItem>(centralCoords)
	const [showAllVendors, setShowAllVendors] = useState<boolean>(true)
	const [clickedVendor, setClickedVendor] = useState<CoordItem | null>(null)
	const [activeInfoWindow, setActiveInfoWindow] = useState<CoordItem | null>(
		null
	)

	// Get filtered vendor coordinates
	const vendors: CoordItem[] = useVendorCoords(showAllVendors, clickedVendor)

	// Get map options
	const options = useMapOptions(centralCoords)

	// Apply zoom behavior
	useMapZoom(map, location, vendors)

	// Handle marker click
	const handleMarkerClick = useCallback((vendor: CoordItem) => {
		setActiveInfoWindow(vendor)
	}, [])

	// Close info window
	const closeInfoWindow = useCallback(() => {
		setActiveInfoWindow(null)
	}, [])

	// Handle map load
	const onLoad = useCallback(
		(map: google.maps.Map) => {
			setMap(map)

			// Fit bounds to show all markers
			const bounds = new google.maps.LatLngBounds()
			vendors.forEach((vendor) => {
				if (
					typeof vendor.coords.lat === 'number' &&
					typeof vendor.coords.lng === 'number' &&
					!isNaN(vendor.coords.lat) &&
					!isNaN(vendor.coords.lng)
				) {
					bounds.extend(vendor.coords)
				}
			})

			if (!bounds.isEmpty()) {
				map.fitBounds(bounds)
			}
		},
		[vendors]
	)

	// Handle zoom listener separately with useEffect
	useEffect(() => {
		if (!map) return

		// Add zoom change listener
		const zoomListener = map.addListener('zoom_changed', () => {
			const newZoom = map.getZoom()
			if (newZoom !== undefined) {
				setZoom(newZoom)
			}
		})

		// Return cleanup function
		return () => {
			google.maps.event.removeListener(zoomListener)
		}
	}, [map])

	// Handle vendor click from list
	const handleVendorClick = useCallback((vendor: CoordItem) => {
		setLocation({
			...vendor,
			place: vendor.place,
			coords: vendor.coords
		})
		setClickedVendor(vendor)
		setActiveInfoWindow(vendor)
		setShowAllVendors(false)
	}, [])

	// Show all vendors
	const handleShowAllVendors = useCallback(() => {
		setShowAllVendors(true)
		setClickedVendor(null)
	}, [])

	return (
		<div className="flex w-full h-full min-h-[80vh] relative">
			<VendorList
				vendors={vendors}
				setLocation={setLocation}
				onVendorClick={handleVendorClick}
				onShowAllVendors={handleShowAllVendors}
				activeInfoWindow={activeInfoWindow || undefined}
			/>

			<div className="map flex-grow h-[97vh]">
				<GoogleMap
					onLoad={onLoad}
					options={options}
					mapContainerStyle={{
						width: '100%',
						height: '97%'
					}}
				>
					{map &&
						vendors.map((vendor, index) => {
							// Skip invalid vendors
							if (
								typeof vendor.coords.lat !== 'number' ||
								typeof vendor.coords.lng !== 'number' ||
								isNaN(vendor.coords.lat) ||
								isNaN(vendor.coords.lng)
							) {
								return null
							}

							return (
								<AdvancedMarker
									key={`${vendor.place}-${index}`}
									position={vendor.coords}
									title={vendor.place}
									icon={vendor.icon}
									zoomLevel={zoom}
									onClick={() => handleMarkerClick(vendor)}
									map={map}
								/>
							)
						})}

					{/* Render active info window */}
					{map && activeInfoWindow && (
						<CustomInfoWindow
							position={activeInfoWindow.coords}
							content={activeInfoWindow.place}
							onClose={closeInfoWindow}
							map={map}
						/>
					)}
				</GoogleMap>
			</div>
		</div>
	)
}
