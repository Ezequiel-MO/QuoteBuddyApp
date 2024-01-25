import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { formatMoney } from '../../../helper'
import { IProject } from '@interfaces/project'
import { ProjectListActions } from './ProjectListActions'
import { listStyles } from 'src/constants/listStyles'

interface Props {
	project: IProject
	handleRecycleProject: (projectId: string) => void
	projects: IProject[]
	setProjects: React.Dispatch<React.SetStateAction<IProject[]>>
}

export const ProjectListItem = ({
	project,
	handleRecycleProject,
	projects,
	setProjects
}: Props) => {
	const navigate = useNavigate()

	return (
		<tbody className={listStyles.tbody}>
			<tr className={listStyles.tr}>
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
				<td className={`${listStyles.td} truncate w-32`}>
					{project.groupLocation}
				</td>
				<td className={`${listStyles.td} truncate w-32`}>
					{project.groupName}
				</td>
				<td className={`${listStyles.td} truncate w-12`}>{project.nrPax}</td>
				<td className={`${listStyles.td} truncate w-32`}>
					{project.arrivalDay}
				</td>
				<td className={`${listStyles.td} truncate w-32`}>
					{project.departureDay}
				</td>
				<td className="truncate w-24">{project.status}</td>
				<td className="truncate w-24">{formatMoney(project.estimate)}</td>
				<td className="cursor-pointer w-12 text-center">
					<ProjectListActions
						project={project}
						projects={projects}
						setProjects={setProjects}
						handleRecycleProject={handleRecycleProject}
					/>
				</td>
			</tr>
		</tbody>
	)
}
