import { useState, useEffect } from 'react'
import { IEvent, IRestaurant } from '../../../../interfaces'
import { EventTransferRow, LunchRow } from '../rows/meals_activities'
import { ShowRows } from '../rows/shows/ShowRows'
import { LunchItineraryRow } from '../rows/itinerary/LunchItineraryRow'
import { useContextBudget } from '../../context/BudgetContext'

interface LunchSectionProps {
	lunch: IRestaurant[]
	lunchItinerary: IRestaurant[]
	date: string
	pax: number
}

export const LunchSection = ({
	lunch,
	lunchItinerary,
	date,
	pax
}: LunchSectionProps) => {
	const { dispatch, state } = useContextBudget()

	const [selectedEvent, setSelectedEvent] = useState<IRestaurant>(lunch[0])
	const [selectedEventItinerary, setSelectedEventItinerary] =
		useState<IRestaurant>(lunchItinerary[0])

	const NoLunch = lunch.length === 0
	// if (NoLunch) return NoLunch

	useEffect(() => {
		if (lunch.length === 1) {
			setSelectedEvent(lunch[0])
		}
		if (lunch.length === 0) {
			dispatch({
				type: 'UPDATE_PROGRAM_MEALS_COST',
				payload: {
					date,
					restaurant: null,
					pax: pax,
					type: 'lunch'
				}
			})
		}
	}, [lunch])

	return (
		<>
			<LunchItineraryRow
				date={date}
				items={lunchItinerary}
				pax={pax}
				selectedEvent={selectedEventItinerary}
				setSelectedEvent={setSelectedEventItinerary}
			/>
			<EventTransferRow
				transfer={selectedEvent?.transfer || []}
				date={date}
				id="transfer_lunch"
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
			{selectedEvent &&
				selectedEvent.entertainment &&
				selectedEvent.entertainment.length > 0 && (
					<ShowRows
						date={date}
						typeOfEvent="lunch"
						entertainment={selectedEvent.entertainment}
						selectedRestaurant={selectedEvent}
					/>
				)}
		</>
	)
}
