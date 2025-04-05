import { listStyles } from 'src/constants/listStyles'
import { HeaderItems, headerItems } from '../../../constants'

interface Props {
	headers: keyof HeaderItems
	showFullDayMeetings?: boolean
}

export const TableHeaders = ({
	headers,
	showFullDayMeetings = false
}: Props) => {
	if (!headers) return null

	const projectBaseHeaders = showFullDayMeetings
		? headerItems[headers]
		: headerItems[headers]?.filter((header) => header !== 'All Day Meetings')

	return (
		<thead className={listStyles.thead}>
			<tr >
				{projectBaseHeaders?.map((item, index) => (
					<th key={`${item}${index}`} align="left" className={listStyles.th}>
						{item}
					</th>
				))}
			</tr>
		</thead>
	)
}
