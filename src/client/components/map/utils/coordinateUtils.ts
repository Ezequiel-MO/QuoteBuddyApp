/**
 * Utility functions for handling coordinate transformations
 *
 * In GeoJSON and many geospatial systems, coordinates are stored as [longitude, latitude]
 * However, Google Maps and many mapping libraries expect {lat, lng} objects
 */

/**
 * Transforms a coordinate array from [longitude, latitude] to a {lat, lng} object
 * @param coordinates - Array of coordinates in [longitude, latitude] format
 * @returns Object with lat and lng properties
 */
export const transformCoordinates = (
	coordinates: number[] | undefined
): { lat: number; lng: number } | null => {
	// Return null for invalid coordinates
	if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
		return null
	}

	// Check if values are valid numbers
	const longitude = coordinates[0]
	const latitude = coordinates[1]

	if (
		typeof longitude !== 'number' ||
		typeof latitude !== 'number' ||
		isNaN(longitude) ||
		isNaN(latitude)
	) {
		return null
	}

	// Validate coordinate ranges
	// Longitude: -180 to 180, Latitude: -90 to 90
	if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
		console.warn('Invalid coordinate values detected:', coordinates)
		return null
	}

	return {
		lat: latitude, // Index 1 is latitude
		lng: longitude // Index 0 is longitude
	}
}
