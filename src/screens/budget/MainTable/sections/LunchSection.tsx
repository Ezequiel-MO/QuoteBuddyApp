import { useState, useEffect } from 'react'
import { IEvent, IRestaurant } from '../../../../interfaces'
import { EventTransferRow, LunchRow } from '../rows/meals_activities'
import { ShowRows } from '../rows/shows/ShowRows'
import { LunchItineraryRow } from '../rows/itinerary/LunchItineraryRow'
import { useCurrentProject } from 'src/hooks'
import { UpdateProgramMealsCostPayload } from 'src/redux/features/currentProject/types'
import { SectionHeader } from './SectionHeader'

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
	const { updateBudgetProgramMealsCost } = useCurrentProject()

	const [selectedEvent, setSelectedEvent] = useState<IRestaurant>(lunch[0])
	const [selectedEventItinerary, setSelectedEventItinerary] =
		useState<IRestaurant>(lunchItinerary[0])

	useEffect(() => {
		if (lunch.length === 1) {
			setSelectedEvent(lunch[0])
		}
		if (lunch.length === 0) {
			const payload: UpdateProgramMealsCostPayload = {
				date,
				restaurant: null,
				pax,
				type: 'lunch'
			}
			updateBudgetProgramMealsCost(payload)
		}
	}, [lunch])

	const hasAnyContent = lunch.length > 0 || lunchItinerary.length > 0

	if (!hasAnyContent) return null

	return (
		<>
			{/* Section Header */}
			<SectionHeader title="Lunch" type="meal" />

			{/* Itinerary Lunch */}
			{lunchItinerary.length > 0 && (
				<LunchItineraryRow
					date={date}
					items={lunchItinerary}
					pax={pax}
					selectedEvent={selectedEventItinerary}
					setSelectedEvent={
						setSelectedEventItinerary as React.Dispatch<
							React.SetStateAction<IRestaurant | IEvent>
						>
					}
				/>
			)}

			{/* Lunch Transfers */}
			{selectedEvent?.transfer && selectedEvent.transfer.length > 0 && (
				<EventTransferRow
					transfer={selectedEvent?.transfer || []}
					date={date}
					id="transfer_lunch"
					selectedEvent={selectedEvent}
				/>
			)}

			{/* Lunch Restaurant */}
			{lunch.length > 0 && (
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
			)}

			{/* Entertainment during lunch if applicable */}
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
