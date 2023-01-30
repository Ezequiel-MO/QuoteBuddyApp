import { Icon } from '@iconify/react'
import accounting from 'accounting'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks'
import { ButtonDeleted } from '../../../components/atoms'

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
					className="cursor-pointer"
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
					className="hover:text-blue-600 hover:underline cursor-pointer"
				>
					{project.code}
				</td>
				<td>{project.groupLocation}</td>
				<td>{project.groupName}</td>
				<td>{project.nrPax}</td>
				<td>{project.arrivalDay}</td>
				<td>{project.departureDay}</td>
				<td>{project.status}</td>
				<td>{accounting.formatMoney(project.estimate, '€')}</td>
				<td className="cursor-pointer">
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
