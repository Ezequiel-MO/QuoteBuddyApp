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
import { IProject } from '@interfaces/project'
import useProjectFilter from './useProjectFilter'

export const ProjectList: React.FC = () => {
	const loadedProjects = useLoaderData() as IProject[]
	const navigate = useNavigate()
	const { projects, setProjects, isLoading } = useFetchProjects({
		initialProjects: loadedProjects
	})
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

	const handleNavigatetoProjectSpecs = () =>
		navigate('/app/project/specs', { state: { project } })

	const handleRecycleProject = async (projectId: string) => {
		try {
			const res = await baseAPI.get(`projects/${projectId}`)
			setCurrentProject(res.data.data.data)
			localStorage.setItem('currentProject', JSON.stringify(res.data.data.data))
			navigate('/app/project/schedule')
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
				<div className="flex-1 my-1 flex-col">
					<table className="w-full p-5">
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
