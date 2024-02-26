import { useMemo } from 'react'
import { CoordItem, VendorMapLogic } from '../MapLogic'
import { filterUniqueCoordinates } from 'src/helper/mapFunctions'

export const useVendorCoords = (
	showAllVendors: boolean,
	clickedVendor: CoordItem | null
) => {
	const { hotelCoords, centralCoords, scheduleCoords } = VendorMapLogic()

	return useMemo(() => {
		const allVendors =
			showAllVendors || clickedVendor?.distance !== null
				? [centralCoords, hotelCoords, scheduleCoords].flat()
				: [centralCoords, clickedVendor]
		const filteredVendors = allVendors.filter((vendor) => {
			return vendor.coords.lat !== 0 || vendor.coords.lng !== 0
		})

		return filterUniqueCoordinates(filteredVendors)
	}, [
		centralCoords,
		hotelCoords,
		scheduleCoords,
		showAllVendors,
		clickedVendor
	])
}
