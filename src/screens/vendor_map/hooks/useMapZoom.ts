import { useEffect, useRef } from 'react'
import { CoordItem } from '../MapLogic'

export const useMapZoom = (
	map: google.maps.Map | null,
	location: CoordItem,
	vendors: CoordItem[]
) => {
	// Use a ref to track initial load state
	const isInitialLoadRef = useRef(true)

	useEffect(() => {
		if (!map) return

		// Create a reference array for cleanup
		const listeners: google.maps.MapsEventListener[] = []

		// Wait for the map to be fully initialized
		setTimeout(() => {
			// Create new bounds object
			const newBounds = new google.maps.LatLngBounds()

			// Handle different cases for bounds calculation
			if (location.distance === null) {
				// Add all vendors to bounds
				vendors.forEach((vendor) => {
					if (
						typeof vendor.coords.lat === 'number' &&
						typeof vendor.coords.lng === 'number' &&
						!isNaN(vendor.coords.lat) &&
						!isNaN(vendor.coords.lng)
					) {
						newBounds.extend(vendor.coords)
					}
				})
			} else {
				// Add selected location and nearby vendors
				if (
					typeof location.coords.lat === 'number' &&
					typeof location.coords.lng === 'number' &&
					!isNaN(location.coords.lat) &&
					!isNaN(location.coords.lng)
				) {
					newBounds.extend(location.coords)
				}

				vendors.forEach((vendor) => {
					if (
						vendor.distance !== null &&
						typeof vendor.coords.lat === 'number' &&
						typeof vendor.coords.lng === 'number' &&
						!isNaN(vendor.coords.lat) &&
						!isNaN(vendor.coords.lng)
					) {
						newBounds.extend(vendor.coords)
					}
				})
			}

			// Make sure bounds contains at least one point to avoid invalid bounds error
			if (!newBounds.isEmpty()) {
				// Get current zoom before fitting bounds
				const currentZoom = map.getZoom() || 14

				// If not initial load, handle zoom level adjustment
				if (!isInitialLoadRef.current) {
					map.fitBounds(newBounds, 50) // Add padding of 50px

					// Add listener to adjust zoom after bounds_changed event
					const boundsChangedListener = map.addListener(
						'bounds_changed',
						() => {
							const newZoom = map.getZoom()

							// Only adjust if zoom is different than before
							if (newZoom !== currentZoom) {
								// Remove this listener to avoid infinite loop
								google.maps.event.removeListener(boundsChangedListener)

								// Apply optimal zoom based on context
								if (vendors.length <= 2) {
									// For single points or very close points, don't zoom in too much
									map.setZoom(Math.min(15, newZoom || 14))
								} else {
									// For multiple points, ensure we can see context
									const optimalZoom = Math.min(
										currentZoom + 1,
										newZoom || 14,
										16
									)
									map.setZoom(optimalZoom)
								}
							}
						}
					)

					listeners.push(boundsChangedListener)
				} else {
					// For initial load, just fit bounds
					map.fitBounds(newBounds)
					isInitialLoadRef.current = false
				}
			}
		}, 100) // Small delay to ensure map is ready

		// Cleanup function to remove all listeners
		return () => {
			listeners.forEach((listener) => {
				google.maps.event.removeListener(listener)
			})
		}
	}, [map, location, vendors])
}
