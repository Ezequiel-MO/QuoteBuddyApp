import { FC } from "react"
import { DayMeetings } from "./DayMeetings"
import {IDay} from "src/interfaces"

interface MeetingTableRowProps {
    day: IDay
    index: number
    handleDeleteEvent: (dayOfEvent: string, timeOfEvent: string, eventId: string) => void
}

export const MeetingTableRow: FC<MeetingTableRowProps> = ({ day, index, handleDeleteEvent }) => {
    return (
        <tr key={day._id} className="border border-white-100">
            <td>{day.date}</td>
            <td>
                <DayMeetings
                    day={day}
                    event="morningMeetings"
                    handleDeleteEvent={handleDeleteEvent}
                    dayIndex={index}
                />
            </td>
            <td>
                <DayMeetings
                    day={day}
                    event="afternoonMeetings"
                    handleDeleteEvent={handleDeleteEvent}
                    dayIndex={index}
                />
            </td>
            <td>
                <DayMeetings
                    day={day}
                    event="fullDayMeetings"
                    handleDeleteEvent={handleDeleteEvent}
                    dayIndex={index}
                />
            </td>
        </tr>
    )
}