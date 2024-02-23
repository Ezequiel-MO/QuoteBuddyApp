import { IHotel } from '@interfaces/hotel'
import { Hotels } from '../cardswrappers/Hotels'
import { ScheduleItemLayout } from '../layout/ScheduleItemLayout'

interface Props {
	id: string
	introduction: string
	overnight: IHotel[]
}

export const ScheduleDayOvernight = ({
	id,
	introduction,
	overnight
}: Props) => {
	if (overnight.length === 0) return null
	return (
		<ScheduleItemLayout
			id={id}
			icon="tabler:hotel-service"
			title={`Accommodation options`}
			introduction={introduction}
		>
			<Hotels hotels={overnight} />
		</ScheduleItemLayout>
	)
}
