import { IDay, IProject } from '@interfaces/project'
import * as dateConstants from '../../../constants/dates'
import { ITransfer } from '@interfaces/transfer'

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

	// New function to handle transfers
	const getTransfers = (
		schedule: IDay[],
		type: 'transfer_in' | 'transfer_out'
	) => {
		return schedule.map((day, dayIndex) => {
			if (!day[type] || day[type].length === 0) {
				return []
			}

			return day[type].map((transfer: ITransfer) => ({
				name: getTransferServiceName(transfer),
				id: transfer._id,
				type: 'transfer' as const,
				details: transfer
			}))
		})
	}

	// Helper to get transfer service name
	const getTransferServiceName = (transfer: ITransfer) => {
		const vehicleInfo = transfer.vehicleType
			? `${transfer.vehicleType} (${transfer.vehicleCapacity} pax)`
			: 'Transfer'

		return `${transfer.company} - ${vehicleInfo}`
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

			// Handle transfer types
			if (timeOfDay === 'transfers_in' && day.transfer_in) {
				return day.transfer_in.map((transfer) => ({
					name: getTransferServiceName(transfer),
					id: transfer._id,
					type: 'transfer' as const,
					details: transfer
				}))
			}

			if (timeOfDay === 'transfers_out' && day.transfer_out) {
				return day.transfer_out.map((transfer) => ({
					name: getTransferServiceName(transfer),
					id: transfer._id,
					type: 'transfer' as const,
					details: transfer
				}))
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

	const renderEvent = (arr: any[]) => {
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
				return `Transfer: ${item.name}`
			} else {
				return item.name
			}
		} else {
			// For multiple items, group by type and combine
			const events = arr.filter(
				(item) => item.type === 'event' || item.type === 'restaurant'
			)
			const meetings = arr.filter((item) => item.type === 'meeting')
			const fullDayMeetings = arr.filter(
				(item) => item.type === 'fullDayMeeting'
			)
			const transfers = arr.filter((item) => item.type === 'transfer')

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
				result += `Transfer${transfers.length > 1 ? 's' : ''}: ${transfers
					.map((t) => t.name)
					.join('/')}`
			}

			return result
		}
	}

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString)
		const day = date.getDate()
		const monthIndex = date.getMonth()
		return `${months[monthIndex]} ${day}`
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
		getTransfers,
		hasArrivalTransfers,
		hasDepartureTransfers
	}
}

export default OTLogic
