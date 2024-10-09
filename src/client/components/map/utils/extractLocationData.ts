import { IProject } from '@interfaces/index'

interface LocationData {
	lat: number
	lng: number
	name: string
	type: 'event' | 'hotel' | 'restaurant' | 'activity'
	imageUrl?: string
}

// Extracts location data (coordinates, name, type, imageUrl) from the current project
export const extractLocationData = (project: IProject): LocationData[] => {
	const locations: LocationData[] = []

	// Extracting Event Coordinates
	project.schedule.forEach((day) => {
		day.morningEvents.events.forEach((event) => {
			if (event.coordsActive && event.location.coordinates.length === 2) {
				locations.push({
					lat: event.location.coordinates[0], // Assuming [latitude, longitude] format
					lng: event.location.coordinates[1],
					name: event.name,
					type: 'event',
					imageUrl:
						event.imageContentUrl && event.imageContentUrl.length > 0
							? event.imageContentUrl[0]
							: undefined
				})
			}
		})
		day.afternoonEvents.events.forEach((event) => {
			if (event.coordsActive && event.location.coordinates.length === 2) {
				locations.push({
					lat: event.location.coordinates[0],
					lng: event.location.coordinates[1],
					name: event.name,
					type: 'event',
					imageUrl:
						event.imageContentUrl && event.imageContentUrl.length > 0
							? event.imageContentUrl[0]
							: undefined
				})
			}
		})
	})

	// Extracting Hotel Coordinates
	project.hotels.forEach((hotel) => {
		if (hotel.location.coordinates.length === 2) {
			locations.push({
				lat: hotel.location.coordinates[0],
				lng: hotel.location.coordinates[1],
				name: hotel.name,
				type: 'hotel',
				imageUrl:
					hotel.imageContentUrl && hotel.imageContentUrl.length > 0
						? hotel.imageContentUrl[0]
						: undefined
			})
		}
	})

	// Extracting Restaurant Coordinates
	project.schedule.forEach((day) => {
		day.lunch.restaurants.forEach((restaurant) => {
			if (restaurant.location.coordinates.length === 2) {
				locations.push({
					lat: restaurant.location.coordinates[0],
					lng: restaurant.location.coordinates[1],
					name: restaurant.name,
					type: 'restaurant',
					imageUrl:
						restaurant.imageContentUrl && restaurant.imageContentUrl.length > 0
							? restaurant.imageContentUrl[0]
							: undefined
				})
			}
		})
		day.dinner.restaurants.forEach((restaurant) => {
			if (restaurant.location.coordinates.length === 2) {
				locations.push({
					lat: restaurant.location.coordinates[0],
					lng: restaurant.location.coordinates[1],
					name: restaurant.name,
					type: 'restaurant',
					imageUrl:
						restaurant.imageContentUrl && restaurant.imageContentUrl.length > 0
							? restaurant.imageContentUrl[0]
							: undefined
				})
			}
		})
	})

	// Filtering out invalid coordinates (0, 0)
	return locations.filter(
		(location) => !(location.lat === 0 && location.lng === 0)
	)
}
