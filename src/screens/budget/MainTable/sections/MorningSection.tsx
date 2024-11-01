import { useState, useEffect } from 'react'
import { MeetingSection } from './MeetingSection'
import { IEvent, IMeeting, IRestaurant } from '../../../../interfaces'
import { EventTransferRow, MorningEventsRow } from '../rows/meals_activities'
import { MorningEventsItineraryRow } from "../rows/itinerary/MorningEventsItineraryRow"

interface MorningSectionProps {
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
  const [selectedEventItinerary, setSelectedEventItinerary] = useState<IEvent>(eventsItinerary[0])

  useEffect(() => {
    setSelectedEvent(events[0])
  }, [events])

  return (
    <>
      <MorningEventsItineraryRow
        date={date}
        items={eventsItinerary}
        pax={pax}
        selectedEvent={selectedEventItinerary}
        setSelectedEvent={setSelectedEventItinerary}
      />
      <EventTransferRow
        transfer={selectedEvent?.transfer || []}
        date={date}
        id='transfer_morningEvents'
        selectedEvent={selectedEvent}
      />
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
      {!multiDestination && (
        <MeetingSection
          meetings={meetings}
          date={date}
          pax={pax}
          type='morning'
          id={'morningMeetings'}
        />
      )}
    </>
  )
}
