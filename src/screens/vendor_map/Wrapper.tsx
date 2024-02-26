import React from 'react'
import { useLoadScript } from '@react-google-maps/api'

import { VendorMap } from './Map'
import { Spinner } from '@components/atoms'

export const MapWrapper: React.FC = () => {
	const googleMapsApiKey: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
	const { isLoaded } = useLoadScript({
		googleMapsApiKey
	})

	if (!isLoaded) return <Spinner />
	return <VendorMap />
}
