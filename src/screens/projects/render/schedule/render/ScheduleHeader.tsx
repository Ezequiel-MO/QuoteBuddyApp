import { IProject } from '@interfaces/project'
import { useCurrentProject } from '../../../../../hooks'
import { TableHeaders } from '../../../../../ui'

export const ScheduleHeader = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	return (
		<table className="table-auto border-collapse border border-white-50 text-white-50">
			<TableHeaders headers="schedule" />
			<tbody>
				<tr className="border-b border-white-50 text-left">
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
