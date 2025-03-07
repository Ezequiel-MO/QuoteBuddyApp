import { IMeeting } from '@interfaces/meeting'
import { MeetingCard } from '../cards/MeetingCard'
import { ScheduleItemLayout } from '../layout/ScheduleItemLayout'
import { useCurrentProject } from 'src/hooks'
import { IHotel } from '@interfaces/hotel'
import TabbedContent from '@components/molecules/tabs/TabbedContent'

interface Props {
	id: string
	title: string
	meetings: IMeeting[]
	timing: string
	suplementaryText: boolean
}

export const ScheduleDayMeetings = ({ id, title, meetings, timing }: Props) => {
	const { currentProject } = useCurrentProject()

	if (meetings?.length === 0) return null

	const hotelNameMeetings = meetings.map(el => el.hotelName)

	const hotelMeetings = currentProject.hotels.filter((hotel) =>
		hotelNameMeetings.some((meetingName) => hotel.name.includes(meetingName))
	)

	return (
		<ScheduleItemLayout
			id={id}
			icon="healthicons:group-discussion-meetingx3-outline"
			title={`${title} options`}
		>
			<TabbedContent
				items={hotelMeetings}
				type='Hotel'
				renderItem={(meeting, index, isActive) => (
					<MeetingCard key={meeting._id} timing={timing} hotelMeeting={meeting} isActive={isActive} />
				)}
			/>
		</ScheduleItemLayout>
	)
}
