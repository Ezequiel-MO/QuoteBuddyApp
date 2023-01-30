import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import baseAPI from '../../../axios/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCurrentProject, useGetProjects } from '../../../hooks'
import { toastOptions } from '../../../helper/toast'
import { SearchInput, TableHeaders } from '../../../ui'
import { Spinner } from '../../../components/atoms'
import { ProjectListItem } from './ProjectListItem'

export const ProjectList = () => {
	const navigate = useNavigate()
	const { projects, setProjects, isLoading } = useGetProjects()
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

	const handleRecycleProject = async (projectId) => {
		try {
			const res = await baseAPI.get(`v1/projects/${projectId}`)
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

	const projectList = foundProjects?.map((project) => (
		<ProjectListItem
			key={project._id}
			project={project}
			handleRecycleProject={handleRecycleProject}
			projects={projects}
			setProjects={setProjects}
		/>
	))

	return (
		<>
			<div className="flex flex-col w-full">
				<div className="flex flex-row items-center">
					<div className="flex flex-col bg-transparent w-32 m-1 py-2 px-4 text-orange-50 rounded-xl items-center justify-center">
						<p>Active Project</p>
						<h2>{currentProject.code || 'none'}</h2>
					</div>
					<button
						onClick={() =>
							navigate('/app/project/specs', { state: { project } })
						}
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-1 rounded-xl inline-flex items-center"
					>
						<Icon icon="icons8:create-new" />
						<span>NEW PROJECT</span>
					</button>
					<button
						onClick={handleClearProject}
						className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-1 rounded-xl inline-flex items-center"
					>
						<Icon icon="icons8:create-new" />
						<span>CLEAR PROJECT</span>
					</button>
					<SearchInput
						searchItem={searchItem}
						filterList={filterList}
						placeHolder="code, group name, status or location"
					/>
				</div>
				<hr />
				<div className="flex-1 my-1 flex-col">
					{isLoading ? (
						<Spinner />
					) : (
						<table className="w-full p-5">
							<TableHeaders headers="project" />
							{projectList}
						</table>
					)}
				</div>
			</div>
		</>
	)
}
