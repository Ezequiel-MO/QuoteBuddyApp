import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { IProject } from '@interfaces/project'
import { useAuth } from 'src/context/auth/useAuth'
import { removeItemFromList } from 'src/helper/RemoveItemFromList'
import baseAPI from 'src/axios/axiosConfig'
import { useNavigate } from 'react-router-dom'

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
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [showInput, setShowInput] = useState(false)
	const [newProjectCode, setNewProjectCode] = useState('')

	const toggleMenu = () => {
		document.querySelectorAll('.dropdown-menu').forEach((menu) => {
			if (
				menu instanceof HTMLElement &&
				menu.getAttribute('data-project-id') !== project._id
			) {
				menu.style.display = 'none'
			}
		})

		setIsMenuOpen(!isMenuOpen)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Element
			if (!target.closest('.dropdown-menu') && !target.closest('.menu-icon')) {
				setIsMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const handleDuplicateClick = () => {
		setShowInput(true) // Show input field
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewProjectCode(e.target.value)
	}

	const handleEnterPress = async (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			let duplicatedProject = JSON.parse(JSON.stringify(project))
			duplicatedProject.code = newProjectCode
			delete duplicatedProject._id
			delete duplicatedProject.createdAt
			delete duplicatedProject.updatedAt
			try {
				const res = await baseAPI.post('projects', duplicatedProject)
				setShowInput(false)
				setNewProjectCode('')
				navigate('/app/project')
			} catch (error) {
				console.error(error)
			}
		}
	}

	return (
		<div className="absolute inline-block text-left menu-icon">
			<div onClick={toggleMenu} className="cursor-pointer">
				<Icon icon="mdi:dots-vertical" />
			</div>

			{isMenuOpen && (
				<div
					className="z-[400] dropdown-menu origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5"
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
					</div>
				</div>
			)}
		</div>
	)
}
