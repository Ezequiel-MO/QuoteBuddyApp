import { IProject } from '@interfaces/project'
import { useCurrentProject } from '../../../../../hooks'
import { TableHeaders } from '../../../../../ui'

export const ScheduleHeader = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	return (
		<table className="w-full text-base text-left text-gray-300">
			<TableHeaders headers="schedule" />
			<tbody>
				<tr className="bg-gray-700 border-gray-600">
					<td>{currentProject['code']}</td>
					<td>{currentProject['arrivalDay']}</td>
					<td>{currentProject['departureDay']}</td>
					<td>{currentProject['groupName']}</td>
					<td>{currentProject['groupLocation']}</td>
					<td>{currentProject['nrPax']}</td>
				</tr>
			</tbody>
		</table>
	)
}
