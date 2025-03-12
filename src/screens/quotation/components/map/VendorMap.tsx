// src/screens/quotation/components/map/VendorMap.tsx
import React, { useState, useCallback } from 'react'
import { GoogleMap } from '@react-google-maps/api'
import { useQuotation } from '../../context/QuotationContext'
import { filterUniqueCoordinates } from 'src/screens/vendor_map/hooks/useVendorCoords'
import { useMapOptions } from 'src/screens/vendor_map/hooks/useMapOptions'
import { useMapZoom } from 'src/screens/vendor_map/hooks/useMapZoom'
import LocationsList from './LocationList'
import MapMarker from './MapMarker'
import MapInfoWindow from './MapInfoWindow'

const VendorMap: React.FC = () => {
	const { mapData, selectedVendor, setSelectedVendor } = useQuotation()

	const [map, setMap] = useState<google.maps.Map | null>(null)
	const [zoom, setZoom] = useState<number>(14)
	const [showAllVendors, setShowAllVendors] = useState<boolean>(true)
	const [activeInfoWindow, setActiveInfoWindow] = useState<any | null>(null)

	// Extract the necessary data from the map logic
	const { centralCoords, hotelCoords, scheduleCoords } = mapData

	// Get filtered vendor coordinates
	const vendors = filterUniqueCoordinates(
		showAllVendors
			? [centralCoords, ...hotelCoords, ...scheduleCoords].filter(Boolean)
			: [centralCoords, selectedVendor].filter(Boolean)
	)

	// Get map options
	const options = useMapOptions(centralCoords)

	// Use the location and vendors to set up map zoom
	useMapZoom(map, selectedVendor || centralCoords, vendors)

	// Handle marker click
	const handleMarkerClick = useCallback((vendor: any) => {
		setActiveInfoWindow(vendor)
	}, [])

	// Close info window
	const closeInfoWindow = useCallback(() => {
		setActiveInfoWindow(null)
	}, [])

	// Handle map load
	const onLoad = useCallback((map: google.maps.Map) => {
		setMap(map)

		// Add zoom change listener
		map.addListener('zoom_changed', () => {
			const newZoom = map.getZoom()
			if (newZoom !== undefined) {
				setZoom(newZoom)
			}
		})
	}, [])

	// Handle vendor click from list
	const handleVendorClick = useCallback(
		(vendor: any) => {
			setSelectedVendor(vendor)
			setActiveInfoWindow(vendor)
			setShowAllVendors(false)
		},
		[setSelectedVendor]
	)

	return (
		<div className="flex w-full h-full relative">
			<LocationsList
				vendors={vendors}
				activeInfoWindow={activeInfoWindow}
				onVendorClick={handleVendorClick}
				onShowAllVendors={() => {
					setShowAllVendors(true)
					setSelectedVendor(null)
				}}
			/>

			<div className="map flex-grow h-[470px]">
				<GoogleMap
					onLoad={onLoad}
					options={options}
					mapContainerStyle={{
						width: '100%',
						height: '100%'
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
								<MapMarker
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
						<MapInfoWindow
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

export default VendorMap
