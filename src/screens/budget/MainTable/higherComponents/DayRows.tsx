import { analyzeItinerary } from 'src/helper/budget/budgetHelpers'

import {
	AfternoonSection,
	DinnerSection,
	LunchSection,
	MorningSection,
	TransfersInSection,
	TransfersOutSection
} from '../sections'
import { TransferItinerarySection } from '../sections/TransferItinerarySection'
import { IDay } from '@interfaces/project'

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
					starts={day.itinerary.starts}
					ends={day.itinerary.ends}
				/>
			)}
			{isFirstDay && (
				<TransfersInSection transfers={day.transfer_in} date={day.date} />
			)}
			<MorningSection
				events={day.morningEvents?.events}
				eventsItinerary={
					isItineraryWithMorningActivities
						? day.itinerary.morningActivity?.events
						: []
				}
				meetings={day.morningMeetings?.meetings || []}
				date={day.date}
				pax={pax}
				multiDestination={multiDestination}
			/>
			{isAfternoonItinerary && (
				<TransferItinerarySection
					date={day.date}
					transfers={day.itinerary.itinerary}
					type={day.itinerary.starts}
					starts={day.itinerary.starts}
					ends={day.itinerary.ends}
				/>
			)}
			<LunchSection
				lunch={day.lunch?.restaurants}
				lunchItinerary={
					isItineraryWithLunch ? day.itinerary.lunch?.restaurants : []
				}
				date={day.date}
				pax={pax}
			/>
			<AfternoonSection
				events={day.afternoonEvents?.events}
				eventsItinerary={
					isItineraryWithAfternoonActivities
						? day.itinerary.afternoonActivity?.events
						: []
				}
				meetings={day.afternoonMeetings?.meetings || []}
				fullDayMeetings={day.fullDayMeetings?.meetings || []}
				date={day.date}
				pax={pax}
				multiDestination={multiDestination}
			/>
			<DinnerSection
				dinners={day.dinner?.restaurants}
				dinnersItinerary={
					isItineraryWithDinner ? day.itinerary.dinner?.restaurants : []
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
