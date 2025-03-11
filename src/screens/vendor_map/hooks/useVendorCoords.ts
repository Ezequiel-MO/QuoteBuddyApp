import { useMemo } from 'react'
import { CoordItem, VendorMapLogic } from '../MapLogic'

/**
 * Enhanced function to filter unique coordinates with additional validation
 * @param vendors Array of vendor coordinates
 * @returns Filtered array with unique valid coordinates
 */
export const filterUniqueCoordinates = (vendors: CoordItem[]): CoordItem[] => {
	const seen = new Set<string>()

	return vendors.filter((vendor) => {
		// Validate coordinates
		if (
			!vendor ||
			!vendor.coords ||
			typeof vendor.coords.lat !== 'number' ||
			typeof vendor.coords.lng !== 'number' ||
			isNaN(vendor.coords.lat) ||
			isNaN(vendor.coords.lng) ||
			(vendor.coords.lat === 0 && vendor.coords.lng === 0)
		) {
			return false
		}

		// Round coordinates to 6 decimal places to avoid floating point comparison issues
		const lat = parseFloat(vendor.coords.lat.toFixed(6))
		const lng = parseFloat(vendor.coords.lng.toFixed(6))

		// Create a unique key for the coordinates
		const key = `${lat},${lng}`

		// Check if we've seen these coordinates before
		if (seen.has(key)) {
			return false
		}

		// Add to seen set and include in results
		seen.add(key)
		return true
	})
}

/**
 * Hook to manage vendor coordinates with filtering and validation
 */
export const useVendorCoords = (
	showAllVendors: boolean,
	clickedVendor: CoordItem | null
): CoordItem[] => {
	const { hotelCoords, centralCoords, scheduleCoords } = VendorMapLogic()

	return useMemo(() => {
		// Determine which vendors to include
		const vendorsToInclude =
			showAllVendors || clickedVendor?.distance !== null
				? [centralCoords, ...hotelCoords, ...scheduleCoords]
				: [centralCoords, clickedVendor]

		// Filter out invalid vendors
		const validVendors = vendorsToInclude.filter(
			(vendor): vendor is CoordItem => !!vendor
		)

		// Apply unique coordinates filter
		return filterUniqueCoordinates(validVendors)
	}, [
		showAllVendors,
		clickedVendor,
		centralCoords,
		hotelCoords,
		scheduleCoords
	])
}
