import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { CardAddItenerary } from 'src/components/atoms/CardAddItenerary'
import { useCurrentProject } from 'src/hooks'
import { IntroAdd } from 'src/components/atoms'
import { IntroModal } from '../../render/introModal/IntroModal'
import { ActivityCard } from './ActivityCard'
import { IItinerary } from '@interfaces/project'

/**
 * Formats event type string for display
 * @param eventType - The event type to format (e.g., "morningActivity")
 * @returns Formatted event type string
 */
const formatEventTitle = (eventType: string): string => {
	// Handle simple event types directly
	const simpleEvents: Record<string, string> = {
		lunch: 'Lunch',
		dinner: 'Dinner',
		breakfast: 'Breakfast',
		morningEvents: 'Morning Events',
		afternoonEvents: 'Afternoon Events',
		morningActivity: 'Morning Activity',
		afternoonActivity: 'Afternoon Activity',
		nightActivity: 'Night Activity'
	}

	if (simpleEvents[eventType]) {
		return simpleEvents[eventType]
	}

	// For other cases, use regex to insert spaces before capital letters
	return eventType
		.replace(/([A-Z])/g, ' $1')
		.trim()
		.toLowerCase()
}

interface ItineraryDayActivityProps {
	dayIndex: number
	itinerary?: IItinerary
	name: 'morningActivity' | 'afternoonActivity' | 'nightActivity'
	date: string
}

export const ItineraryDayActivities: FC<ItineraryDayActivityProps> = ({
	dayIndex,
	itinerary,
	date,
	name
}) => {
	const { removeEventFromItinerary } = useCurrentProject()

	const [openModalIntro, setOpenModalntro] = useState(false)

	const hasActivities = itinerary && itinerary[name].events.length > 0

	if (itinerary?.itinerary.length === 0) return null

	const handleDeleteEvent = (
		dayIndex: number,
		typeOfEvent: 'morningActivity' | 'afternoonActivity' | 'nightActivity',
		idEvent: string
	) => {
		removeEventFromItinerary({ dayIndex, typeOfEvent, idEvent })
		toast.success(`${typeOfEvent.toUpperCase()} Removed`, toastOptions)
	}

	return (
		<div key={dayIndex}>
			<CardAddItenerary
				name={formatEventTitle(name)}
				dayIndex={dayIndex}
				route="activity"
				typeOfEvent={name}
				key={dayIndex}
			/>
			{hasActivities && (
				<div className="my-2">
					<IntroAdd events={itinerary[name]} setOpen={setOpenModalntro} />
					<IntroModal
						open={openModalIntro}
						setOpen={setOpenModalntro}
						day={date}
						dayIndex={dayIndex}
						eventType={name}
						events={itinerary[name]}
						isItinerary={true}
					/>
				</div>
			)}
			{itinerary &&
				itinerary[name].events.map((activity) => (
					<ActivityCard
						activity={activity}
						onDelete={() => handleDeleteEvent(dayIndex, name, activity._id)}
					/>
				))}
		</div>
	)
}
