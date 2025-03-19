import { IProject } from '@interfaces/project'
import { transformCoordinates } from './coordinateUtils'

interface LocationData {
	lat: number
	lng: number
	name: string
	type: 'event' | 'hotel' | 'restaurant' | 'activity'
	imageUrl?: string
	originalId?: string
}

// Extracts location data (coordinates, name, type, imageUrl) from the current project
export const extractLocationData = (project: IProject): LocationData[] => {
	const locations: LocationData[] = []

	if (!project) return locations

	try {
		// Extracting Event Coordinates
		project.schedule.forEach((day) => {
			if (day?.morningEvents?.events) {
				day.morningEvents.events.forEach((event) => {
					if (event?.coordsActive && event?.location?.coordinates) {
						const coords = transformCoordinates(event.location.coordinates)

						if (coords) {
							locations.push({
								...coords,
								name: event.name,
								type: 'event',
								imageUrl:
									event.imageContentUrl && event.imageContentUrl.length > 0
										? event.imageContentUrl[0]
										: undefined,
								originalId: event._id
							})
						}
					}
				})
			}

			if (day?.afternoonEvents?.events) {
				day.afternoonEvents.events.forEach((event) => {
					if (event?.coordsActive && event?.location?.coordinates) {
						const coords = transformCoordinates(event.location.coordinates)

						if (coords) {
							locations.push({
								...coords,
								name: event.name,
								type: 'event',
								imageUrl:
									event.imageContentUrl && event.imageContentUrl.length > 0
										? event.imageContentUrl[0]
										: undefined,
								originalId: event._id
							})
						}
					}
				})
			}
		})

		// Extracting Hotel Coordinates
		if (project.hotels) {
			project.hotels.forEach((hotel) => {
				if (hotel?.location?.coordinates) {
					const coords = transformCoordinates(hotel.location.coordinates)

					if (coords) {
						locations.push({
							...coords,
							name: hotel.name,
							type: 'hotel',
							imageUrl:
								hotel.imageContentUrl && hotel.imageContentUrl.length > 0
									? hotel.imageContentUrl[0]
									: undefined,
							originalId: hotel._id
						})
					}
				}
			})
		}

		// Extracting Restaurant Coordinates
		project.schedule.forEach((day) => {
			if (day?.lunch?.restaurants) {
				day.lunch.restaurants.forEach((restaurant) => {
					if (restaurant?.location?.coordinates) {
						const coords = transformCoordinates(restaurant.location.coordinates)

						if (coords) {
							locations.push({
								...coords,
								name: restaurant.name,
								type: 'restaurant',
								imageUrl:
									restaurant.imageContentUrl &&
									restaurant.imageContentUrl.length > 0
										? restaurant.imageContentUrl[0]
										: undefined,
								originalId: restaurant._id
							})
						}
					}
				})
			}

			if (day?.dinner?.restaurants) {
				day.dinner.restaurants.forEach((restaurant) => {
					if (restaurant?.location?.coordinates) {
						const coords = transformCoordinates(restaurant.location.coordinates)

						if (coords) {
							locations.push({
								...coords,
								name: restaurant.name,
								type: 'restaurant',
								imageUrl:
									restaurant.imageContentUrl &&
									restaurant.imageContentUrl.length > 0
										? restaurant.imageContentUrl[0]
										: undefined,
								originalId: restaurant._id
							})
						}
					}
				})
			}
		})
	} catch (error) {
		console.error('Error extracting location data:', error)
	}

	// Filter out duplicate locations based on coordinates (with small tolerance)
	const uniqueLocations = filterUniqueLocations(locations)

	// Filter out invalid coordinates (0, 0)
	return uniqueLocations.filter(
		(location) =>
			!(Math.abs(location.lat) < 0.001 && Math.abs(location.lng) < 0.001)
	)
}

/**
 * Filters locations to remove duplicates with nearly identical coordinates
 */
function filterUniqueLocations(
	locations: LocationData[],
	tolerance = 0.0001
): LocationData[] {
	const uniqueLocations: LocationData[] = []
	const seen = new Set<string>()

	locations.forEach((location) => {
		// Round coordinates to remove minor differences
		const roundedLat = Math.round(location.lat / tolerance) * tolerance
		const roundedLng = Math.round(location.lng / tolerance) * tolerance

		// Create a unique key for these coordinates
		const key = `${roundedLat},${roundedLng}`

		if (!seen.has(key)) {
			seen.add(key)
			uniqueLocations.push(location)
		}
	})

	return uniqueLocations
}
