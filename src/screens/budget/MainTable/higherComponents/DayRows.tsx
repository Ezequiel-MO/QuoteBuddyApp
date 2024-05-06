import { analyzeItinerary } from 'src/helper/budget/budgetHelpers'
import { IDay } from '../../../../interfaces'

import {
	AfternoonSection,
	DinnerSection,
	LunchSection,
	MorningSection,
	TransfersInSection,
	TransfersOutSection
} from '../sections'
import { TransferItinerarySection } from '../sections/TransferItinerarySection'

interface DayRowsProps {
	day: IDay
	pax: number
	isFirstDay: boolean
	isLastDay: boolean
	multiDestination: boolean
}

export const DayRows = ({
	day,
	pax,
	isFirstDay,
	isLastDay,
	multiDestination
}: DayRowsProps) => {
	const {
		isMorningItinerary = false,
		isAfternoonItinerary = false,
		isItineraryWithMorningActivities = false,
		isItineraryWithAfternoonActivities = false,
		isItineraryWithLunch = false,
		isItineraryWithDinner = false
	} = analyzeItinerary(day.itinerary, multiDestination)

	return (
		<>
			{isMorningItinerary && (
				<TransferItinerarySection
					date={day.date}
					transfers={day.itinerary.itinerary}
					type={day.itinerary.starts}
				/>
			)}
			{isFirstDay && (
				<TransfersInSection transfers={day.transfer_in} date={day.date} />
			)}
			<MorningSection
				events={
					isItineraryWithMorningActivities
						? day.itinerary.morningActivity.events
						: day.morningEvents.events
				}
				meetings={day.morningMeetings?.meetings || []}
				date={day.date}
				pax={pax}
				multiDestination={multiDestination}
			/>
			<LunchSection
				lunch={
					isItineraryWithLunch
						? day.itinerary.lunch.restaurants
						: day.lunch?.restaurants
				}
				date={day.date}
				pax={pax}
			/>
			{isAfternoonItinerary && (
				<TransferItinerarySection
					date={day.date}
					transfers={day.itinerary.itinerary}
					type={day.itinerary.starts}
				/>
			)}
			<AfternoonSection
				events={
					isItineraryWithAfternoonActivities
						? day.itinerary.afternoonActivity.events
						: day.afternoonEvents?.events
				}
				meetings={day.afternoonMeetings?.meetings || []}
				fullDayMeetings={day.fullDayMeetings?.meetings || []}
				date={day.date}
				pax={pax}
				multiDestination={multiDestination}
			/>
			<DinnerSection
				dinners={
					isItineraryWithDinner
						? day.itinerary.dinner.restaurants
						: day.dinner?.restaurants
				}
				date={day.date}
				pax={pax}
			/>
			{isLastDay && (
				<TransfersOutSection transfers={day.transfer_out} date={day.date} />
			)}
		</>
	)
}
