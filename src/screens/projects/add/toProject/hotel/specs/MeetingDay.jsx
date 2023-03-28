import { Icon } from '@iconify/react'
import { MeetingType } from './MeetingType'

export const MeetingDay = ({ index, day, handleMeeting }) => (
	<div
		key={day._id}
		className="flex flex-row items-center border border-orange-50 rounded-md border-dashed bg-black-50 p-2 my-2 ml-3 cursor-pointer"
	>
		<Icon icon="bi:arrow-return-right" color="white" width={30} />
		<div className="ml-3 text-white-100 grid grid-cols-1">
			<div className="uppercase">{day.date}</div>
			<MeetingType
				onClick={() =>
					handleMeeting(index, 'Morning Meeting', 'morningMeetings', day.date)
				}
				label="Morning Meeting"
				hasMeetings={day.morningMeetings.length > 0}
			/>
			<MeetingType
				onClick={() =>
					handleMeeting(
						index,
						'Afternoon Meeting',
						'afternoonMeetings',
						day.date
					)
				}
				label="Afternoon Meeting"
				hasMeetings={day.afternoonMeetings.length > 0}
			/>
			<MeetingType
				onClick={() =>
					handleMeeting(index, 'All day', 'fullDayMeetings', day.date)
				}
				label="All Day"
				hasMeetings={day.fullDayMeetings.length > 0}
			/>
		</div>
	</div>
)
