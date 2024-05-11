import { useState } from 'react'
import { MeetingSection } from './MeetingSection'
import { IEvent, IMeeting, IRestaurant } from '../../../../interfaces'
import { EventTransferRow, MorningEventsRow } from '../rows/meals_activities'
import { MorningEventsItenerayRow } from "../rows/itinerary/MorningEventsIteneraryRow"

interface MorningSectionProps {
  events: IEvent[]
  eventsItenerary: IEvent[]
  meetings: IMeeting[]
  date: string
  pax: number
  multiDestination: boolean
}

export const MorningSection = ({
  events,
  eventsItenerary,
  meetings,
  date,
  pax,
  multiDestination
}: MorningSectionProps) => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent>(events[0])
  const [selectedEventItenerary, setSelectedEventItenerary] = useState<IEvent>(eventsItenerary[0])
  return (
    <>
      <MorningEventsItenerayRow
        date={date}
        items={eventsItenerary}
        pax={pax}
        selectedEvent={selectedEventItenerary}
        setSelectedEvent={setSelectedEventItenerary}
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
