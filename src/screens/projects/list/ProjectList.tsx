import { useState } from 'react'
import baseAPI from '../../../axios/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCurrentProject } from '../../../hooks'
import { toastOptions } from '../../../helper/toast'
import { TableHeaders } from '../../../ui'
import { Spinner } from '../../../components/atoms'
import { ProjectListItem } from './ProjectListItem'
import { ProjectInfo } from './ProjectInfo'
import { ProjectActionButton } from './ProjectActionButton'
import { SearchInput } from '../../../components/molecules/inputs/SearchInput'
import { useApiFetch } from 'src/hooks/fetchData'
import { IProject } from '@interfaces/project'
import useProjectFilter from './useProjectFilter'
import { listStyles } from 'src/constants/listStyles'

export const ProjectList: React.FC = () => {
	const {
		data: projects,
		setData: setProjects,
		isLoading
	} = useApiFetch<IProject[]>('projects')
	const navigate = useNavigate()

	const [project] = useState<IProject | {}>({})
	const [searchItem, setSearchItem] = useState<string>('')
	const { currentProject, clearProject, setCurrentProject } =
		useCurrentProject()

	const filteredProjects = useProjectFilter(projects, searchItem)

	const handleClearProject = () => {
		localStorage.removeItem('currentProject')
		clearProject()
		toast.success('Project cleared', toastOptions)
	}

	const handleNavigatetoProjectSpecs = () => {
		handleClearProject()
		navigate('/app/project/specs', { state: { project } })
	}

	const handleRecycleProject = async (projectId: string) => {
		try {
			const res = await baseAPI.get(`projects/${projectId}`)
			setCurrentProject(res.data.data.data)
			localStorage.setItem('currentProject', JSON.stringify(res.data.data.data))

			// Determine the base path based on the current location
			const basePath = '/app/project/schedule'

			navigate(basePath)
		} catch (error) {
			console.log(error)
		}
	}

	const filterList = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearchItem(e.target.value)

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
				<div className="flex-1 my-1 flex-col min-h-screen">
					<table className={listStyles.table}>
						<TableHeaders headers="project" />
						{isLoading ? (
							<Spinner />
						) : (
							filteredProjects?.map((project) => (
								<ProjectListItem
									key={project._id}
									project={project}
									handleRecycleProject={handleRecycleProject}
									projects={projects ?? []}
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
