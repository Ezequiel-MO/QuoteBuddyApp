import { IHotel } from '@interfaces/hotel'
import { IMeeting } from '@interfaces/meeting'
import { IProject } from '@interfaces/project'
import {
	IEditModalMeeting,
	TimeOfEvent
} from '@redux/features/currentProject/types'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// Mapping TimeOfEvent to IEditModalMeeting.typeOfEvent compatible values
const getCompatibleTimeOfEvent = (
	time: string
): 'fullDayMeetings' | 'morningMeetings' | 'afternoonMeetings' => {
	if (
		time === 'fullDayMeetings' ||
		time === 'morningMeetings' ||
		time === 'afternoonMeetings'
	) {
		return time as 'fullDayMeetings' | 'morningMeetings' | 'afternoonMeetings'
	}
	// Default fallback or error handling
	console.error(`Invalid meeting time: ${time}`)
	return 'morningMeetings' // Default fallback
}

const mySwal = withReactContent(Swal)

// Define the parameter types for handleConfirm
interface HandleConfirmParams {
	meetingValues: Record<string, Partial<IMeeting>>
	addEventToSchedule: (payload: {
		dayOfEvent: number
		timeOfEvent: TimeOfEvent
		event: Partial<IMeeting>
	}) => void
	editModalMeeting: (payload: IEditModalMeeting) => void // Add this
	hotel: IHotel
	setOpen: (value: boolean) => void
	currentProject: IProject // Add this
}

export const handleConfirm = ({
	meetingValues,
	addEventToSchedule,
	editModalMeeting,
	hotel,
	setOpen,
	currentProject
}: HandleConfirmParams & { editModalMeeting: Function }) => {
	const { schedule } = currentProject

	for (const key in meetingValues) {
		// Skip empty entries
		const values = Object.values(meetingValues[key]) as string[]
		const filteredValues = values.filter((el: string) => el?.length > 0)
		if (filteredValues.length === 0) continue

		// Split key into timeOfEvent and dayIndex
		const [timeOfEvent, dayOfEventStr] = key.split(/_|-/)
		const timeOfEventTyped = timeOfEvent as TimeOfEvent
		const dayIndex = Number(dayOfEventStr)

		// Check if there's already a meeting for this hotel at this time
		const existingMeeting = schedule[dayIndex][timeOfEventTyped].meetings.find(
			(meeting: IMeeting) => meeting.hotel?.[0] === hotel._id
		)
		const compatibleTimeOfEvent = getCompatibleTimeOfEvent(timeOfEvent)
		if (existingMeeting) {
			// Update existing meeting
			editModalMeeting({
				id: existingMeeting._id,
				dayIndex,
				typeOfEvent: compatibleTimeOfEvent,
				data: meetingValues[key]
			})
		} else {
			// Add new meeting
			const numRandom = Math.floor(Math.random() * 10)
			if (!hotel._id) {
				console.error('Hotel ID is undefined')
				continue // Skip this iteration
			}
			const newId = hotel._id.slice(0, 23) + numRandom

			const event = {
				...meetingValues[key],
				hotel: hotel._id ? [hotel._id as string] : [], // Explicitly cast to string
				hotelName: hotel.name,
				_id: newId
			}

			addEventToSchedule({
				dayOfEvent: dayIndex,
				timeOfEvent: timeOfEventTyped,
				event
			})
		}
	}

	// Success notification and cleanup
	mySwal.fire({
		title: 'Success',
		icon: 'success',
		confirmButtonText: 'continue',
		customClass: { container: 'custom-container' }
	})

	setTimeout(() => {
		setOpen(false)
	}, 500)
}
