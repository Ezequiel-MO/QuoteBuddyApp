import { IProject } from '@interfaces/project'
import { useCurrentProject } from 'src/hooks'
import * as styles from '../../../constants/mainsectionStyles'
import { convertDate } from 'src/helper/dates/date-formatters-converters'

interface Props {
	date: string
	index: number
	arrivalDay: string
}

export const DateHeader = ({ date, index, arrivalDay }: Props) => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { clientAccManager = [] } = currentProject || {}
	const { quoteLanguage = 'EN' } = clientAccManager[0] || {}

	const formattedDate = convertDate(index, arrivalDay, quoteLanguage)

	return (
		<h2 className={styles.pageDateHeader} id={`day_${index}`}>
			{date} - {formattedDate}
		</h2>
	)
}
