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

/**
 * Determines if coordinates are likely swapped by checking if they would place
 * the point in an ocean or in an unreasonable location
 * @param coordinates - Array of coordinates to check
 * @returns Boolean indicating if coordinates might be swapped
 */
export const detectSwappedCoordinates = (coordinates: number[]): boolean => {
	// Simple heuristic for potentially swapped coordinates
	const lng = coordinates[0]
	const lat = coordinates[1]

	// If treating as [lat, lng] would put the point outside reasonable ranges
	return Math.abs(lng) > 90 // Latitude can't exceed 90
}

/**
 * Creates a fallback coordinate when original coordinates are invalid
 * @param placeName - Name of the place for geocoding (future improvement)
 * @returns Default coordinates (currently Barcelona)
 */
export const getFallbackCoordinates = (
	placeName?: string
): { lat: number; lng: number } => {
	// Future enhancement: geocode the place name
	// For now, return Barcelona coordinates as default
	return { lat: 41.3851, lng: 2.1734 }
}
