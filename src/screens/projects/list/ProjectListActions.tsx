import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { IProject } from '@interfaces/project'
import { useNavigate } from 'react-router-dom'
import { MainSectionPreview } from '@screens/preview/main-section/MainSectionPreview'
import { useProject } from '../context/ProjectContext'
import { useAuth } from 'src/context/auth/AuthProvider'
import baseAPI from 'src/axios/axiosConfig'
import { useCurrentProject } from 'src/hooks'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'

interface Props {
	project: IProject
	isMenuOpen: boolean
	toggleMenu: () => void
}

export const ProjectListActions = ({
	project,
	isMenuOpen,
	toggleMenu
}: Props) => {
	const { state, dispatch } = useProject()
	const { setCurrentProject } = useCurrentProject()
	const { auth } = useAuth()
	const navigate = useNavigate()
	const [showInput, setShowInput] = useState(false)
	const [newProjectCode, setNewProjectCode] = useState('')
	const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false)
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

	const handleOpenMapPreview = () => {
		dispatch({ type: 'SET_PROJECT', payload: project })
		navigate('/app/map')
	}

	const handleOpenPreview = () => {
		dispatch({ type: 'SET_PROJECT', payload: project })
		setIsPreviewOpen(!isPreviewOpen)
	}

	const handleViewPaymentSlip = () => {
		navigate(`/app/project/${project._id}/payment_slip`)
	}

	const handleRemoveProject = async () => {
		if (project._id) {
			const confirmDelete = window.confirm(
				`Are you sure you want to delete this project?`
			)

			if (confirmDelete) {
				try {
					await baseAPI.delete(`projects/${project._id}`)

					// Filter out the deleted project from the state
					const updatedProjects = state.projects.filter(
						(item) => item._id !== project._id
					)

					// Dispatch the updated project list to the context
					dispatch({ type: 'SET_PROJECTS', payload: updatedProjects })

					toast.success('Deleted successfully', toastOptions)
				} catch (error) {
					toast.error('Could not delete Item successfully', toastOptions)
				}
			} else {
				toast.warn('Could not delete Item successfully', toastOptions)
			}

			// Close the menu after the action
			toggleMenu()
		}
	}

	const handleAddVendorsClick = async () => {
		try {
			const response = await baseAPI.get(`projects/${project?._id}`)
			dispatch({ type: 'SET_PROJECT', payload: response.data.data.data })
			setCurrentProject(response.data.data.data)
		} catch (error) {
			console.error(error)
		}
		navigate('/app/project/schedule')
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				toggleMenu()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [toggleMenu])

	return isMenuOpen ? (
		<div className="absolute text-left" ref={menuRef}>
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
					{/* Existing project details and actions */}
					<div className="px-4 py-2 text-sm text-white-0 border-b border-gray-700">
						{project.code} - {project.groupName}
					</div>
					{/* New ADD Vendors option */}
					<div
						className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
						role="menuitem"
						onClick={handleAddVendorsClick}
					>
						<Icon icon="mdi:account-plus" />
						ADD Vendors
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
							onClick={handleRemoveProject}
						>
							<Icon icon="mdi:delete" />
							Delete Project
						</div>
					)}
					<div
						className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
						role="menuitem"
						onClick={handleOpenMapPreview}
					>
						<Icon icon="material-symbols:map-outline" />
						Preview Map
					</div>
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
					<div
						className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
						role="menuitem"
						onClick={handleViewPaymentSlip}
					>
						<Icon icon="mdi:cash-multiple" />
						View Payment Slip
					</div>
				</div>
			</div>
		</div>
	) : null
}
