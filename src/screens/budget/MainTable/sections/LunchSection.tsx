import { useState } from 'react'
import { IEvent, IRestaurant } from '../../../../interfaces'
import { EventTransferRow, LunchRow } from '../rows/meals_activities'

interface LunchSectionProps {
  lunch: IRestaurant[]
  date: string
  pax: number
}

export const LunchSection = ({ lunch, date, pax }: LunchSectionProps) => {
  const [selectedEvent, setSelectedEvent] = useState<IRestaurant>(lunch[0])

  const NoLunch = lunch.length === 0
  if (NoLunch) return NoLunch

  return (
    <>
      <EventTransferRow
        transfer={selectedEvent?.transfer || []}
        date={date}
        id='transfer_lunch'
        selectedEvent={selectedEvent}
      />
      <LunchRow
        items={lunch}
        date={date}
        pax={pax}
        selectedEvent={selectedEvent}
        setSelectedEvent={
          setSelectedEvent as React.Dispatch<
            React.SetStateAction<IEvent | IRestaurant>
          >
        }
      />
    </>
  )
}
