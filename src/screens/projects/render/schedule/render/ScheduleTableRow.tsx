import { FC } from 'react'
import { DayEvents } from './DayEvents'
import { DayMeals } from './DayMeals'
import { IDay } from 'src/interfaces'

interface ScheduleTableRowProps {
	day: IDay
	index: number
	handleDeleteEvent: (
		dayIndex: number,
		timeOfEvent: string,
		eventId: string
	) => void
}

export const ScheduleTableRow: FC<ScheduleTableRowProps> = ({
	day,
	index,
	handleDeleteEvent
}) => {
	return (
		<div className="grid grid-cols-9 gap-2 border border-gray-600 bg-gray-800 rounded-lg overflow-hidden">
			<div className="p-2 col-span-1 bg-gray-700 border border-gray-600">
				{day.date}
			</div>
			<div className="p-2 col-span-2">
				<DayEvents
					day={day}
					event="morningEvents"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
				/>
			</div>
			<div className="p-2 col-span-2">
				<DayMeals
					day={day}
					event="lunch"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
				/>
			</div>
			<div className="p-2 col-span-2">
				<DayEvents
					day={day}
					event="afternoonEvents"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
				/>
			</div>
			<div className="p-2 col-span-2">
				<DayMeals
					day={day}
					event="dinner"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
				/>
			</div>
		</div>
	)
}
