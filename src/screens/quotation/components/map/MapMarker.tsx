// src/screens/quotation/components/map/MapMarker.tsx
import React, { useRef, useEffect } from 'react'

interface MapMarkerProps {
	position: google.maps.LatLngLiteral
	title: string
	icon: any
	zoomLevel: number
	onClick: () => void
	map: google.maps.Map | null
}

const MapMarker: React.FC<MapMarkerProps> = ({
	position,
	title,
	icon,
	zoomLevel,
	onClick,
	map
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

				// Try to create an advanced marker
				try {
					const { AdvancedMarkerElement } = (await google.maps.importLibrary(
						'marker'
					)) as any

					// Calculate size based on zoom
					const size = Math.max(20, Math.min(40, zoomLevel * 1.5))

					// Create an SVG for the marker
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
					// Fallback to classic marker
					fallbackToClassicMarker()
				}
			} catch (error) {
				console.error('Error creating marker:', error)
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
			const marker = new google.maps.Marker({
				position,
				map,
				title,
				icon: {
					path: icon.path,
					fillColor: icon.fillColor,
					fillOpacity: icon.fillOpacity,
					strokeWeight: icon.strokeWeight,
					scale: zoomLevel / 20,
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

export default MapMarker
