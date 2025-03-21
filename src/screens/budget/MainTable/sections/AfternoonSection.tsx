import { useState, useEffect } from 'react'
import { MeetingSection } from '.'
import { IEvent, IMeeting, IRestaurant } from '../../../../interfaces'
import { AfternoonEventsRow, EventTransferRow } from '../rows/meals_activities'
import { AfternoonEventsItineraryRow } from '../rows/itinerary/AfternoonEventsItineraryRow'
import { useCurrentProject } from 'src/hooks'
import { UpdateProgramActivitiesCostPayload } from 'src/redux/features/currentProject/types'
import { SectionHeader } from './SectionHeader'

interface AfternoonSectionProps {
	events: IEvent[]
	eventsItinerary: IEvent[]
	meetings: IMeeting[]
	fullDayMeetings: IMeeting[]
	date: string
	pax: number
	multiDestination: boolean
}

export const AfternoonSection = ({
	events,
	eventsItinerary,
	meetings,
	fullDayMeetings,
	date,
	pax,
	multiDestination
}: AfternoonSectionProps) => {
	const [selectedEvent, setSelectedEvent] = useState<IEvent>(events[0])
	const [selectedEventItinerary, setSelectedEventItinerary] = useState<IEvent>(
		eventsItinerary[0]
	)
	const { updateBudgetProgramActivitiesCost } = useCurrentProject()

	useEffect(() => {
		if (events.length === 1) {
			setSelectedEvent(events[0])
		}
		if (events.length === 0) {
			const payload: UpdateProgramActivitiesCostPayload = {
				date,
				activity: null,
				pax: pax,
				type: 'afternoon'
			}
			updateBudgetProgramActivitiesCost(payload)
		}
	}, [events])

	const hasAnyContent =
		events.length > 0 ||
		eventsItinerary.length > 0 ||
		(!multiDestination && (meetings.length > 0 || fullDayMeetings.length > 0))

	if (!hasAnyContent) return null

	return (
		<>
			{/* Section Header */}
			<SectionHeader title="Afternoon Activities" type="activity" />

			{/* Itinerary Events */}
			{eventsItinerary.length > 0 && (
				<AfternoonEventsItineraryRow
					date={date}
					items={eventsItinerary}
					pax={pax}
					selectedEvent={selectedEventItinerary}
					setSelectedEvent={setSelectedEventItinerary}
				/>
			)}

			{/* Event Transfers */}
			{selectedEvent?.transfer && selectedEvent.transfer.length > 0 && (
				<EventTransferRow
					transfer={selectedEvent?.transfer || []}
					date={date}
					id="transfer_afternoonEvents"
					selectedEvent={selectedEvent}
				/>
			)}

			{/* Afternoon Events */}
			{events.length > 0 && (
				<AfternoonEventsRow
					items={events}
					date={date}
					pax={pax}
					selectedEvent={selectedEvent}
					setSelectedEvent={
						setSelectedEvent as React.Dispatch<
							React.SetStateAction<IEvent | IRestaurant>
						>
					}
				/>
			)}

			{/* Meeting Sections - conditionally rendered */}
			{!multiDestination && (
				<>
					{meetings.length > 0 && (
						<MeetingSection
							meetings={meetings}
							date={date}
							pax={pax}
							type="afternoon"
							id="afternoonMeetings"
						/>
					)}

					{fullDayMeetings.length > 0 && (
						<MeetingSection
							meetings={fullDayMeetings}
							date={date}
							pax={pax}
							type="full_day"
							id="fullDayMeetings"
						/>
					)}
				</>
			)}
		</>
	)
}
