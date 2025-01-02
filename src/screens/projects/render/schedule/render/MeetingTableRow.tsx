import { FC } from 'react'
import { DayMeetings } from './DayMeetings'
import { IDay } from 'src/interfaces'
import { TimeOfEvent } from 'src/redux/features/currentProject/types'

interface MeetingTableRowProps {
	day: IDay
	index: number
	handleDeleteEvent: (
		dayIndex: number,
		timeOfEvent: TimeOfEvent,
		eventId: string
	) => void
}

export const MeetingTableRow: FC<MeetingTableRowProps> = ({
	day,
	index,
	handleDeleteEvent
}) => {
	return (
		<tr key={day._id} className="border border-gray-600 bg-gray-800">
			<td className="px-4 py-2 w-[400px] text-white-0 text-sm font-medium bg-gray-700 border border-gray-600">
				{day.date}
			</td>
			<td className="p-2 w-[400px]">
				<DayMeetings
					day={day}
					event="morningMeetings"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
				/>
			</td>
			<td className="p-2 w-[400px]">
				<DayMeetings
					day={day}
					event="afternoonMeetings"
					handleDeleteEvent={handleDeleteEvent}
					dayIndex={index}
				/>
			</td>
			<td className="p-2 w-[400px]">
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
