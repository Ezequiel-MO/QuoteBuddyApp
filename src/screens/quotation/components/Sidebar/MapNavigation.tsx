import React from 'react'
import { useQuotation } from '../../context/QuotationContext'
import CollapsibleSection from '../common/CollapsibleSection'
import { Icon } from '@iconify/react'
import { IHotel } from '@interfaces/hotel'
import { IRestaurant } from '@interfaces/restaurant'
import { IEvent } from '@interfaces/event'

interface MapNavigationProps {
	isExpanded: boolean
	onToggle: () => void
	accentColor?: string
}

const MapNavigation: React.FC<MapNavigationProps> = ({
	isExpanded,
	onToggle,
	accentColor = '#4F46E5'
}) => {
	const { mapData, toggleMapView, isMapVisible, setSelectedVendor } =
		useQuotation()

	if (!mapData) return null

	const { centralCoords, hotelCoords, scheduleCoords } = mapData
	const allVendors = [centralCoords, ...hotelCoords, ...scheduleCoords].filter(
		Boolean
	)

	const handleVendorClick = (vendor: any) => {
		if (!isMapVisible) toggleMapView(true)
		setSelectedVendor(vendor)
	}

	return (
		<CollapsibleSection
			title="Map Locations"
			icon="mdi:map-marker"
			isExpanded={isExpanded}
			onToggle={onToggle}
			badge={allVendors.length}
			accentColor={accentColor}
		>
			<div className="space-y-1">
				{!isMapVisible && (
					<button
						onClick={() => toggleMapView(true)}
						className="w-full flex items-center justify-center px-2 py-1 mb-2 text-xs font-medium rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
					>
						<Icon icon="mdi:map" className="mr-1" width={14} />
						Show Map View
					</button>
				)}

				{/* City Center */}
				<button
					onClick={() => handleVendorClick(centralCoords)}
					className="w-full text-left p-1.5 text-xs rounded flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
					<span className="truncate">
						{centralCoords?.place || 'City Center'}
					</span>
				</button>

				{/* Hotels */}
				{hotelCoords.length > 0 && (
					<>
						<div className="text-xs font-medium text-gray-500 dark:text-gray-400 pl-1 pt-2 pb-1">
							Hotels
						</div>
						{hotelCoords.map((hotel: IHotel, index: number) => (
							<button
								key={`hotel-${index}`}
								onClick={() => handleVendorClick(hotel)}
								className="w-full text-left p-1.5 text-xs rounded flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
								<span className="truncate">{hotel.name}</span>
							</button>
						))}
					</>
				)}

				{/* Venues & Activities */}
				{scheduleCoords.length > 0 && (
					<>
						<div className="text-xs font-medium text-gray-500 dark:text-gray-400 pl-1 pt-2 pb-1">
							Venues & Activities
						</div>
						{scheduleCoords.map(
							(venue: IRestaurant | IEvent, index: number) => (
								<button
									key={`venue-${index}`}
									onClick={() => handleVendorClick(venue)}
									className="w-full text-left p-1.5 text-xs rounded flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
								>
									<div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
									<span className="truncate">{venue.name}</span>
								</button>
							)
						)}
					</>
				)}
			</div>
		</CollapsibleSection>
	)
}

export default MapNavigation
