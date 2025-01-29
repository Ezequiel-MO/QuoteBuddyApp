import { useMemo } from 'react'
import { CoordItem, VendorMapLogic } from '../MapLogic'
import { filterUniqueCoordinates } from 'src/helper/mapFunctions'

export const useVendorCoords = (
	showAllVendors: boolean,
	clickedVendor: CoordItem | null
) => {
	const { hotelCoords, centralCoords, scheduleCoords } = VendorMapLogic()

	return useMemo(
		() => {
			// Always flatten the array and remove invalid entries
			const allVendors = (
				showAllVendors || clickedVendor?.distance !== null
					? [centralCoords, hotelCoords, scheduleCoords]
					: [centralCoords, clickedVendor]
			)
				.flat()
				// First filter: Remove null/undefined
				.filter((vendor): vendor is CoordItem => !!vendor)
				// Second filter: Validate coordinates
				.filter((vendor) => {
					const lat = vendor.coords.lat
					const lng = vendor.coords.lng
					return (
						typeof lat === 'number' &&
						typeof lng === 'number' &&
						!(lat === 0 && lng === 0)
					)
				})

			return filterUniqueCoordinates(allVendors)
		},
		[
			/* dependencies */
		]
	)
}
