import React from 'react'
import { LoadScript, Libraries } from '@react-google-maps/api'
import { VendorMap } from './Map'
import { Spinner } from '@components/atoms'

// Define the libraries you want to load
const libraries: Libraries = ['places', 'geometry', 'visualization']

export const MapWrapper: React.FC = () => {
	const googleMapsApiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

	return (
		<LoadScript
			googleMapsApiKey={googleMapsApiKey}
			libraries={libraries}
			loadingElement={<Spinner />}
			onError={(error) => {
				console.error('Error loading Google Maps:', error)
			}}
		>
			<VendorMap />
		</LoadScript>
	)
}
