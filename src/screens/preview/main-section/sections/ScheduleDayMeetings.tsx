import { IMeeting } from '@interfaces/meeting'
import { MeetingCard } from '../cards/MeetingCard'
import { ScheduleItemLayout } from '../layout/ScheduleItemLayout'
import { useCurrentProject } from 'src/hooks'
import TabbedContent from '@components/molecules/tabs/TabbedContent'
import { Icon } from '@iconify/react'

interface Props {
	id: string
	title: string
	meetings: IMeeting[]
	timing: string
	suplementaryText: boolean
}

export const ScheduleDayMeetings = ({
	id,
	title,
	meetings,
	timing,
	suplementaryText
}: Props) => {
	const { currentProject } = useCurrentProject()

	if (meetings?.length === 0) {
		return suplementaryText ? (
			<div className="py-3 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
				<div className="flex items-center text-gray-500 dark:text-gray-400">
					<Icon
						icon="mdi:account-group-outline"
						className="mr-2 text-orange-500"
						width={20}
						height={20}
					/>
					<h3 className="text-sm font-medium">{`No ${title.toLowerCase()} planned`}</h3>
				</div>
			</div>
		) : null
	}

	const hotelNameMeetings = meetings.map((el) => el.hotelName)

	const hotelMeetings = currentProject.hotels.filter((hotel) =>
		hotelNameMeetings.some((meetingName) => hotel.name.includes(meetingName))
	)

	return (
		<ScheduleItemLayout
			id={id}
			icon="healthicons:group-discussion-meetingx3-outline"
			title={`${title} options`}
		>
			<div className="mt-4">
				<TabbedContent
					items={hotelMeetings}
					type="Hotel"
					renderItem={(meeting, index, isActive) => (
						<MeetingCard
							key={meeting._id}
							timing={timing}
							hotelMeeting={meeting}
							isActive={isActive}
						/>
					)}
				/>
			</div>
		</ScheduleItemLayout>
	)
}
