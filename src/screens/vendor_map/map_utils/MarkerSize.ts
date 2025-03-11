/**
 * Base size for SVG marker icons
 */
export const baseSize = 40

/**
 * Calculate marker size based on zoom level
 * @param zoomLevel Current map zoom level
 * @returns Size value for marker
 */
export function calculateMarkerSize(zoomLevel: number): number {
	// Ensure zoom level is valid
	if (typeof zoomLevel !== 'number' || isNaN(zoomLevel)) {
		return baseSize // Return default size if zoom is invalid
	}

	const minSize = 30 // Minimum marker size
	const maxSize = 60 // Maximum marker size
	const minZoom = 5 // Minimum zoom level
	const maxZoom = 20 // Maximum zoom level

	// Clamp zoom level to valid range
	const clampedZoom = Math.max(minZoom, Math.min(maxZoom, zoomLevel))

	// Calculate size based on zoom level
	const zoomRange = maxZoom - minZoom
	const sizeRange = maxSize - minSize
	const zoomFactor = (clampedZoom - minZoom) / zoomRange

	// Apply non-linear scaling for better visual effect
	// (size increases more rapidly at higher zoom levels)
	const scaleFactor = Math.pow(zoomFactor, 1.5)

	// Calculate size with non-linear scaling
	const size = minSize + sizeRange * scaleFactor

	// Return rounded size
	return Math.round(size)
}
