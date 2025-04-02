import React, { FC, useEffect, useState, FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Alert, Spinner } from 'src/components/atoms'
import { LoginForm } from './LoginForm'
import { useAgencyLoginSubmit } from './useAgencyLoginSubmit'
import { useCurrentProject, useLocalStorageItem } from 'src/hooks'
import { fetchSettings } from 'src/helper/fetch/fetchSettings'
import { ISetting } from '@interfaces/setting'
import { useClientLoginSubmit } from './useClientLoginSubmit'
import { IDay, IProject } from '@interfaces/project'
import { IHotel } from '@interfaces/hotel'
import { saveToLocalStorage } from 'src/helper/localStorage/saveToLocalStorage'
import { useClientAuth } from 'src/context/auth/ClientAuthProvider'
import { useAuth } from 'src/context/auth/AuthProvider'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from '@helper/toast'
import backgroundImage from '@assets/background_login.jpg'
import ProjectSelection from './ProjectSelection'
import { isValidProject } from './utils/projectValidation'

export interface IAlert {
	msg?: string
	error: boolean
}

interface ClientData extends IProject {
	schedule: IDay[]
	hotels: IHotel[]
}

interface IUserData {
	token: string
	name: string
	email: string
}

export const Login: FC = () => {
	// State definitions and hooks remain the same
	const { auth, setAuth } = useAuth()
	const location = useLocation()
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [rememberMe, setRememberMe] = useState<boolean>(false)
	const [alert, setAlert] = useState<IAlert>({ error: false })
	const [userType, setUserType] = useState<'agency' | 'client'>('client')
	const [isLoading, setIsLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [setting, setSetting] = useLocalStorageItem<ISetting | null>(
		'setting',
		null
	)
	const { setCurrentProject } = useCurrentProject()
	const { clientUserIsLoggedIn, clientLogin } = useClientAuth()
	const navigate = useNavigate()

	// New state for project selection
	const [availableProjects, setAvailableProjects] = useState<IProject[]>([])
	const [showProjectSelection, setShowProjectSelection] = useState(false)
	const [selectedProjectCode, setSelectedProjectCode] = useState<string>('')

	useEffect(() => {
		document.body.classList.add('overflow-hidden')
		return () => document.body.classList.remove('overflow-hidden')
	}, [])

	useEffect(() => {
		// Check for explicit logout request
		const isLoggedOut = location?.state?.status === 'logged_out'

		// Check if we should use remembered credentials
		const savedEmail = localStorage.getItem('rememberedEmail')
		const savedPassword = localStorage.getItem('rememberedPassword')
		const projectSelectionOption = localStorage.getItem(
			'projectSelectionOption'
		)

		// Only auto-fill credentials if user hasn't explicitly logged out
		// and they selected to be remembered
		if (savedEmail && savedPassword && !isLoggedOut) {
			setEmail(savedEmail)
			setPassword(savedPassword)
			setRememberMe(true)

			// If user has selected to always choose projects, don't auto-login
			if (projectSelectionOption === 'always_select') {
				// Will just fill the form but not submit
			} else if (projectSelectionOption === 'auto_login') {
				// Will auto-submit the form after loading
				setTimeout(() => {
					// Auto-submit after a slight delay to allow UI to load
					const form = document.querySelector('form[data-testid="login-form"]')
					if (form) {
						const submitEvent = new Event('submit', {
							cancelable: true,
							bubbles: true
						})
						form.dispatchEvent(submitEvent)
					}
				}, 500)
			}
		}

		// Clear the logged_out state so refreshes don't maintain this state
		if (isLoggedOut && location.state) {
			const newState = { ...location.state }
			delete newState.status
			navigate(location.pathname, { state: newState, replace: true })
		}
	}, [location, navigate])

	useEffect(() => {
		const loadSetting = async () => {
			try {
				setSetting(await fetchSettings())
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}
		loadSetting()
	}, [])

	useEffect(() => {
		if (
			!isLoading &&
			clientUserIsLoggedIn &&
			userType === 'client' &&
			location?.state?.status !== 'logged_out'
		) {
			navigate('/client')
		}
		if (userType === 'agency' && auth?.token) {
			navigate('/app')
		}
	}, [userType, auth, clientUserIsLoggedIn, location, isLoading, navigate])

	const onError = (error: any): void => {
		setIsSubmitting(false)
		setAlert({
			error: true,
			msg:
				error?.response?.data?.msg ??
				'Login failed. Please check your credentials.'
		})
	}

	const onAgencySuccess = (data: IUserData) => {
		setIsSubmitting(false)
		localStorage.setItem('token', data.token)
		localStorage.setItem('user_name', data.name)
		localStorage.setItem('user_email', data.email)

		if (rememberMe) {
			localStorage.setItem('rememberedEmail', email)
			localStorage.setItem('rememberedPassword', password)
			localStorage.setItem('projectSelectionOption', 'auto_login')
		} else {
			localStorage.removeItem('rememberedEmail')
			localStorage.removeItem('rememberedPassword')
			localStorage.removeItem('projectSelectionOption')
		}

		setAuth(data)
		navigate('/app')
	}

	const onClientSuccess = (data: ClientData) => {
		setIsSubmitting(false)
		saveToLocalStorage(data)

		if (rememberMe) {
			localStorage.setItem('rememberedEmail', email)
			localStorage.setItem('rememberedPassword', password)

			// If only one project, we can auto-login next time
			if (availableProjects.length <= 1) {
				localStorage.setItem('projectSelectionOption', 'auto_login')
			}
		} else {
			localStorage.removeItem('rememberedEmail')
			localStorage.removeItem('rememberedPassword')
			localStorage.removeItem('projectSelectionOption')
		}

		setAlert({
			error: false,
			msg: 'Access Granted'
		})
		clientLogin()
		setCurrentProject(data)
		navigate('/client')
	}

	const onMultipleProjects = (projects: IProject[]) => {
		setIsSubmitting(false)
		setAvailableProjects(projects)

		// Find the project matching the current password
		const currentProject = projects.find((p) => p.code === password)
		if (currentProject) {
			setSelectedProjectCode(currentProject.code)
		}

		setShowProjectSelection(true)
	}

	const handleSelectProject = (project: IProject) => {
		// Update UI state
		setSelectedProjectCode(project.code)
		// Validate project structure before continuing
		if (!isValidProject(project)) {
			toast.error(
				'This project is using a legacy format and is no longer available. Please contact your account manager if you wish to enable it again.',
				errorToastOptions
			)
			// Keep showing the project selection modal instead of navigating
			return
		}

		// If user has multiple projects and selects "remember me",
		// update the project selection preference
		if (rememberMe && availableProjects.length > 1) {
			const preferenceOption = window.confirm(
				'Would you like to be asked to select a project each time you login? ' +
					'Click OK to always select a project, Cancel to automatically log in to the last project used.'
			)
				? 'always_select'
				: 'auto_login'

			localStorage.setItem('projectSelectionOption', preferenceOption)
			localStorage.setItem('lastProjectCode', project.code)
		}

		// Continue with login process using the selected project
		setShowProjectSelection(false)
		onClientSuccess(project as ClientData)
	}

	const { handleAgencySubmit } = useAgencyLoginSubmit({
		email,
		password,
		setAlert,
		onAgencySuccess,
		onError
	})

	const { handleClientSubmit } = useClientLoginSubmit({
		email,
		password,
		setAlert,
		onClientSuccess,
		onMultipleProjects,
		onError
	})

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		if (userType === 'agency') {
			handleAgencySubmit(e)
		} else {
			handleClientSubmit(e)
		}
	}

	const handleUserTypeSwitch = () => {
		setUserType((prevUser) => (prevUser === 'client' ? 'agency' : 'client'))
		setAlert({ error: false })
	}

	const handleForgotPassword = () => {
		if (userType === 'client') {
			toast.info(
				'Check the email that lead you to this page for your credentials, or check with your Account Manager.',
				toastOptions
			)
		} else {
			toast.info(
				'Please contact your IT manager for new credentials.',
				toastOptions
			)
		}
	}

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="w-full max-w-md px-6 py-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
					<div className="flex flex-col items-center">
						<Spinner />
						<p className="text-center text-blue-600 dark:text-blue-400 mt-6 text-lg font-semibold">
							Loading application settings...
						</p>
					</div>
				</div>
			</div>
		)
	}

	if (setting && Object.keys(setting).length === 0) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="w-full max-w-md px-6 py-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
					<div className="flex flex-col items-center">
						<p className="text-center text-red-600 dark:text-red-400 mt-4">
							Unable to load application settings. Please try again later.
						</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="h-screen flex overflow-hidden fixed inset-0">
			{/* Project selection modal */}
			{showProjectSelection && (
				<ProjectSelection
					projects={availableProjects}
					currentProjectCode={selectedProjectCode}
					onSelectProject={handleSelectProject}
					onCancel={() => setShowProjectSelection(false)}
				/>
			)}

			{/* Left Side - Background Image */}
			<div className="hidden md:block md:w-1/2 h-screen relative bg-gray-100">
				<div className="absolute inset-0">
					<img
						src={backgroundImage}
						alt="Scenic background"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-gray-900/40" />
				</div>
				<div className="absolute bottom-8 left-8 right-8 text-white-0">
					<p className="text-2xl font-bold">Welcome to CUTT/events</p>
				</div>
			</div>

			{/* Right Side - Login Content */}
			<div className="w-full md:w-1/2 h-screen flex items-center justify-center bg-gray-400 p-2">
				<div className="w-full max-w-md space-y-8">
					{/* Header */}
					<div className="text-center">
						{setting?.logo && (
							<img
								src={setting.logo}
								alt="Company logo"
								className="h-8 mx-auto"
							/>
						)}
						<h1 className="text-3xl font-bold text-white-0">
							{userType === 'client' ? 'Client Portal' : 'Agency Dashboard'}
						</h1>
						<p className="mt-2 text-gray-600 dark:text-gray-300">
							{userType === 'client'
								? 'Access your personalized travel itinerary'
								: 'Manage your agency operations'}
						</p>
					</div>

					{/* Alert */}
					{alert.msg && (
						<Alert alert={{ error: alert.error, msg: alert.msg }} />
					)}

					{/* Login Form */}
					<div className="bg-gray-200 rounded-lg shadow-xl p-8">
						<LoginForm
							email={email}
							setEmail={setEmail}
							password={password}
							setPassword={setPassword}
							handleSubmit={handleSubmit}
							userType={userType}
							isSubmitting={isSubmitting}
						/>

						{/* Remember Me & Forgot Password */}
						<div className="mt-6 flex items-center justify-between">
							<label className="flex items-center text-sm text-gray-400">
								<input
									type="checkbox"
									checked={rememberMe}
									onChange={() => setRememberMe(!rememberMe)}
									className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<span className="ml-2">Remember me</span>
							</label>

							<button
								type="button"
								onClick={handleForgotPassword}
								className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
							>
								Forgot password?
							</button>
						</div>
					</div>

					{/* Footer */}
					<div className="text-center text-sm text-gray-500 dark:text-gray-400">
						<p>© {new Date().getFullYear()} QUOTE/Buddy</p>
						<p className="mt-1">All rights reserved</p>
					</div>
				</div>
			</div>

			{/* User Type Toggle */}
			<button
				onClick={handleUserTypeSwitch}
				className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-white-0 dark:bg-gray-700 rounded-md shadow-lg hover:shadow-xl transition-all"
			>
				<Icon
					icon={userType === 'client' ? 'mdi:office-building' : 'mdi:passport'}
					className="text-[#ea5933]"
					width={20}
				/>
				<span className="text-sm font-medium hover:text-[#ea5933]">
					{userType === 'client' ? 'Agency Login' : 'Client Login'}
				</span>
			</button>
		</div>
	)
}
