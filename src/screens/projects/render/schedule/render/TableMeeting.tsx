import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TableHeaders } from '../../../../../ui'
import { MeetingTableRow } from './MeetingTableRow'
import { TimeOfEvent } from 'src/redux/features/currentProject/types'

export const TableMeeting = () => {
	const { removeEventFromSchedule, currentProject } = useCurrentProject()
	const handleDeleteEvent = (
		dayIndex: number,
		timeOfEvent: TimeOfEvent,
		eventId: string
	) => {
		removeEventFromSchedule({ dayIndex, timeOfEvent, eventId })
		toast.success('Event Removed', toastOptions)
	}

	return (
		<table className="table-auto border-collapse border-2 border-white-0 text-white-0">
			<TableHeaders headers="projectBaseMeeting" showFullDayMeetings={true} />
			<tbody>
				{currentProject.schedule.map((day, index) => {
					return (
						<MeetingTableRow
							key={day._id}
							day={day}
							index={index}
							handleDeleteEvent={handleDeleteEvent}
						/>
					)
				})}
			</tbody>
		</table>
	)
}
