import { DayEvents } from './DayEvents'
import { DayMeals } from './DayMeals'
import { DayMeetings } from "./DayMeetings"

export const ScheduleTableRow = ({ day, index, handleDeleteEvent }) => {
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
				<h1>Meetings</h1>
				<DayMeetings
					day={day}
					event="morningMeetings"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
					renderAddCard={false}
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
				<h1>Meetings</h1>
				<DayMeetings
				day={day}
				event="afternoonMeetings"
				handleDeleteEvent={handleDeleteEvent}
				dayIndex={index}
				renderAddCard={false}
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
			{day.fullDayMeetings?.meetings && day.fullDayMeetings?.meetings.length > 0 && (
				<td className="border-t-2 border-b-2 border-white-100 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
					<DayMeetings
					day={day}
					event="fullDayMeetings"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
					renderAddCard={false}
				/>
				</td>
			)}
		</tr>
	)
}
