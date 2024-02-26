import React, { useState, useCallback } from 'react'
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api'
import { VendorList } from './VendorList'
import { CoordItem, VendorMapLogic } from './MapLogic'
import './map.css'
import { useMapOptions, useMapZoom, useVendorCoords } from './hooks'
import { calculateMarkerSize, baseSize } from './map_utils/MarkerSize'

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

	const vendors: CoordItem[] = useVendorCoords(showAllVendors, clickedVendor)

	const handleMarkerClick = (vendor: CoordItem) => {
		setActiveInfoWindow(vendor)
	}

	const closeInfoWindow = () => {
		setActiveInfoWindow(null)
	}

	useMapZoom(map, location, vendors)

	const options = useMapOptions(centralCoords)

	const onLoad = useCallback(
		(map: google.maps.Map) => {
			const bounds = new google.maps.LatLngBounds()
			vendors.forEach((vendor) => {
				bounds.extend(
					new google.maps.LatLng(vendor.coords.lat, vendor.coords.lng)
				)
			})
			map.fitBounds(bounds)
			setMap(map)

			const newZoom = map.getZoom()
			if (newZoom !== undefined) {
				setZoom(newZoom)
			}
		},
		[vendors]
	)

	const handleVendorClick = (vendor: CoordItem) => {
		setLocation({
			...vendor,
			place: vendor.place,
			coords: vendor.coords
		})
		setClickedVendor(vendor)
		setActiveInfoWindow(vendor)
		setShowAllVendors(false)
	}

	const handleShowAllVendors = () => {
		setShowAllVendors(true)
		setClickedVendor(null)
	}

	return (
		<div className="flex w-full h-full min-h-[80vh] relative">
			<VendorList
				vendors={vendors}
				setLocation={setLocation}
				onVendorClick={handleVendorClick}
				onShowAllVendors={handleShowAllVendors}
				activeInfoWindow={activeInfoWindow || undefined}
			/>
			<div className="map flex-grow h[97vh]">
				<GoogleMap
					onLoad={onLoad}
					zoom={zoom || 14}
					options={options}
					mapContainerStyle={{
						width: '100%',
						height: '97%'
					}}
				>
					{activeInfoWindow && (
						<InfoWindowF
							position={activeInfoWindow.coords}
							options={{ pixelOffset: new google.maps.Size(0, -20) }}
							onCloseClick={closeInfoWindow}
						>
							<div className="bg-white-50 rounded-lg shadow-md p-4 dark:bg-gray-500">
								<h3 className="text-lg font-semibold mb-2 text-gray-100 dark:text-white">
									{activeInfoWindow.place}
								</h3>
							</div>
						</InfoWindowF>
					)}
					{vendors.map((vendor, index) => (
						<MarkerF
							key={`${vendor.place}-${index}`}
							position={vendor.coords}
							title={vendor.place}
							onLoad={(marker) => {
								const size = calculateMarkerSize(zoom)
								marker.setIcon({
									...marker,
									path: vendor.icon.path,
									fillColor: vendor.icon.fillColor,
									fillOpacity: vendor.icon.fillOpacity,
									strokeWeight: vendor.icon.strokeWeight,
									rotation: vendor.icon.rotation,
									scale: size / baseSize
								})
							}}
							onClick={() => handleMarkerClick(vendor)}
						/>
					))}
				</GoogleMap>
			</div>
		</div>
	)
}
