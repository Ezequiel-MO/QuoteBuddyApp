import { DayEvents } from './DayEvents'
import { DayMeals } from './DayMeals'

export const ScheduleTableRow = ({
	day,
	index,
	handleDeleteEvent,
	legacyProject
}) => (
	<tr key={day._id} className="border border-white-100">
		<td>{day.date}</td>
		<td>
			<DayEvents
				day={day}
				event="morningEvents"
				handleDeleteEvent={handleDeleteEvent}
				dayIndex={index}
			/>
			<DayEvents
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
				legacyProject={legacyProject}
			/>
		</td>
		<td>
			<DayEvents
				day={day}
				event="afternoonEvents"
				handleDeleteEvent={handleDeleteEvent}
				dayIndex={index}
			/>
			<DayEvents
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
				legacyProject={legacyProject}
			/>
		</td>
		{day.fullDayMeetings && day.fullDayMeetings.length > 0 && (
			<td className="border-t-2 border-b-2 border-white-100 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
				<DayEvents
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
