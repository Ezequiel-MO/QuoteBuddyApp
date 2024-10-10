import { useLoadScript } from '@react-google-maps/api'
import { GOOGLE_MAP_LIBRARIES } from './constants'

export const useLoadGoogleMap = () => {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
		libraries: GOOGLE_MAP_LIBRARIES
	})

	return { isLoaded }
}
