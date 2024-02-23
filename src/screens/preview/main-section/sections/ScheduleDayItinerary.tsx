import { ScheduleItemLayout } from '../layout/ScheduleItemLayout'

interface Props {
	id: string
	introduction: string
}

export const ScheduleDayItinerary = ({ id, introduction }: Props) => {
	return (
		<ScheduleItemLayout
			id={id}
			icon="tdesign:vehicle"
			title={`Itinerary - Transfer Details`}
			introduction={introduction}
		></ScheduleItemLayout>
	)
}
