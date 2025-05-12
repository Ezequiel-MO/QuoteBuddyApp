import { useMemo } from 'react'
import { useCurrentProject } from '../../hooks'
import {
	city_icon,
	event_icon,
	hotel_icon,
	restaurant_icon
} from './icons/icons'

import { getDistanceFromCentralCoords } from 'src/helper/mapFunctions'
import { locations } from '@constants/data/cities'
import { IProject } from '@interfaces/project'
import { transformCoordinates } from '../../client/components/map/utils/coordinateUtils'

export interface Coords {
	lat: number
	lng: number
}

export interface CoordItem {
	coords: Coords
	place: string
	distance: number | null
	icon?: any
	entityId?: string
}

// Moved filterUniqueCoords function definition here
const filterUniqueCoords = (items: CoordItem[]): CoordItem[] => {
	const uniqueItems: CoordItem[] = []
	const seen = new Set<string>()

	items.forEach((item) => {
		if (!item.coords) return

		// Round coordinates to 6 decimal places for comparison
		const roundedLat = parseFloat(item.coords.lat.toFixed(6))
		const roundedLng = parseFloat(item.coords.lng.toFixed(6))
		const key = `${roundedLat},${roundedLng}`

		if (!seen.has(key)) {
			seen.add(key)
			uniqueItems.push(item)
		}
	})

	return uniqueItems
}

export const VendorMapLogic = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { hotels, schedule, groupLocation } = currentProject

	const centralCoords: CoordItem = useMemo(() => {
		// Get central coordinates from the predefined locations or default to Barcelona
		const coords = locations[groupLocation as keyof typeof locations] ||
			locations.Barcelona || [0, 0]

		return {
			place: groupLocation,
			icon: city_icon,
			coords: {
				// locations constant already has [lat, lng] format
				lat: coords[0],
				lng: coords[1]
			},
			distance: 0
		}
	}, [groupLocation])

	const hotelCoords: CoordItem[] = useMemo(() => {
		if (!hotels || !Array.isArray(hotels)) return []

		return hotels
			.map((hotel) => {
				if (!hotel.location || !hotel.location.coordinates) {
					console.warn(`Hotel ${hotel.name} has invalid coordinates`)
					return null
				}

				// Transform from [lng, lat] to {lat, lng}
				const coordsObj = transformCoordinates(hotel.location.coordinates)

				if (!coordsObj) {
					console.warn(
						`Could not transform coordinates for hotel: ${hotel.name}`
					)
					return null
				}

				const distance = getDistanceFromCentralCoords(
					coordsObj.lat,
					coordsObj.lng,
					centralCoords.coords
				)

				return {
					place: hotel.name,
					icon: hotel_icon,
					coords: coordsObj,
					distance,
					entityId: hotel._id
				}
			})
			.filter(Boolean) as CoordItem[] // Filter out null values
	}, [hotels, centralCoords])

	const scheduleCoords = useMemo(() => {
		if (!schedule || !Array.isArray(schedule)) return []

		let coords: CoordItem[] = []

		schedule.forEach((day) => {
			// Process Morning Events
			if (day?.morningEvents?.events) {
				day.morningEvents.events.forEach((event) => {
					if (event?.location?.coordinates && event.coordsActive) {
						const coordsObj = transformCoordinates(event.location.coordinates)

						if (coordsObj) {
							const distance = getDistanceFromCentralCoords(
								coordsObj.lat,
								coordsObj.lng,
								centralCoords.coords
							)

							coords.push({
								place: event.name,
								icon: event_icon,
								coords: coordsObj,
								distance,
								entityId: event._id
							})
						}
					}
				})
			}

			// Process Lunch Restaurants
			if (day?.lunch?.restaurants) {
				day.lunch.restaurants.forEach((restaurant) => {
					if (restaurant?.location?.coordinates) {
						const coordsObj = transformCoordinates(
							restaurant.location.coordinates
						)

						if (coordsObj) {
							const distance = getDistanceFromCentralCoords(
								coordsObj.lat,
								coordsObj.lng,
								centralCoords.coords
							)

							coords.push({
								place: restaurant.name,
								icon: restaurant_icon,
								coords: coordsObj,
								distance,
								entityId: restaurant._id
							})
						}
					}
				})
			}

			// Process Afternoon Events
			if (day?.afternoonEvents?.events) {
				day.afternoonEvents.events.forEach((event) => {
					if (event?.location?.coordinates && event.coordsActive) {
						const coordsObj = transformCoordinates(event.location.coordinates)

						if (coordsObj) {
							const distance = getDistanceFromCentralCoords(
								coordsObj.lat,
								coordsObj.lng,
								centralCoords.coords
							)

							coords.push({
								place: event.name,
								icon: event_icon,
								coords: coordsObj,
								distance,
								entityId: event._id
							})
						}
					}
				})
			}

			// Process Dinner Restaurants
			if (day?.dinner?.restaurants) {
				day.dinner.restaurants.forEach((restaurant) => {
					if (restaurant?.location?.coordinates) {
						const coordsObj = transformCoordinates(
							restaurant.location.coordinates
						)

						if (coordsObj) {
							const distance = getDistanceFromCentralCoords(
								coordsObj.lat,
								coordsObj.lng,
								centralCoords.coords
							)

							coords.push({
								place: restaurant.name,
								icon: restaurant_icon,
								coords: coordsObj,
								distance,
								entityId: restaurant._id
							})
						}
					}
				})
			}
		})

		// Filter out duplicate locations - Now defined above
		return filterUniqueCoords(coords)
	}, [schedule, centralCoords])

	const allCoords = useMemo(() => {
		// Combine all coordinates and filter unique ones
		const combined = [centralCoords, ...hotelCoords, ...scheduleCoords]
		return filterUniqueCoords(combined)
	}, [centralCoords, hotelCoords, scheduleCoords])

	return {
		centralCoords,
		allCoords
	}
}

// Removed filterUniqueCoords function definition from here
