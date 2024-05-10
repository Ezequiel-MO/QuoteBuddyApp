import { IProject } from '@interfaces/project'

interface Vendor {
	name: string
	type: string
	id: string
}

export const getVendorsFromProject = (project: IProject): Vendor[] => {
	if (!project) return []

	const { hotels, schedule } = project

	const hotelVendors: Vendor[] =
		hotels?.map((hotel) => ({
			name: hotel.name,
			type: 'hotel',
			id: hotel._id
		})) ?? []

	const scheduleVendors: Vendor[] =
		schedule?.flatMap((day) => {
			const morningEventsVendors =
				day.morningEvents.events?.map((event) => ({
					name: event.name,
					type: 'activity',
					id: event._id
				})) ?? []

			const lunchVendors =
				day.lunch.restaurants?.map((restaurant) => ({
					name: restaurant.name,
					type: 'restaurant',
					id: restaurant._id
				})) ?? []

			const afternoonEventsVendors =
				day.afternoonEvents.events?.map((event) => ({
					name: event.name,
					type: 'activity',
					id: event._id
				})) ?? []

			const dinnerVendors =
				day.dinner.restaurants?.map((restaurant) => ({
					name: restaurant.name,
					type: 'restaurant',
					id: restaurant._id
				})) ?? []

			return [
				...morningEventsVendors,
				...lunchVendors,
				...afternoonEventsVendors,
				...dinnerVendors
			]
		}) ?? [] // Nullish coalescing to default to an empty array

	return [...hotelVendors, ...scheduleVendors]
}
