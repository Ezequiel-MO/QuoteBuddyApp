import { useMemo } from 'react'
import { useCurrentProject } from '../../hooks'
import {
	city_icon,
	event_icon,
	hotel_icon,
	restaurant_icon
} from './icons/icons'
import { IProject } from '../../interfaces'
import { getDistanceFromCentralCoords } from 'src/helper/mapFunctions'
import { locations } from 'src/constants/cities'

export interface Coords {
	lat: number
	lng: number
}

export interface CoordItem {
	coords: Coords
	place: string
	distance: number | null
	icon?: any
}

export const VendorMapLogic = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { hotels, schedule, groupLocation } = currentProject

	const centralCoords: CoordItem = useMemo(() => {
		const coords =
			groupLocation in locations
				? locations[groupLocation]
				: locations.Barcelona

		return {
			place: groupLocation,
			icon: city_icon,
			coords: {
				lat: coords[0],
				lng: coords[1]
			},
			distance: 0
		}
	}, [groupLocation])

	const hotelCoords: CoordItem[] = useMemo(() => {
		return (
			hotels?.map((hotel) => {
				const distance = getDistanceFromCentralCoords(
					hotel.location.coordinates[0],
					hotel.location.coordinates[1],
					centralCoords.coords
				)
				return {
					place: hotel.name,
					icon: hotel_icon,
					coords: {
						lat: hotel.location.coordinates[0],
						lng: hotel.location.coordinates[1]
					},
					distance
				}
			}) || []
		)
	}, [hotels, centralCoords])

	const scheduleCoords = useMemo(() => {
		let coords: CoordItem[] = []
		schedule?.forEach((day) => {
			day.morningEvents?.events?.forEach((event) => {
				if (
					event.location &&
					event.location.coordinates &&
					event.coordsActive
				) {
					const distance = getDistanceFromCentralCoords(
						event.location.coordinates[0],
						event.location.coordinates[1],
						centralCoords.coords
					)
					coords.push({
						place: event.name,
						icon: event_icon,
						coords: {
							lat: event.location.coordinates[0],
							lng: event.location.coordinates[1]
						},
						distance
					})
				}
			})

			day.lunch?.restaurants?.forEach((restaurant) => {
				if (restaurant.location && restaurant.location.coordinates) {
					const distance = getDistanceFromCentralCoords(
						restaurant.location.coordinates[0],
						restaurant.location.coordinates[1],
						centralCoords.coords
					)
					coords.push({
						place: restaurant.name,
						icon: restaurant_icon,
						coords: {
							lat: restaurant.location.coordinates[0],
							lng: restaurant.location.coordinates[1]
						},
						distance
					})
				}
			})

			day.afternoonEvents?.events?.forEach((event) => {
				if (
					event.location &&
					event.location.coordinates &&
					event.coordsActive
				) {
					const distance = getDistanceFromCentralCoords(
						event.location.coordinates[0],
						event.location.coordinates[1],
						centralCoords.coords
					)
					coords.push({
						place: event.name,
						icon: event_icon,
						coords: {
							lat: event.location.coordinates[0],
							lng: event.location.coordinates[1]
						},
						distance
					})
				}
			})

			day.dinner?.restaurants?.forEach((restaurant) => {
				if (restaurant.location && restaurant.location.coordinates) {
					const distance = getDistanceFromCentralCoords(
						restaurant.location.coordinates[0],
						restaurant.location.coordinates[1],
						centralCoords.coords
					)
					coords.push({
						place: restaurant.name,
						icon: restaurant_icon,
						coords: {
							lat: restaurant.location.coordinates[0],
							lng: restaurant.location.coordinates[1]
						},
						distance
					})
				}
			})
		})

		return coords
	}, [schedule, centralCoords])

	return {
		centralCoords,
		hotelCoords,
		scheduleCoords
	}
}
