import {
	IActivity,
	IDay,
	IItinerary,
	IMeal,
	IMeetingDetails,
	IOvernight
} from '@interfaces/project'
import * as styles from '../../../constants/mainsectionStyles'
import { DateHeader } from './DateHeader'

interface Props {
	day: IDay
	index: number
	suplementaryText: boolean
	arrivalDay: string
}

export type RenderedItem = {
	id: string
	title: string
	events: IMeal | IActivity | IOvernight | IMeetingDetails | IItinerary
	timing?: 'Morning' | 'Afternoon' | 'Full Day'
}
export const ScheduleDay = ({
	day,
	index,
	suplementaryText,
	arrivalDay
}: Props) => {
	return (
		<div className="mb-8 last:mb-0">
			<div className={styles.dayPage} id={`${day.date}_id`}>
				<DateHeader date={day.date} index={index} arrivalDay={arrivalDay} />
			</div>
			<hr className={styles.pageBottomBorder} />
		</div>
	)
}
