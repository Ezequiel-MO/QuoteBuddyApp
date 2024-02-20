import { IDay } from '@interfaces/project'
import * as styles from '../../../constants/mainsectionStyles'
import { DateHeader } from './DateHeader'
import { useScheduleFilter } from './useScheduleFilter'
import { renderItem } from './utils/renderScheduleItem'

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
		<div className="mb-8 last:mb-0" id={`${day.date}_id`}>
			<div className={styles.dayPage}>
				<DateHeader date={day.date} index={index} arrivalDay={arrivalDay} />
				{itemsToRender.map((item) => renderItem(item, suplementaryText, day))}
			</div>
			<hr className={styles.pageBottomBorder} />
		</div>
	)
}
