import { toast } from 'react-toastify'
import { toastOptions , errorToastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TableHeaders } from '../../../../../ui'
import { MeetingTableRow } from './MeetingTableRow'
import { TimeOfEvent, TimeOfMeeting } from 'src/redux/features/currentProject/types'

export const TableMeeting = () => {
	const { removeEventFromSchedule, currentProject, removeMeetingFromSchedule } = useCurrentProject()
	const handleDeleteEvent = (
		dayIndex: number,
		timeOfEvent: TimeOfEvent,
		eventId: string
	) => {
		// removeEventFromSchedule({ dayIndex, timeOfEvent, eventId })
		try{
			removeMeetingFromSchedule({ dayIndex: dayIndex, meetingId: eventId, timeOfMeeting: timeOfEvent })
			toast.success('Meeting Removed', toastOptions)
		}catch(error:any){
			//aca puedo guardar el error en la data base
			toast.error(error.message , errorToastOptions)
		}
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
