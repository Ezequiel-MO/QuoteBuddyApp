import { useState, useEffect } from 'react'
import { IEvent, IRestaurant } from '../../../../interfaces'
import { ShowRows } from '../rows/shows/ShowRows'
import { DinnerRow, EventTransferRow } from '../rows/meals_activities'
import { DinnerItineraryRow } from '../rows/itinerary/DinnerItineraryRow'
import { useCurrentProject } from 'src/hooks'
import {
	UpdateProgramMealsCostPayload,
	UpdateProgramShowsCostPayload
} from 'src/redux/features/currentProject/types'

interface DinnerSectionProps {
	dinners: IRestaurant[]
	dinnersItinerary: IRestaurant[]
	date: string
	pax: number
}

export const DinnerSection = ({
	dinners,
	dinnersItinerary,
	date,
	pax
}: DinnerSectionProps) => {
	const [selectedEvent, setSelectedEvent] = useState<IRestaurant>(dinners[0])
	const [selectedEventItinerary, setSelectedEventItinerary] =
		useState<IRestaurant>(dinnersItinerary[0])

	const { updateBudgetProgramMealsCost, updateBudgetProgramShowCost } =
		useCurrentProject()

	useEffect(() => {
		if (dinners.length === 1) {
			setSelectedEvent(dinners[0])
		}
		if (dinners.length === 0) {
			const payoad: UpdateProgramMealsCostPayload = {
				date,
				restaurant: null,
				pax,
				type: 'dinner'
			}
			updateBudgetProgramMealsCost(payoad)
		}
	}, [dinners])

	const shouldRenderEntertainmentRow = selectedEvent?.entertainment?.length

	useEffect(() => {
		if (!shouldRenderEntertainmentRow) {
			const payload: UpdateProgramShowsCostPayload = {
				date,
				show: null,
				type: 'dinner'
			}
			updateBudgetProgramShowCost(payload)
		}
	}, [shouldRenderEntertainmentRow, date])

	const renderEntertainmentRow = (selectedEvent: IRestaurant) => {
		if (selectedEvent?.isVenue && selectedEvent?.entertainment?.length) {
			return (
				<ShowRows
					date={date}
					entertainment={selectedEvent.entertainment}
					typeOfEvent="dinner"
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
				setSelectedEvent={
					setSelectedEventItinerary as React.Dispatch<
						React.SetStateAction<IRestaurant | IEvent>
					>
				}
			/>

			<EventTransferRow
				transfer={selectedEvent?.transfer || []}
				date={date}
				id="transfer_dinner"
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
