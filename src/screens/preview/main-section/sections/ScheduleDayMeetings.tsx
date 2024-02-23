import { IMeeting } from '@interfaces/meeting'
import { MeetingCard } from '../cards/MeetingCard'
import { ScheduleItemLayout } from '../layout/ScheduleItemLayout'

interface Props {
	id: string
	title: string
	meetings: IMeeting[]
	timing: string
	suplementaryText: boolean
}

export const ScheduleDayMeetings = ({ id, title, meetings, timing }: Props) => {
	if (meetings?.length === 0) return null
	return (
		<ScheduleItemLayout
			id={id}
			icon="healthicons:group-discussion-meetingx3-outline"
			title={`${title} options`}
		>
			{meetings?.map((meeting) => (
				<MeetingCard key={meeting._id} meeting={meeting} timing={timing} />
			))}
		</ScheduleItemLayout>
	)
}
