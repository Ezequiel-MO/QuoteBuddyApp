import { useState, useEffect } from 'react'
import { IEvent, IRestaurant } from '../../../../interfaces'
import { ShowRows } from '../rows/shows/ShowRows'
import { DinnerRow, EventTransferRow } from '../rows/meals_activities'
import {
  UPDATE_PROGRAM_MEALS_COST,
  UPDATE_PROGRAM_SHOWS_COST
} from '../../context/budgetReducer'
import { useContextBudget } from '../../context/BudgetContext'

interface DinnerSectionProps {
  dinners: IRestaurant[]
  date: string
  pax: number
}

export const DinnerSection = ({ dinners, date, pax }: DinnerSectionProps) => {
  const [selectedEvent, setSelectedEvent] = useState<IRestaurant>(dinners[0])
  const { dispatch } = useContextBudget()
  const noDinner = dinners.length === 0
  if (noDinner) return null

  const shouldRenderEntertainmentRow = selectedEvent?.entertainment?.length

  useEffect(() => {
    dispatch({
      type: UPDATE_PROGRAM_MEALS_COST,
      payload: {
        date,
        restaurant: selectedEvent,
        pax,
        type: 'dinner'
      }
    })
  }, [dispatch, date, selectedEvent])

  useEffect(() => {
    if (!shouldRenderEntertainmentRow) {
      dispatch({
        type: UPDATE_PROGRAM_SHOWS_COST,
        payload: {
          date,
          show: null,
          type: 'dinner'
        }
      })
    }
  }, [shouldRenderEntertainmentRow, dispatch, date])

  const renderEntertainmentRow = (selectedEvent: IRestaurant) => {
    if (selectedEvent?.isVenue && selectedEvent?.entertainment?.length) {
      return (
        <ShowRows
          date={date}
          entertainment={selectedEvent.entertainment}
          typeOfEvent='dinner'
        />
      )
    }
    return null
  }

  return (
    <>
      <EventTransferRow
        transfer={selectedEvent?.transfer || []}
        date={date}
        id='transfer_dinner'
        selectedEvent={selectedEvent}
      />

      <DinnerRow
        items={dinners}
        date={date}
        pax={pax}
        selectedEvent={selectedEvent}
        setSelectedEvent={
          setSelectedEvent as React.Dispatch<
            React.SetStateAction<IEvent | IRestaurant>
          >
        }
      />
      {renderEntertainmentRow(selectedEvent)}
    </>
  )
}
