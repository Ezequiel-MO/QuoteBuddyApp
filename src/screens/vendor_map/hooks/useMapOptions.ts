import { useMemo } from 'react'
import { CoordItem } from '../MapLogic'

export const useMapOptions = (centralCoords: CoordItem) => {
	return useMemo(
		() => ({
			center: centralCoords.coords,
			zoom: 14,
			maxZoom: 20,
			minZoom: 5,
			gestureHandling: 'cooperative', // More modern control for map panning and zooming
			disableDefaultUI: false,
			clickableIcons: false,
			zoomControl: true,
			mapTypeControl: true,
			scaleControl: true,
			rotateControl: false,
			fullscreenControl: true,
			controlSize: 25,
			// Updated styling for a more modern look
			styles: [
				{
					featureType: 'poi',
					elementType: 'labels',
					stylers: [{ visibility: 'off' }] // Hide points of interest labels for cleaner map
				},
				{
					featureType: 'transit',
					elementType: 'labels',
					stylers: [{ visibility: 'off' }] // Hide transit labels for cleaner map
				},
				{
					featureType: 'water',
					elementType: 'geometry',
					stylers: [{ color: '#e9e9e9' }]
				},
				{
					featureType: 'water',
					elementType: 'labels.text.fill',
					stylers: [{ color: '#9e9e9e' }]
				},
				{
					featureType: 'landscape',
					elementType: 'geometry',
					stylers: [{ color: '#f5f5f5' }]
				}
			]
		}),
		[centralCoords]
	)
}
