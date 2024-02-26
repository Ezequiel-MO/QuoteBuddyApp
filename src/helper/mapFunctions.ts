import { CoordItem } from '@screens/vendor_map/MapLogic'

function toRadians(degrees: number): number {
	return degrees * (Math.PI / 180)
}

const MAX_DISTANCE = 10

export function getDistanceFromCentralCoords(
	lat: number,
	lng: number,
	centralCoords: { lat: number; lng: number }
) {
	const R = 6371
	const lat1 = toRadians(centralCoords.lat)
	const lat2 = toRadians(lat)
	const dLat = toRadians(lat - centralCoords.lat)
	const dLng = toRadians(lng - centralCoords.lng)

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const distance = R * c

	return distance > MAX_DISTANCE ? null : distance
}

export const filterUniqueCoordinates = (vendors: CoordItem[]) => {
	const uniqueCoordinates = new Set()
	return vendors.filter((vendor) => {
		const key = `${vendor.coords.lat}-${vendor.coords.lng}`
		if (uniqueCoordinates.has(key)) {
			return false
		}
		uniqueCoordinates.add(key)
		return true
	})
}
