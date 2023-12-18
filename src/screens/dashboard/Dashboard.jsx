import { useEffect } from 'react'
import { useCurrentProject } from '../../hooks/redux/useCurrentProject'
import { ProjectList } from '../projects/list'
import { useFetchProjects } from 'src/hooks/fetchData'
import { Spinner } from '@components/atoms'

const Dashboard = () => {
	const { currentProject, setCurrentProject } = useCurrentProject()
	const currentProjectIsLive = Object.keys(currentProject).length !== 0
	const { project, isLoading } = useFetchProjects({
		id: currentProjectIsLive ? currentProject._id : null
	})

	useEffect(() => {
		if (project) {
			setCurrentProject(project)
		}
	}, [project, setCurrentProject])

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div className="flex flex-row" data-testid="dashboard">
			<ProjectList />
		</div>
	)
}

export default Dashboard
