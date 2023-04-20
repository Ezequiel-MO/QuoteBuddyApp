import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks'
import { ButtonDeleted } from '../../../components/atoms'
import { formatMoney } from '../../../helper'

export const ProjectListItem = ({
	project,
	handleRecycleProject,
	projects,
	setProjects
}) => {
	const navigate = useNavigate()

	const { auth } = useAuth()

	return (
		<tbody>
			<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
				<td
					className="cursor-pointer w-12 text-center"
					onClick={() => handleRecycleProject(project._id)}
				>
					<Icon icon="ic:round-system-update-alt" color="#ea5933" />
				</td>
				<td
					onClick={() =>
						navigate(`/app/project/specs`, {
							state: { project }
						})
					}
					className="hover:text-blue-600 hover:underline cursor-pointer truncate w-24"
				>
					{project.code}
				</td>
				<td className="truncate w-32">{project.groupLocation}</td>
				<td className="truncate w-32">{project.groupName}</td>
				<td className="truncate w-12">{project.nrPax}</td>
				<td className="truncate w-32">{project.arrivalDay}</td>
				<td className="truncate w-32">{project.departureDay}</td>
				<td className="truncate w-24">{project.status}</td>
				<td className="truncate w-24">{formatMoney(project.estimate)}</td>
				<td className="cursor-pointer w-12 text-center">
					{auth.role === 'admin' && (
						<ButtonDeleted
							endpoint={'projects'}
							ID={project._id}
							setter={setProjects}
							items={projects}
						/>
					)}
				</td>
			</tr>
		</tbody>
	)
}
