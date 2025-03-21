import { useState, useEffect } from 'react'
import { MeetingSection } from './MeetingSection'
import { IEvent, IMeeting, IRestaurant } from '../../../../interfaces'
import { EventTransferRow, MorningEventsRow } from '../rows/meals_activities'
import { MorningEventsItineraryRow } from '../rows/itinerary/MorningEventsItineraryRow'
import { useCurrentProject } from 'src/hooks'
import { UpdateProgramActivitiesCostPayload } from 'src/redux/features/currentProject/types'
import { SectionHeader } from './SectionHeader'

export interface MorningSectionProps {
	events: IEvent[]
	eventsItinerary: IEvent[]
	meetings: IMeeting[]
	date: string
	pax: number
	multiDestination: boolean
}

export const MorningSection = ({
	events,
	eventsItinerary,
	meetings,
	date,
	pax,
	multiDestination
}: MorningSectionProps) => {
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
				pax,
				type: 'morning'
			}
			updateBudgetProgramActivitiesCost(payload)
		}
	}, [events])

	return (
		<>
			{/* Section Header */}
			{(events.length > 0 || eventsItinerary.length > 0) && (
				<SectionHeader title="Morning Events" type="activity" />
			)}

			{/* Itinerary Events Row */}
			{eventsItinerary.length > 0 && (
				<MorningEventsItineraryRow
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
					transfer={selectedEvent.transfer || []}
					date={date}
					id="transfer_morningEvents"
					selectedEvent={selectedEvent}
				/>
			)}

			{/* Morning Events */}
			{events.length > 0 && (
				<MorningEventsRow
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

			{/* Meetings */}
			{!multiDestination && meetings.length > 0 && (
				<MeetingSection
					meetings={meetings}
					date={date}
					pax={pax}
					type="morning"
					id={'morningMeetings'}
				/>
			)}
		</>
	)
}
