import { useState } from 'react'
import { MeetingSection } from './MeetingSection'
import { IEvent, IMeeting, IRestaurant } from '../../../../interfaces'
import { EventTransferRow, MorningEventsRow } from '../rows/meals_activities'

interface MorningSectionProps {
  events: IEvent[]
  meetings: IMeeting[]
  date: string
  pax: number
  multiDestination: boolean
}

export const MorningSection = ({
  events,
  meetings,
  date,
  pax,
  multiDestination
}: MorningSectionProps) => {
  const [selectedEvent, setSelectedEvent] = useState<IEvent>(events[0])
  return (
    <>
      <EventTransferRow
        transfer={selectedEvent?.transfer}
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
          id={'fullDayMeetings'}
        />
      )}
    </>
  )
}
