import { useState, useEffect } from 'react'
import { IEvent, IRestaurant } from '../../../../interfaces'
import { ShowRows } from '../rows/shows/ShowRows'
import { DinnerRow, EventTransferRow } from '../rows/meals_activities'
import {
  UPDATE_PROGRAM_MEALS_COST,
  UPDATE_PROGRAM_SHOWS_COST
} from '../../context/budgetReducer'
import { useContextBudget } from '../../context/BudgetContext'
import { DinnerItineraryRow } from "../rows/itinerary/DinnerItineraryRow"


interface DinnerSectionProps {
  dinners: IRestaurant[]
  dinnersItinerary: IRestaurant[]
  date: string
  pax: number
}

export const DinnerSection = ({ dinners, dinnersItinerary, date, pax }: DinnerSectionProps) => {
  const [selectedEvent, setSelectedEvent] = useState<IRestaurant>(dinners[0])
  const [selectedEventItinerary, setSelectedEventItinerary] = useState<IRestaurant>(dinnersItinerary[0])

  const { dispatch } = useContextBudget()
  
  useEffect(()=>{
    if(dinners.length === 1){
      setSelectedEvent(dinners[0])
    }
    if(dinners.length === 0){
      dispatch({
        type: 'UPDATE_PROGRAM_MEALS_COST',
        payload: {
          date,
          restaurant:null,
          pax: pax,
          type: 'dinner'
        }
      })
    }
  },[dinners])

  const shouldRenderEntertainmentRow = selectedEvent?.entertainment?.length

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
          selectedRestaurant={selectedEvent}
        />
      )
    }
    return null
  }

  return (
    <>
      <DinnerItineraryRow
        date={date}
        items={dinnersItinerary}
        pax={pax}
        selectedEvent={selectedEventItinerary}
        setSelectedEvent={setSelectedEventItinerary}
      />

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
