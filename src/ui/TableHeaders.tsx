import { HeaderItems, headerItems } from '../constants'

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
		: headerItems[headers].filter((header) => header !== 'All Day Meetings')

	return (
		<thead className="text-xs text-gray-400 uppercase bg-gray-700">
			<tr>
				{projectBaseHeaders.map((item, index) => (
					<th key={`${item}${index}`}>{item}</th>
				))}
			</tr>
		</thead>
	)
}
