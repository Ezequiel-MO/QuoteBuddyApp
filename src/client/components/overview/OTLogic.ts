import { IDay } from '@interfaces/project'
import * as dateConstants from '../../../constants/dates'

const { months, daysOfTheWeek } = dateConstants

interface DateObject {
	month: string
	day: string
	year: string
}

type TimeOfDay =
	| 'morningEvents'
	| 'afternoonEvents'
	| 'lunch'
	| 'dinner'
	| 'transfers_in'
	| 'transfers_out'

const OTLogic = () => {
	const transformDates = (date1: string, date2: string) => {
		// Existing date transformation code remains unchanged
		const date1Arr = date1.split('-')
		const date2Arr = date2.split('-')

		const date1Obj: DateObject = {
			month: date1Arr[1],
			day: date1Arr[2],
			year: date1Arr[0]
		}
		const date2Obj: DateObject = {
			month: date2Arr[1],
			day: date2Arr[2],
			year: date2Arr[0]
		}

		const month1 = months[Number(date1Obj.month) - 1]
		const month2 = months[Number(date2Obj.month) - 1]
		const day1 = date1Obj.day
		const day2 = date2Obj.day
		const year1 = date1Obj.year
		const year2 = date2Obj.year

		if (year1 === year2) {
			if (month1 === month2) {
				return `${month1} ${day1}-${day2}, ${year1}`
			} else {
				return `${month1} ${day1}, ${month2} ${day2}, ${year1}`
			}
		} else {
			return `${month1} ${day1}, ${year1} - ${month2} ${day2}, ${year2}`
		}
	}

	const getDays = (date1: string, date2: string) => {
		let day1 = new Date(date1).getUTCDay()
		let day2 = new Date(date2).getUTCDay()
		return [...daysOfTheWeek.slice(day1, day2 + 1)]
	}

	// Function to check if a day has full day meetings
	const hasFullDayMeeting = (day: IDay) => {
		return (
			day?.fullDayMeetings?.meetings && day.fullDayMeetings.meetings.length > 0
		)
	}

	// Get array of days with full day meetings
	const getFullDayMeetingDays = (schedule: IDay[]) => {
		return schedule.map((day, index) => ({
			index,
			hasFullDay: hasFullDayMeeting(day),
			meetings: day?.fullDayMeetings?.meetings || []
		}))
	}

	// Get full day meeting details for a specific day
	const getFullDayMeetingForDay = (schedule: IDay[], dayIndex: number) => {
		const day = schedule[dayIndex]
		if (!day || !hasFullDayMeeting(day)) return null

		const meetings = day.fullDayMeetings.meetings.map((meeting) => ({
			name: meeting.hotelName || 'Full Day Meeting',
			id: meeting._id,
			type: 'fullDayMeeting' as const
		}))

		return meetings
	}

	// Simplified transfer logic - just provide basic labels
	const getTransferLabel = (type: 'arrival' | 'departure') => {
		return type === 'arrival' ? 'Arrival Transfer' : 'Departure Transfer'
	}

	// Check if a day has arrival transfers
	const hasArrivalTransfers = (day?: IDay) => {
		if (!day) return false
		return (
			day.transfer_in &&
			Array.isArray(day.transfer_in) &&
			day.transfer_in.length > 0
		)
	}

	// Check if a day has departure transfers
	const hasDepartureTransfers = (day?: IDay) => {
		if (!day) return false
		return (
			day.transfer_out &&
			Array.isArray(day.transfer_out) &&
			day.transfer_out.length > 0
		)
	}

	const getEvents = (schedule: IDay[], timeOfDay: TimeOfDay) => {
		return schedule.map((day, dayIndex) => {
			// Define a type for the items in our results array
			interface ScheduleItem {
				name: string
				id: string
				type: 'event' | 'meeting' | 'restaurant' | 'fullDayMeeting' | 'transfer'
				details?: any
			}

			let resultItems: ScheduleItem[] = []

			// Handle transfer types with simplified labels
			if (
				timeOfDay === 'transfers_in' &&
				day.transfer_in &&
				day.transfer_in.length > 0
			) {
				return [
					{
						name: getTransferLabel('arrival'),
						id: day.transfer_in[0]._id || 'transfer-in',
						type: 'transfer' as const
					}
				]
			}

			if (
				timeOfDay === 'transfers_out' &&
				day.transfer_out &&
				day.transfer_out.length > 0
			) {
				return [
					{
						name: getTransferLabel('departure'),
						id: day.transfer_out[0]._id || 'transfer-out',
						type: 'transfer' as const
					}
				]
			}

			// Handle morning events + meetings
			if (timeOfDay === 'morningEvents') {
				// Add morning events
				const events =
					day.morningEvents?.events?.map((event) => ({
						name: event.name,
						id: event._id,
						type: 'event' as const
					})) || []

				// Add morning meetings
				const meetings =
					day.morningMeetings?.meetings?.map((meeting) => ({
						name: meeting.hotelName || 'Meeting',
						id: meeting._id,
						type: 'meeting' as const
					})) || []

				resultItems = [...events, ...meetings]
			}

			// Handle afternoon events + meetings
			else if (timeOfDay === 'afternoonEvents') {
				// Add afternoon events
				const events =
					day.afternoonEvents?.events?.map((event) => ({
						name: event.name,
						id: event._id,
						type: 'event' as const
					})) || []

				// Add afternoon meetings
				const meetings =
					day.afternoonMeetings?.meetings?.map((meeting) => ({
						name: meeting.hotelName || 'Meeting',
						id: meeting._id,
						type: 'meeting' as const
					})) || []

				resultItems = [...events, ...meetings]
			}

			// Handle lunch and dinner
			else if (timeOfDay === 'lunch' || timeOfDay === 'dinner') {
				resultItems =
					day[timeOfDay]?.restaurants?.map((restaurant) => ({
						name: restaurant.name,
						id: restaurant._id,
						type: 'restaurant' as const
					})) || []
			}

			return resultItems
		})
	}

	const renderEvent = (
		arr: any[],
		viewMode: 'compact' | 'detailed' = 'compact'
	) => {
		if (!arr || arr.length === 0) {
			return 'No events scheduled'
		} else if (arr.length === 1) {
			// For a single item
			const item = arr[0]
			if (item.type === 'meeting') {
				return `Meeting: ${item.name}`
			} else if (item.type === 'fullDayMeeting') {
				return `Full Day Meeting: ${item.name}`
			} else if (item.type === 'transfer') {
				return item.name // Now just returns "Arrival Transfer" or "Departure Transfer"
			} else {
				return item.name
			}
		} else {
			// For multiple items, group by type
			const events = arr.filter(
				(item) => item.type === 'event' || item.type === 'restaurant'
			)
			const meetings = arr.filter((item) => item.type === 'meeting')
			const fullDayMeetings = arr.filter(
				(item) => item.type === 'fullDayMeeting'
			)
			const transfers = arr.filter((item) => item.type === 'transfer')

			// Handle differently based on view mode
			if (viewMode === 'detailed') {
				// In detailed mode, create a bulleted list of items
				let resultItems = []

				// Add events first
				if (events.length > 0) {
					events.forEach((event) => {
						resultItems.push(event.name)
					})
				}

				// Add meetings
				if (meetings.length > 0) {
					meetings.forEach((meeting) => {
						resultItems.push(`Meeting: ${meeting.name}`)
					})
				}

				// Add full day meetings
				if (fullDayMeetings.length > 0) {
					fullDayMeetings.forEach((meeting) => {
						resultItems.push(`Full Day: ${meeting.name}`)
					})
				}

				// Add transfers
				if (transfers.length > 0) {
					resultItems.push(transfers[0].name)
				}

				// Return formatted HTML for the detailed list
				return resultItems.map((item) => `• ${item}`).join('<br/>')
			} else {
				// In compact mode, concatenate with slashes (original behavior)
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

				if (transfers.length > 0) {
					if (result) result += ' + '
					result += transfers[0].name // Simplified to just show the transfer label
				}

				return result
			}
		}
	}

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString)
		const day = date.getDate()
		const monthIndex = date.getMonth()
		return `${months[monthIndex]} ${day}`
	}

	// Function to generate column headers with proper dates
	const generateColumnHeaders = (
		schedule: IDay[],
		arrivalDay: string,
		departureDay: string
	): { dayLabel: string; dateLabel: string }[] => {
		if (!schedule || schedule.length === 0) return []

		try {
			// Parse arrival day as the start date
			const startDate = new Date(arrivalDay)

			return schedule.map((day, index) => {
				// Clone the start date and add the day index to get current date
				const currentDate = new Date(startDate)
				currentDate.setDate(startDate.getDate() + index)

				// Get day of week
				const dayOfWeek = daysOfTheWeek[currentDate.getDay()]

				// Format date label
				const monthName = months[currentDate.getMonth()]
				const dayOfMonth = currentDate.getDate()

				// Special labels for first and last day
				let dayLabel = `Day ${index + 1}`
				if (index === 0) {
					dayLabel = 'Arrival Day'
				} else if (index === schedule.length - 1) {
					dayLabel = 'Departure Day'
				}

				return {
					dayLabel: `${dayLabel}: ${dayOfWeek}`,
					dateLabel: `${monthName} ${dayOfMonth}`
				}
			})
		} catch (error) {
			console.error('Error generating column headers:', error)
			// Fallback in case of error
			return schedule.map((_, index) => ({
				dayLabel: `Day ${index + 1}`,
				dateLabel: ''
			}))
		}
	}

	return {
		transformDates,
		getDays,
		getEvents,
		renderEvent,
		hasFullDayMeeting,
		getFullDayMeetingDays,
		getFullDayMeetingForDay,
		formatDate,
		hasArrivalTransfers,
		hasDepartureTransfers,
		getTransferLabel,
		generateColumnHeaders
	}
}

export default OTLogic
