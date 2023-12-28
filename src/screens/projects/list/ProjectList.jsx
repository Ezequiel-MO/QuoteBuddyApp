import { useState, useEffect } from 'react'
import baseAPI from '../../../axios/axiosConfig'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCurrentProject } from '../../../hooks'
import { toastOptions } from '../../../helper/toast'
import { TableHeaders } from '../../../ui'
import { Spinner } from '../../../components/atoms'
import { ProjectListItem } from './ProjectListItem'
import { ProjectInfo } from './ProjectInfo'
import { ProjectActionButton } from './ProjectActionButton'
import { SearchInput } from '../../../components/molecules/inputs/SearchInput'
import { useFetchProjects } from 'src/hooks/fetchData'

export const ProjectList = () => {
	const loadedProjects = useLoaderData()
	const navigate = useNavigate()
	const { projects, setProjects, isLoading } = useFetchProjects({
		initialProjects: loadedProjects
	})
	const [project] = useState({})
	const [searchItem, setSearchItem] = useState('')
	const { currentProject, clearProject, setCurrentProject } =
		useCurrentProject()
	const [foundProjects, setFoundProjects] = useState([])

	useEffect(() => {
		setFoundProjects(projects)
	}, [projects])

	const handleClearProject = () => {
		localStorage.removeItem('currentProject')
		clearProject()
		toast.success('Project cleared', toastOptions)
	}

	const handleNavigatetoProjectSpecs = () =>
		navigate('/app/project/specs', { state: { project } })

	const handleRecycleProject = async (projectId) => {
		try {
			const res = await baseAPI.get(`projects/${projectId}`)
			setCurrentProject(res.data.data.data)
			localStorage.setItem('currentProject', JSON.stringify(res.data.data.data))
			navigate('/app/project/schedule')
		} catch (error) {
			console.log(error)
		}
	}

	const filterList = (e) => {
		setSearchItem(e.target.value)
		const result = projects.filter(
			(data) =>
				data.code.toLowerCase().includes(e.target.value.toLowerCase()) ||
				data.groupName.toLowerCase().includes(e.target.value.toLowerCase()) ||
				data.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
				data.groupLocation.toLowerCase().includes(e.target.value.toLowerCase())
		)
		setFoundProjects(result)
		if (searchItem === '') {
			setFoundProjects(projects)
		}
	}

	return (
		<>
			<div className="flex flex-col w-full">
				<div className="flex flex-row items-center">
					<ProjectInfo code={currentProject.code || 'none'} />
					<ProjectActionButton
						action="new"
						handleClick={handleNavigatetoProjectSpecs}
					/>
					<ProjectActionButton
						action="clear"
						handleClick={handleClearProject}
					/>
					<SearchInput
						searchItem={searchItem}
						filterList={filterList}
						placeHolder="code, group name, status or location"
					/>
				</div>
				<hr />
				<div className="flex-1 my-1 flex-col">
					<table className="w-full p-5">
						<TableHeaders headers="project" />
						{isLoading ? (
							<Spinner />
						) : (
							foundProjects?.map((project) => (
								<ProjectListItem
									key={project._id}
									project={project}
									handleRecycleProject={handleRecycleProject}
									projects={projects}
									setProjects={setProjects}
								/>
							))
						)}
					</table>
				</div>
			</div>
		</>
	)
}
