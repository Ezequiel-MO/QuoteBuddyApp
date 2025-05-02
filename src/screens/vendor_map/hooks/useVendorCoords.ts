import { useMemo } from 'react'
import { CoordItem } from '../MapLogic' // Removed VendorMapLogic import

/**
 * Enhanced function to filter unique coordinates with additional validation
 * @param vendors Array of vendor coordinates
 * @returns Filtered array with unique valid coordinates
 */
export const filterUniqueCoordinates = (vendors: CoordItem[]): CoordItem[] => {
	const seen = new Set<string>()
	const validVendors: CoordItem[] = []

	for (const vendor of vendors) {
		// Skip null/undefined vendors
		if (!vendor) continue

		// Skip vendors with invalid coordinate objects
		if (
			!vendor.coords ||
			typeof vendor.coords.lat !== 'number' ||
			typeof vendor.coords.lng !== 'number' ||
			isNaN(vendor.coords.lat) ||
			isNaN(vendor.coords.lng)
		) {
			continue
		}

		// Skip coordinates at exactly 0,0 (common placeholder/error value)
		if (vendor.coords.lat === 0 && vendor.coords.lng === 0) {
			continue
		}

		// Check that coordinates are within valid ranges
		if (
			vendor.coords.lat < -90 ||
			vendor.coords.lat > 90 ||
			vendor.coords.lng < -180 ||
			vendor.coords.lng > 180
		) {
			console.warn('Invalid coordinate range detected:', vendor)
			continue
		}

		// Round coordinates to 6 decimal places to avoid floating point comparison issues
		const lat = parseFloat(vendor.coords.lat.toFixed(6))
		const lng = parseFloat(vendor.coords.lng.toFixed(6))

		// Create a unique key for the coordinates
		const key = `${lat},${lng}`

		// Check if we've seen these coordinates before
		if (seen.has(key)) {
			continue
		}

		// Add to seen set and include in results
		seen.add(key)
		validVendors.push({
			...vendor,
			coords: { lat, lng } // Use the rounded coordinates
		})
	}

	return validVendors
}

/**
 * Hook to manage vendor coordinates with filtering and validation
 */
export const useVendorCoords = (
	showAllVendors: boolean,
	clickedVendor: CoordItem | null,
	// Accept coordinate data as parameters
	centralCoords: CoordItem | undefined,
	hotelCoords: CoordItem[],
	scheduleCoords: CoordItem[]
): CoordItem[] => {
	// Removed the VendorMapLogic() call from here

	return useMemo(() => {
		// Ensure centralCoords exists before proceeding
		if (!centralCoords) {
			console.error('Error in useVendorCoords: centralCoords is missing.')
			return [] // Return empty array if centralCoords is not available
		}
		try {
			// Log what we're working with
			console.debug('Vendor Coords - Central:', centralCoords)
			console.debug('Vendor Coords - Hotels:', hotelCoords.length)
			console.debug('Vendor Coords - Schedule:', scheduleCoords.length)

			// Determine which vendors to include
			const vendorsToInclude =
				showAllVendors || clickedVendor?.distance !== null
					? [centralCoords, ...hotelCoords, ...scheduleCoords]
					: ([centralCoords, clickedVendor].filter(Boolean) as CoordItem[]) // Added type assertion

			// Apply unique coordinates filter
			const uniqueVendors = filterUniqueCoordinates(vendorsToInclude)

			console.debug(
				`Filtered ${vendorsToInclude.length} vendors to ${uniqueVendors.length} unique vendors`
			)

			return uniqueVendors
		} catch (error) {
			console.error('Error in useVendorCoords:', error)
			// Return at least the central coords in case of error
			return [centralCoords].filter(Boolean) as CoordItem[] // Added type assertion
		}
	}, [
		showAllVendors,
		clickedVendor,
		centralCoords,
		hotelCoords,
		scheduleCoords
	])
}
