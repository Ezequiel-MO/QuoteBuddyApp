import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { IProject } from '@interfaces/project'
import { useAuth } from 'src/context/auth/useAuth'
import { removeItemFromList } from 'src/helper/RemoveItemFromList'
import baseAPI from 'src/axios/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { MainSectionPreview } from '@screens/preview/main-section/MainSectionPreview'
import { useCurrentProject } from 'src/hooks'

interface Props {
	project: IProject
	projects: IProject[]
	setProjects: React.Dispatch<React.SetStateAction<IProject[]>>
	handleRecycleProject: (projectId: string) => void
}

export const ProjectListActions = ({
	project,
	projects,
	setProjects,
	handleRecycleProject
}: Props) => {
	const { auth } = useAuth()
	const navigate = useNavigate()
	const [showInput, setShowInput] = useState(false)
	const [newProjectCode, setNewProjectCode] = useState('')
	const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false)
	const { setCurrentProject } = useCurrentProject()
	const menuRef = useRef<HTMLDivElement>(null)

	const togglePreview = () => setIsPreviewOpen(!isPreviewOpen)

	const handleDuplicateClick = () => setShowInput(!showInput)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewProjectCode(e.target.value)
	}

	const handleEnterPress = async (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			let duplicatedProject = { ...project, code: newProjectCode }
			delete duplicatedProject._id
			try {
				await baseAPI.post('projects', duplicatedProject)
				setShowInput(false)
				setNewProjectCode('')
				navigate('/app/projects')
			} catch (error) {
				console.error(error)
			}
		}
	}

	const handleOpenPreview = () => {
		setCurrentProject(project)
		setIsPreviewOpen(!isPreviewOpen)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowInput(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<div className="absolute text-left">
			<div
				className="z-50 dropdown-menu origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden"
				data-project-id={project._id}
			>
				<div
					className="py-1"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="options-menu"
				>
					<div className="px-4 py-2 text-sm text-white-0 border-b border-gray-700">
						{project.code} - {project.groupName}
					</div>

					<div
						className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
						role="menuitem"
						onClick={() => project._id && handleRecycleProject(project._id)}
					>
						<Icon icon="mdi:account-plus-outline" />
						Add Vendors
					</div>
					<div
						className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
						role="menuitem"
						onClick={handleDuplicateClick}
					>
						<Icon icon="mdi:content-duplicate" />
						Duplicate
					</div>
					{showInput && (
						<input
							type="text"
							className="px-4 py-2 w-full bg-black-50 text-white-0"
							placeholder="Type new project code ..."
							maxLength={15}
							value={newProjectCode}
							onChange={handleInputChange}
							onKeyDown={handleEnterPress}
						/>
					)}
					{auth.role === 'admin' && (
						<div
							className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
							role="menuitem"
							onClick={() =>
								removeItemFromList(
									'projects',
									project._id,
									setProjects,
									projects
								)
							}
						>
							<Icon icon="mdi:delete" />
							Delete Project
						</div>
					)}
					<div
						className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
						role="menuitem"
						onClick={handleOpenPreview}
					>
						<Icon icon="mdi:print-preview" />
						Preview Project
						<MainSectionPreview
							isOpen={isPreviewOpen}
							onClose={togglePreview}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
