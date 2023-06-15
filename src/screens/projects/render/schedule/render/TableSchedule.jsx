import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TableHeaders } from '../../../../../ui'
import { DayEvents } from './DayEvents'
import { DayMeals } from './DayMeals'

export const TableSchedule = () => {
	const { currentProject, removeEventFromSchedule } = useCurrentProject()
	const { updatedAt } = currentProject

	const legacyProject = updatedAt < '2023-06-15T11:52:28.691Z'

	const handleDeleteEvent = (dayOfEvent, timeOfEvent, eventId) => {
		removeEventFromSchedule({ dayOfEvent, timeOfEvent, eventId })
		toast.success('Event Removed', toastOptions)
	}

	return (
		<table className="table-auto border-collapse border-2 border-white-0 text-white-0">
			<TableHeaders headers="projectBase" />
			<tbody>
				{currentProject['schedule']?.map((day, index) => (
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
						<td>
							<DayEvents
								day={day}
								event="fullDayMeetings"
								handleDeleteEvent={handleDeleteEvent}
								dayIndex={index}
								renderAddCard={false}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}
