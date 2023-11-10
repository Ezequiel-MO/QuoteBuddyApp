import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TableHeaders } from '../../../../../ui'
import { MeetingTableRow } from "./MeetingTableRow"
import { useDragAndDropSchedule } from './useDragAndDropSchedule'

export const TableMeeting = () => {

    const { removeEventFromSchedule, currentProject } = useCurrentProject()
    const handleDeleteEvent = (dayOfEvent: string, timeOfEvent: string, eventId: string) => {
        removeEventFromSchedule({ dayOfEvent, timeOfEvent, eventId })
        toast.success('Event Removed', toastOptions)
    }

    const { events } = useDragAndDropSchedule()

    return (
        <table className="table-auto border-collapse border-2 border-white-0 text-white-0">
            <TableHeaders headers='projectBaseMeeting' showFullDayMeetings={true} />
            <tbody>
                {
                    currentProject.schedule.map((day, index) => {
                        return (
                            <MeetingTableRow
                                key={day._id}
                                day={day}
                                index={index}
                                handleDeleteEvent={handleDeleteEvent}
                            />
                        )
                    })
                }
            </tbody>
        </table>
    )
}