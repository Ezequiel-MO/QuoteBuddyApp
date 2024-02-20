import * as interfaces from '../../../interfaces'
import { RenderedItem } from './ScheduleDay'
import * as helpers from './utils/helpers'

interface FilterMap {
	[key: string]: Set<string>
}

export const useScheduleFilter = (day: interfaces.IDay): RenderedItem[] => {
	const {
		date,
		morningEvents,
		morningMeetings,
		itinerary,
		lunch,
		afternoonEvents,
		afternoonMeetings,
		dinner,
		fullDayMeetings,
		overnight
	} = day

	const {
		isItineraryActive,
		isItineraryWithMorningActivities,
		isItineraryWithAfternoonActivities,
		isItineraryWithLunch,
		isItineraryWithDinner
	} = helpers.analyzeItinerary(itinerary)

	const getTitleFilterMap = (): FilterMap => {
		return {
			'morning-morning': helpers.getMorningMorningTitles(
				isItineraryWithMorningActivities
			),
			'morning-afternoon': helpers.getMorningAfternoonTitles(
				isItineraryWithMorningActivities,
				isItineraryWithLunch
			),
			'morning-night': helpers.getMorningNightTitles(
				isItineraryWithMorningActivities,
				isItineraryWithAfternoonActivities,
				isItineraryWithLunch,
				isItineraryWithDinner
			),
			'afternoon-afternoon': helpers.getAfternoonAfternoonTitles(
				isItineraryWithAfternoonActivities
			),
			'afternoon-night': helpers.getAfternoonNightTitles(
				isItineraryWithAfternoonActivities,
				isItineraryWithDinner
			),
			'night-night': helpers.getNightNightTitles()
		}
	}

	const filterItemsBasedOnItinerary = (
		items: RenderedItem[]
	): RenderedItem[] => {
		if (!isItineraryActive) {
			return items
		}

		const { starts, ends } = itinerary
		const timeKey = `${starts}-${ends}`
		const filterMap = getTitleFilterMap()
		const filteredTitles = filterMap[timeKey] || new Set<string>()

		return items.filter((item) => !filteredTitles.has(item.title))
	}

	const initialRenderedItems: RenderedItem[] = [
		{
			id: `${date}-morning-events`,
			title: isItineraryWithMorningActivities
				? 'En route Activity'
				: 'Morning Events',
			events: isItineraryWithMorningActivities
				? itinerary.morningActivity
				: morningEvents
		},
		{
			id: `${date}-morning-meetings`,
			title: 'Morning Meeting',
			events: morningMeetings,
			timing: 'Morning'
		},
		{
			id: `${date}-lunch`,
			title: isItineraryWithLunch ? 'En Route Lunch' : 'Lunch',
			events: isItineraryWithLunch ? itinerary.lunch : lunch
		},
		{
			id: `${date}-afternoon-events`,
			title: isItineraryWithAfternoonActivities
				? 'En Route Activity'
				: 'Afternoon Events',
			events: isItineraryWithAfternoonActivities
				? itinerary.afternoonActivity
				: afternoonEvents
		},
		{
			id: `${date}-afternoon-meetings`,
			title: 'Afternoon Meeting',
			events: afternoonMeetings,
			timing: 'Afternoon'
		},
		{
			id: `${date}-dinner`,
			title: isItineraryWithDinner ? 'En Route Dinner' : 'Dinner',
			events: isItineraryWithDinner ? itinerary.dinner : dinner
		},
		{
			id: `${date}-fullday-meetings`,
			title: 'Full Day Meeting',
			events: fullDayMeetings,
			timing: 'Full Day'
		},
		{
			id: `${date}-overnight`,
			title: 'Overnight',
			events: overnight
		}
	]

	let updatedRenderedItems = [...initialRenderedItems]

	if (isItineraryActive) {
		const itineraryItem: RenderedItem = {
			id: `${date}-itinerary`,
			title: 'Itinerary',
			events: { ...itinerary }
		}

		switch (itinerary.starts) {
			case 'morning':
				updatedRenderedItems = [itineraryItem, ...updatedRenderedItems]
				break
			case 'afternoon':
				const lunchIndex = updatedRenderedItems.findIndex(
					(item) => item.title === 'Lunch'
				)
				updatedRenderedItems = [
					...updatedRenderedItems.slice(0, lunchIndex + 1),
					itineraryItem,
					...updatedRenderedItems.slice(lunchIndex + 1)
				]
				break
			case 'night':
				updatedRenderedItems = [...updatedRenderedItems, itineraryItem]
				break
			default:
				break
		}
	}

	return filterItemsBasedOnItinerary(updatedRenderedItems)
}
