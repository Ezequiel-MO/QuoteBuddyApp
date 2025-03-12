// src/screens/quotation/components/map/MapSection.tsx
import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useQuotation } from '../../context/QuotationContext'
import { LoadScript } from '@react-google-maps/api'
import VendorMap from './VendorMap'

// Define the libraries you want to load
const libraries: any = ['places', 'geometry', 'visualization']

const MapSection: React.FC = () => {
	const { toggleMapView, currentProject } = useQuotation()
	const [isLoading, setIsLoading] = useState(true)

	// Get styling information from client company
	const clientCompany = currentProject?.clientCompany?.[0] || {}
	const colorPalette = clientCompany.colorPalette || []
	const primaryColor = colorPalette[0] || '#4F46E5'

	// Load the Google Maps script
	const googleMapsApiKey: string =
		import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

	useEffect(() => {
		// Simulate loading delay
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	return (
		<div className="relative bg-gray-100 dark:bg-gray-750 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden mb-8">
			{/* Header */}
			<div className="absolute top-0 left-0 right-0 z-10 bg-white-0 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-between items-center">
				<h2 className="text-lg font-semibold text-gray-800 dark:text-white-0 flex items-center">
					<Icon icon="mdi:map" className="mr-2" width={20} />
					Destination Map
				</h2>
				<div className="flex items-center space-x-2">
					<button
						onClick={() => toggleMapView(false)}
						className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
					>
						<Icon icon="mdi:close" width={20} />
					</button>
				</div>
			</div>

			{/* Map Container */}
			<div className="h-[500px] pt-10">
				{isLoading ? (
					<div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900">
						<div className="text-center">
							<div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-400 mb-2"></div>
							<p className="text-gray-600 dark:text-gray-400">Loading map...</p>
						</div>
					</div>
				) : (
					<LoadScript
						googleMapsApiKey={googleMapsApiKey}
						libraries={libraries}
						loadingElement={
							<div className="h-full flex items-center justify-center">
								<span className="text-gray-600 dark:text-gray-400">
									Loading map...
								</span>
							</div>
						}
					>
						<VendorMap />
					</LoadScript>
				)}
			</div>
		</div>
	)
}

export default MapSection
