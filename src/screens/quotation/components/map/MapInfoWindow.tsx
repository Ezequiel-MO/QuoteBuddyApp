// src/screens/quotation/components/map/MapInfoWindow.tsx
import React, { useRef, useEffect } from 'react'

interface MapInfoWindowProps {
	position: google.maps.LatLngLiteral
	content: React.ReactNode
	onClose: () => void
	map: google.maps.Map | null
}

const MapInfoWindow: React.FC<MapInfoWindowProps> = ({
	position,
	content,
	onClose,
	map
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
			'bg-white-50 rounded-lg shadow-md p-4 dark:bg-gray-750'
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

export default MapInfoWindow
