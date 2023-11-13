import { FC } from "react"
import { DayEvents } from './DayEvents'
import { DayMeals } from './DayMeals'
import { IDay } from "src/interfaces"

interface ScheduleTableRowProps {
	day: IDay
	index: number
	handleDeleteEvent: (dayOfEvent: string, timeOfEvent: string, eventId: string) => void
}

export const ScheduleTableRow: FC<ScheduleTableRowProps> = ({ day, index, handleDeleteEvent }) => {
	return (
		<tr key={day._id} className="border border-white-100">
			<td>{day.date}</td>
			<td>
				<DayEvents
					day={day}
					event="morningEvents"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
				/>
			</td>
			<td>
				<DayMeals
					day={day}
					event="lunch"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
				/>
			</td>
			<td>
				<DayEvents
					day={day}
					event="afternoonEvents"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
				/>
			</td>
			<td>
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
