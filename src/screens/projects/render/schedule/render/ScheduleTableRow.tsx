import { FC } from 'react'
import { DayEvents } from './DayEvents'
import { DayMeals } from './DayMeals'
import { IDay } from 'src/interfaces'

interface ScheduleTableRowProps {
	day: IDay
	index: number
	handleDeleteEvent: (
		dayOfEvent: string,
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
		<tr key={day._id} className="border border-gray-600 bg-gray-800">
			<td className="px-4 py-2 text-white-0 text-sm font-medium bg-gray-700 border border-gray-600">
				{day.date}
			</td>

			<td className="p-2">
				<DayEvents
					day={day}
					event="morningEvents"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
				/>
			</td>
			<td className="p-2">
				<DayMeals
					day={day}
					event="lunch"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
				/>
			</td>
			<td className="p-2">
				<DayEvents
					day={day}
					event="afternoonEvents"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
				/>
			</td>
			<td className="p-2">
				<DayMeals
					day={day}
					event="dinner"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
				/>
			</td>
		</tr>
	)
}
