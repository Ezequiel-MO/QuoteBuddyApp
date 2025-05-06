import { useEffect, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { IProject, IDay } from '@interfaces/project'
import { useNavigate } from 'react-router-dom'
import { useProject } from '../context/ProjectContext'
import { useAuth } from 'src/context/auth/AuthProvider'
import baseAPI from 'src/axios/axiosConfig'
import { useCurrentProject } from 'src/hooks'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { createScheduleDays } from '../specs/helperFunctionProject'
import { useSocket } from '@screens/planner/context/SocketContext'

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
	const { joinRoom } = useSocket()
	const { state, dispatch, setForceRefresh } = useProject()
	const { setCurrentProject, clearBudget } = useCurrentProject()
	const { auth } = useAuth()
	const navigate = useNavigate()
	const [showInput, setShowInput] = useState(false)
	const [newProjectCode, setNewProjectCode] = useState('')
	const [keepProject, setKeepProject] = useState({
		hotels: false,
		schedule: false
	})
	const menuRef = useRef<HTMLDivElement>(null)

	const handleDuplicateClick = () => setShowInput(!showInput)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewProjectCode(e.target.value)
	}

	const handleInputChangeCheckBox = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setKeepProject((prev) => ({
			...prev,
			[e.target.name]: e.target.checked
		}))
	}

	const handleEnterPress = async (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			// Create a new project object with the updated code and reset collections
			const duplicatedProject: Partial<IProject> = { ...project }

			// Change the project code and reset financial collections
			duplicatedProject.code = newProjectCode
			duplicatedProject.invoices = []
			duplicatedProject.collectionsFromClient = []
			duplicatedProject.gifts = []

			// Remove fields we don't want to duplicate
			duplicatedProject._id = undefined
			duplicatedProject.createdAt = undefined
			duplicatedProject.updatedAt = undefined

			if (!keepProject.schedule) {
				const newSchedule = createScheduleDays(project)
				duplicatedProject.schedule = newSchedule as IDay[]
			}
			if (!keepProject.hotels) {
				duplicatedProject.hotels = []
			}

			const loadingToast = toast.loading('please wait!')
			try {
				await baseAPI.post('projects', duplicatedProject)
				setShowInput(false)
				setNewProjectCode('')
				toast.success('Project Duplicate created successfully', toastOptions)
				//SETEO LOS VALORES DE "queryParams"
				dispatch({
					type: 'SET_GROUP_LOCATION',
					payload: ''
				})
				dispatch({
					type: 'SET_SEARCH_TERM',
					payload: ''
				})
				dispatch({
					type: 'SET_PAGE',
					payload: 1
				})
				setForceRefresh((prev) => prev + 1)
				toast.dismiss(loadingToast)
			} catch (error: any) {
				console.error(error.response)
				alert(error.response.data.message)
				toast.dismiss(loadingToast)
			}
		}
	}

	const handleOpenMapPreview = () => {
		setCurrentProject(project)
		dispatch({ type: 'SET_PROJECT', payload: project })
		navigate('/app/map')
	}

	const handleOpenPreview = () => {
		setCurrentProject(project)
		dispatch({ type: 'SET_PROJECT', payload: project })
		navigate(`/app/project/preview/${project._id}`)
	}

	const handleViewPaymentSlip = () => {
		navigate(`/app/project/${project._id}/payment_slip`)
	}

	const handleStartPlanning = () => {
		setCurrentProject(project)
		dispatch({ type: 'SET_PROJECT', payload: project })
		if (joinRoom) {
			joinRoom(project._id)
		}
		navigate('/app/planner')
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
			clearBudget()
		} catch (error) {
			console.error(error)
		}
		navigate('/app/project/schedule')
	}

	const handleAddLegalContract = () => {
		setCurrentProject(project)
		dispatch({ type: 'SET_PROJECT', payload: project })
		dispatch({ type: 'SET_IMAGES_MODAL_OPEN', payload: true })
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
					{/* Start Planning option (only for Confirmed or Invoiced projects) */}
					{(project.status === 'Confirmed' ||
						project.status === 'Invoiced') && (
						<div
							className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
							role="menuitem"
							onClick={handleStartPlanning}
						>
							<Icon icon="mdi:calendar-check" />
							Start Planning
						</div>
					)}
					<div
						className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
						role="menuitem"
						onClick={handleDuplicateClick}
					>
						<Icon icon="mdi:content-duplicate" />
						Duplicate
					</div>
					<div
						className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
						role="menuitem"
						onClick={handleAddLegalContract}
					>
						<Icon icon="mdi:file-document-outline" />
						Add Legal Contract
					</div>
					{showInput && (
						<div className="bg-black-50 py-2">
							<input
								type="text"
								className="px-4 py-2 w-full bg-black-50 text-white-0"
								placeholder="Type new project code ..."
								maxLength={15}
								value={newProjectCode}
								onChange={handleInputChange}
								onKeyDown={handleEnterPress}
							/>
							<span className="px-2 text-sm">Keep Hotels</span>
							<input
								className="w-4"
								type="checkbox"
								name="hotels"
								checked={keepProject.hotels}
								onChange={handleInputChangeCheckBox}
							/>
							<span className="px-2 text-sm">Keep Schedule</span>
							<input
								className="w-4"
								type="checkbox"
								name="schedule"
								checked={keepProject.schedule}
								onChange={handleInputChangeCheckBox}
							/>
						</div>
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
