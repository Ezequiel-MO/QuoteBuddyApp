import { IEvent } from '@interfaces/event'
import { Events } from '../cardswrappers/Events'
import { ScheduleItemLayout } from '../layout/ScheduleItemLayout'
import { Icon } from '@iconify/react'

interface Props {
	id: string
	title: string
	events: IEvent[]
	suplementaryText: boolean
	introduction: string
}

export const ScheduleDayActivities = ({
	id,
	title,
	events,
	suplementaryText,
	introduction
}: Props) => {
	if (!events.length) {
		return suplementaryText ? (
			<div className="py-3 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
				<div className="flex items-center text-gray-500 dark:text-gray-400">
					<Icon
						icon="mdi:information-outline"
						className="mr-2 text-orange-500"
						width={20}
						height={20}
					/>
					<h3 className="text-sm font-medium">{`No ${title.toLowerCase()} planned`}</h3>
				</div>
			</div>
		) : null
	}

	return (
		<ScheduleItemLayout
			id={id}
			icon="ion:ticket-outline"
			title={`${title} options`}
			introduction={introduction}
		>
			<div className="mt-4">
				<Events events={events} />
			</div>
		</ScheduleItemLayout>
	)
}
