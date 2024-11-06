import { useNavigate } from 'react-router-dom'
import { formatMoney } from '../../../helper'
import { IProject } from '@interfaces/project'
import { listStyles } from 'src/constants/listStyles'
import { useProject } from '../context/ProjectContext'
import { ProjectListActions } from './ProjectListActions'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useCurrentProject } from 'src/hooks'

interface Props {
	item: IProject
	canBeAddedToProject: boolean
}

export const ProjectListItem = ({
	item: project,
	canBeAddedToProject = false
}: Props) => {
	const { dispatch } = useProject()
	const { setCurrentProject } = useCurrentProject()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const navigate = useNavigate()

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

	const handleNavigateToProjectSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		setCurrentProject(project)
		navigate('specs')
	}

	return (
		<tr className={`${listStyles.tr}`}>
			<td
				onClick={handleNavigateToProjectSpecs}
				className="hover:text-blue-600 hover:underline cursor-pointer truncate w-24"
			>
				{project.code}
			</td>
			<td className={`${listStyles.td} truncate w-32`}>
				{project.groupLocation}
			</td>
			<td className={`${listStyles.td} truncate w-32`}>
				{project?.clientCompany[0]?.name || project?.clientCompanyName}
			</td>
			<td className={`${listStyles.td} truncate w-32`}>{project.groupName}</td>
			<td className={`${listStyles.td} truncate w-12`}>{project.nrPax}</td>
			<td className={`${listStyles.td} truncate w-32`}>{project.arrivalDay}</td>
			<td className={`${listStyles.td} truncate w-32`}>
				{project.departureDay}
			</td>
			<td className="truncate w-24">{project.status}</td>
			<td className="truncate w-24">{formatMoney(project.estimate)}</td>
			<td className="w-2 relative">
				<div onClick={toggleMenu} className="menu-icon cursor-pointer">
					<Icon icon="mdi:dots-vertical" className="text-xl" />
				</div>

				{isMenuOpen && (
					<ProjectListActions
						project={project}
						isMenuOpen={isMenuOpen}
						toggleMenu={toggleMenu}
					/>
				)}
			</td>
		</tr>
	)
}
