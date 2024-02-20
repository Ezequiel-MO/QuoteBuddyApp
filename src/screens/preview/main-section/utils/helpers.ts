import { IItinerary } from '../../../../interfaces'

export const getMorningMorningTitles = (
	isItineraryWithMorningActivities: boolean | undefined
) => {
	let titles = new Set<string>(['Morning Events', 'Morning Meeting'])
	if (isItineraryWithMorningActivities) {
		titles.delete('MorningEvents')
	}
	return titles
}

export const getMorningAfternoonTitles = (
	isItineraryWithMorningActivities: boolean | undefined,
	isItineraryWithLunch: boolean | undefined
) => {
	let titles = new Set<string>(['Morning Events', 'Morning Meeting', 'Lunch'])
	if (isItineraryWithMorningActivities) {
		titles.delete('Morning Events')
	}
	if (isItineraryWithLunch) {
		titles.delete('Lunch')
	}
	return titles
}

export const getMorningNightTitles = (
	isItineraryWithMorningActivities: boolean | undefined,
	isItineraryWithAfternoonActivities: boolean | undefined,
	isItineraryWithLunch: boolean | undefined,
	isItineraryWithDinner: boolean | undefined
) => {
	let titles = new Set<string>([
		'Morning Events',
		'Morning Meeting',
		'Lunch',
		'Afternoon Events',
		'Afternoon Meeting',
		'Dinner'
	])

	if (isItineraryWithMorningActivities) {
		titles.delete('Morning Events')
		titles.delete('Afternoon Events')
	}

	if (isItineraryWithAfternoonActivities) {
		titles.delete('Afternoon Events')
		titles.delete('Afternoon Events')
	}

	if (isItineraryWithLunch) {
		titles.delete('Lunch')
	}

	if (isItineraryWithDinner) {
		titles.delete('Dinner')
	}

	return titles
}

export const getAfternoonAfternoonTitles = (
	isItineraryWithAfternoonActivities: boolean | undefined
) => {
	let titles = new Set<string>(['Afternoon Events', 'Afternoon Meeting'])

	if (isItineraryWithAfternoonActivities) {
		titles.delete('Afternoon Events')
		titles.delete('Afternoon Meeting')
	}
	return titles
}

export const getAfternoonNightTitles = (
	isItineraryWithAfternoonActivities: boolean | undefined,
	isItineraryWithDinner: boolean | undefined
) => {
	let titles = new Set<string>([
		'Afternoon Events',
		'Afternoon Meeting',
		'Dinner'
	])

	if (isItineraryWithAfternoonActivities) {
		titles.delete('Afternoon Events')
		titles.delete('Afternoon Meeting')
	}

	if (isItineraryWithDinner) {
		titles.delete('Dinner')
	}
	return titles
}

export const getNightNightTitles = () => {
	let titles = new Set<string>([])
	return titles
}

export function analyzeItinerary(itinerary: IItinerary) {
	const isItineraryActive = itinerary && itinerary.itinerary.length > 0
	const isMorningItinerary = itinerary && itinerary.starts === 'morning'
	const isAfternoonItinerary = itinerary && itinerary.starts === 'afternoon'
	const isItineraryWithMorningActivities =
		isItineraryActive && itinerary?.morningActivity?.events.length > 0
	const isItineraryWithAfternoonActivities =
		isItineraryActive && itinerary?.afternoonActivity?.events.length > 0
	const isItineraryWithLunch =
		isItineraryActive && itinerary?.lunch?.restaurants.length > 0
	const isItineraryWithDinner =
		isItineraryActive && itinerary?.dinner?.restaurants.length > 0

	return {
		isItineraryActive,
		isMorningItinerary,
		isAfternoonItinerary,
		isItineraryWithMorningActivities,
		isItineraryWithAfternoonActivities,
		isItineraryWithLunch,
		isItineraryWithDinner
	}
}

export const getItemType = (itemId: string) => {
	const patterns = {
		MorningEvents: /morning-events$/,
		MorningMeetings: /morning-meetings$/,
		Lunch: /lunch$/,
		AfternoonEvents: /afternoon-events$/,
		AfternoonMeetings: /afternoon-meetings$/,
		Dinner: /dinner$/,
		FullDayMeetings: /fullday-meetings$/,
		Overnight: /overnight$/,
		Itinerary: /itinerary$/
	}
	for (const [type, pattern] of Object.entries(patterns)) {
		if (pattern.test(itemId)) {
			return type
		}
	}

	return null
}
