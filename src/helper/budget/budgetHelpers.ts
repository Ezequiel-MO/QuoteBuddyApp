import { IItinerary } from '@interfaces/project'

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
