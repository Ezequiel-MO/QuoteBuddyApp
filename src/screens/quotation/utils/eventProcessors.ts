import {
	ProcessedDay,
	ProcessedEvent,
	DayWithDate
} from '../context/contextinterfaces'
import { formatDate, getDays } from './dateFormatters'

// Event processing functions
export const hasFullDayMeeting = (day: any): boolean => {
	return (
		day?.fullDayMeetings?.meetings && day.fullDayMeetings.meetings.length > 0
	)
}

export const getFullDayMeetingForDay = (
	schedule: any[],
	dayIndex: number
): ProcessedEvent[] | null => {
	if (
		!schedule ||
		!Array.isArray(schedule) ||
		dayIndex < 0 ||
		dayIndex >= schedule.length
	) {
		return null
	}

	const day = schedule[dayIndex]
	if (!day || !hasFullDayMeeting(day)) return null

	return day.fullDayMeetings.meetings.map((meeting: any) => ({
		name: meeting.hotelName || 'Full Day Meeting',
		id: meeting._id,
		type: 'fullDayMeeting'
	}))
}

export const getEventsForTimeOfDay = (
	day: any,
	timeOfDay: string
): ProcessedEvent[] => {
	let resultItems: ProcessedEvent[] = []

	// Handle morning events + meetings
	if (timeOfDay === 'morning' || timeOfDay === 'morningEvents') {
		// Add morning events
		const events =
			day.morningEvents?.events?.map((event: any) => ({
				name: event.name,
				id: event._id,
				type: 'event' as const
			})) || []

		// Add morning meetings
		const meetings =
			day.morningMeetings?.meetings?.map((meeting: any) => ({
				name: meeting.hotelName || 'Meeting',
				id: meeting._id,
				type: 'meeting' as const
			})) || []

		resultItems = [...events, ...meetings]
	}

	// Handle afternoon events + meetings
	else if (timeOfDay === 'afternoon' || timeOfDay === 'afternoonEvents') {
		// Add afternoon events
		const events =
			day.afternoonEvents?.events?.map((event: any) => ({
				name: event.name,
				id: event._id,
				type: 'event' as const
			})) || []

		// Add afternoon meetings
		const meetings =
			day.afternoonMeetings?.meetings?.map((meeting: any) => ({
				name: meeting.hotelName || 'Meeting',
				id: meeting._id,
				type: 'meeting' as const
			})) || []

		resultItems = [...events, ...meetings]
	}

	// Handle lunch and dinner
	else if (timeOfDay === 'lunch' || timeOfDay === 'dinner') {
		resultItems =
			day[timeOfDay]?.restaurants?.map((restaurant: any) => ({
				name: restaurant.name,
				id: restaurant._id,
				type: 'restaurant' as const
			})) || []
	}

	return resultItems
}

export const renderEvent = (arr: ProcessedEvent[] | null): string => {
	if (!arr || arr.length === 0) {
		return 'No events scheduled'
	} else if (arr.length === 1) {
		// For a single item
		const item = arr[0]
		if (item.type === 'meeting') {
			return `Meeting: ${item.name}`
		} else if (item.type === 'fullDayMeeting') {
			return `Full Day Meeting: ${item.name}`
		} else {
			return item.name
		}
	} else {
		// For multiple items, group by type and combine
		const events = arr.filter(
			(item) => item.type === 'event' || item.type === 'restaurant'
		)
		const meetings = arr.filter((item) => item.type === 'meeting')
		const fullDayMeetings = arr.filter((item) => item.type === 'fullDayMeeting')

		let result = ''

		if (events.length > 0) {
			result += events.map((event) => event.name).join('/')
		}

		if (meetings.length > 0) {
			if (result) result += ' + '
			result += `Meeting${meetings.length > 1 ? 's' : ''}: ${meetings
				.map((m) => m.name)
				.join('/')}`
		}

		if (fullDayMeetings.length > 0) {
			if (result) result += ' + '
			result += `Full Day: ${fullDayMeetings.map((m) => m.name).join('/')}`
		}

		return result
	}
}

// Main data processing function
export function processScheduleData(
	schedule: any[],
	arrivalDay: string,
	departureDay: string,
	hideDates: boolean
) {
	// Process schedule days
	const scheduleDays: ProcessedDay[] = schedule.map((day, index) => {
		return {
			...day,
			dayIndex: index,
			formattedDate: formatDate(day.date),
			events: {
				morning: getEventsForTimeOfDay(day, 'morning'),
				lunch: getEventsForTimeOfDay(day, 'lunch'),
				afternoon: getEventsForTimeOfDay(day, 'afternoon'),
				dinner: getEventsForTimeOfDay(day, 'dinner')
			},
			hasFullDay: hasFullDayMeeting(day),
			fullDayMeetings: hasFullDayMeeting(day)
				? getFullDayMeetingForDay(schedule, index)
				: null
		}
	})

	// Get days with dates
	const daysWithDates: DayWithDate[] = !hideDates
		? getDays(arrivalDay, departureDay).map((day, index) => {
				const startDate = new Date(arrivalDay)
				const currentDate = new Date(startDate)
				currentDate.setDate(startDate.getDate() + index)
				return {
					day,
					date: formatDate(currentDate.toISOString().split('T')[0])
				}
		  })
		: [{ day: 'Options', date: '' }]

	return { scheduleDays, daysWithDates }
}
