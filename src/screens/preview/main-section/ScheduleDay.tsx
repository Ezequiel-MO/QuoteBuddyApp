import { IDay } from '@interfaces/project'
import * as styles from '../../../constants/mainsectionStyles'
import { DateHeader } from './DateHeader'
import { useScheduleFilter } from './useScheduleFilter'
import DayContentRenderer from './DayContentRenderer'

interface Props {
	day: IDay
	index: number
	suplementaryText: boolean
	arrivalDay: string
}

export const ScheduleDay = ({
	day,
	index,
	suplementaryText,
	arrivalDay
}: Props) => {
	const itemsToRender = useScheduleFilter(day)
	return (
		<div className="mb-8 last:mb-0 text-black-50" id={`${day.date}_id`}>
			<div className={styles.dayPage}>
				<DateHeader date={day.date} index={index} arrivalDay={arrivalDay} />
				<DayContentRenderer
					items={itemsToRender}
					day={day}
					suplementaryText={suplementaryText}
				/>
			</div>
			<hr className={styles.pageBottomBorder} />
		</div>
	)
}
