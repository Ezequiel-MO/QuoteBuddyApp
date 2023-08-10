import { headerItems } from '../constants'

export const TableHeaders = ({ headers, showFullDayMeetings }) => {
	if (!headers) return null

	const projectBaseHeaders = showFullDayMeetings
		? headerItems[headers]
		: headerItems[headers].filter((header) => header !== 'All Day Meetings')

	return (
		<thead className="text-white-50 text-left font-bold border-b">
			<tr>
				{projectBaseHeaders.map((item, index) => (
					<th key={`${item}${index}`}>{item}</th>
				))}
			</tr>
		</thead>
	)
}
