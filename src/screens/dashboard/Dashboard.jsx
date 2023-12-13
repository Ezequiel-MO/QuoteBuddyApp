import { useEffect } from 'react'
import { useCurrentProject } from '../../hooks/redux/useCurrentProject'
import { ProjectList } from '../projects/list'
import { useGetProject } from '../../hooks'
import { toast } from 'react-toastify'
import { toastOptions } from '../../helper/toast'

const Dashboard = () => {
	const { currentProject, setCurrentProject } = useCurrentProject()
	const currentProjectIsLive = Object.keys(currentProject).length !== 0
	const { project, error } = useGetProject(
		currentProjectIsLive ? currentProject._id : null
	)

	useEffect(() => {
		if (project) {
			setCurrentProject(project)
		}
	}, [project, setCurrentProject])

	if (error) {
		toast.error(error.message, toastOptions)
	}

	return (
		<div className="flex flex-row" data-testid="dashboard">
			<ProjectList />
		</div>
	)
}

export default Dashboard
