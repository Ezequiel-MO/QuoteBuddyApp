import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { EventActivate } from './card/EventActivate'
import { ScheduleTableRow } from './ScheduleTableRow'
import { useDragAndDropSchedule } from './useDragAndDropSchedule'
import { IDay } from '@interfaces/project'

// Helper function to format dates
const formatDate = (date: Date): string => {
	return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Helper function to generate an empty structure for IDay
const createEmptyDay = (date: string): IDay => ({
	date,
	fullDayMeetings: { intro: '', meetings: [] },
	morningMeetings: { intro: '', meetings: [] },
	morningEvents: { intro: '', events: [] },
	afternoonMeetings: { intro: '', meetings: [] },
	afternoonEvents: { intro: '', events: [] },
	lunch: { intro: '', restaurants: [] },
	dinner: { intro: '', restaurants: [] },
	transfer_in: [],
	transfer_out: [],
	overnight: { intro: '', hotels: [] },
	itinerary: {
		intro: '',
		itinerary: [],
		morningActivity: { intro: '', events: [] },
		afternoonActivity: { intro: '', events: [] },
		nightActivity: { intro: '', events: [] },
		lunch: { intro: '', restaurants: [] },
		dinner: { intro: '', restaurants: [] },
		starts: '',
		ends: ''
	}
})

const generateScheduleData = (
	arrivalDay: string,
	departureDay: string
): IDay[] => {
	const startDate = new Date(arrivalDay)
	const endDate = new Date(departureDay)
	const scheduleData: IDay[] = []

	// If the dates are invalid or reversed, return an empty array
	if (
		isNaN(startDate.getTime()) ||
		isNaN(endDate.getTime()) ||
		startDate > endDate
	) {
		return scheduleData
	}

	// Calculate the number of days between arrival and departure
	const dayCount = Math.ceil(
		(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
	)

	for (let i = 0; i <= dayCount; i++) {
		const currentDate = new Date(startDate)
		currentDate.setDate(startDate.getDate() + i)

		let dayLabel
		if (i === 0) {
			dayLabel = `${formatDate(currentDate)} - Arrival Day`
		} else if (i === dayCount) {
			dayLabel = `${formatDate(currentDate)} - Departure Day`
		} else {
			dayLabel = `${formatDate(currentDate)} - Day ${i}`
		}

		// Create an IDay object for each day
		scheduleData.push({
			_id: `day-${i}`, // Assign a unique ID for each day
			...createEmptyDay(dayLabel) // Spread the empty day structure and override the date
		})
	}

	return scheduleData
}

export const TableSchedule: React.FC = () => {
	const { currentProject, removeEventFromSchedule } = useCurrentProject()
	const {
		events,
		activeId,
		sensors,
		handleDragStart,
		handleDragOver,
		handleDragEnd
	} = useDragAndDropSchedule()

	const handleDeleteEvent = (
		dayIndex: number,
		timeOfEvent: string,
		eventId: string
	) => {
		const dayOfEvent = events[dayIndex]
		if (dayOfEvent) {
			removeEventFromSchedule({ dayOfEvent, timeOfEvent, eventId })
			toast.success('Event Removed', toastOptions)
		}
	}

	// Generate schedule data
	const scheduleData: IDay[] = generateScheduleData(
		currentProject.arrivalDay,
		currentProject.departureDay
	)

	return (
		<div className="flex flex-col p-1 bg-gray-800 text-white-0">
			{/* Custom Headers */}
			<div className="flex items-start justify-start border-b border-gray-600 pb-2 mb-4">
				<div className="flex-1 uppercase font-semibold">Days</div>
				<div className="flex-1 text-center font-semibold">
					Morning Activities
				</div>
				<div className="flex-1 text-center font-semibold">Lunch Options</div>
				<div className="flex-1 text-center font-semibold">
					Afternoon Activities
				</div>
				<div className="flex-1 text-center font-semibold">Dinner Options</div>
			</div>

			{/* DnD Context */}
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<div className="flex flex-col gap-4">
					{scheduleData.map((day, index) => (
						<ScheduleTableRow
							key={`day-${index}`}
							day={day} // Pass the full IDay object
							index={index}
							handleDeleteEvent={handleDeleteEvent}
						/>
					))}
				</div>
				<DragOverlay>
					{activeId && <EventActivate event={activeId} />}
				</DragOverlay>
			</DndContext>
		</div>
	)
}
