import { useState } from 'react'
import { MeetingSection } from '.'
import { IEvent, IMeeting, IRestaurant } from '../../../../interfaces'
import { AfternoonEventsRow, EventTransferRow } from '../rows/meals_activities'
import { AfternoonEventsItineraryRow } from "../rows/itinerary/AfternoonEventsItineraryRow"


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
  const [selectedEventItinerary, setSelectedEventItinerary] = useState<IEvent>(eventsItinerary[0])

  return (
    <>
      <AfternoonEventsItineraryRow
        date={date}
        items={eventsItinerary}
        pax={pax}
        selectedEvent={selectedEventItinerary}
        setSelectedEvent={setSelectedEventItinerary}
      />
      <EventTransferRow
        transfer={selectedEvent?.transfer || []}
        date={date}
        id='transfer_afternoonEvents'
        selectedEvent={selectedEvent}
      />
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
      {!multiDestination && (
        <>
          <MeetingSection
            meetings={meetings}
            date={date}
            pax={pax}
            type='afternoon'
            id='afternoonMeetings'
          />
          <MeetingSection
            meetings={fullDayMeetings}
            date={date}
            pax={pax}
            type='full_day'
            id='fullDayMeetings'
          />
        </>
      )}
    </>
  )
}
