import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Alert, Spinner } from 'src/components/atoms'
import { LoginForm } from './LoginForm'
import { useAgencyLoginSubmit } from './useAgencyLoginSubmit'
import { useCurrentProject, useLocalStorageItem } from 'src/hooks'
import { LoginHeader } from './LoginHeader'
import { fetchSettings } from 'src/helper/fetch/fetchSettings'
import { ISetting } from '@interfaces/setting'
import { useClientLoginSubmit } from './useClientLoginSubmit'
import { IDay, IProject } from '@interfaces/project'
import { IHotel } from '@interfaces/hotel'
import { saveToLocalStorage } from 'src/helper/localStorage/saveToLocalStorage'
import { useClientAuth } from 'src/context/auth/ClientAuthProvider'
import { useAuth } from 'src/context/auth/AuthProvider'

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
	const location = useLocation()
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [alert, setAlert] = useState<IAlert>({ error: false })
	const [userType, setUserType] = useState<'agency' | 'client'>('client')
	const [isLoading, setIsLoading] = useState(true)
	const [setting, setSetting] = useLocalStorageItem<ISetting | null>(
		'setting',
		null
	)
	const { setCurrentProject } = useCurrentProject()
	const { clientUserIsLoggedIn, clientLogin } = useClientAuth()
	const { auth, setAuth } = useAuth()
	const navigate = useNavigate()

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
	}, [userType, auth, clientUserIsLoggedIn, location])

	const onError = (error: any): void => {
		setAlert({
			error: true,
			msg: error?.response?.data?.msg ?? ''
		})
	}

	const onAgencySuccess = (data: IUserData) => {
		localStorage.setItem('token', data.token)
		localStorage.setItem('user_name', data.name)
		localStorage.setItem('user_email', data.email)
		setAuth(data)
		navigate('/app')
	}

	const onClientSuccess = (data: ClientData) => {
		saveToLocalStorage(data)
		setAlert({
			error: false,
			msg: 'Access Granted'
		})
		clientLogin()
		setCurrentProject(data)
		navigate('/client')
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
		onError
	})

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Spinner />
				<p className="text-center text-orange-500 mt-8 text-xl font-semibold">
					LOADING. PLEASE BE PATIENT...
				</p>
			</div>
		)
	}

	if (setting && Object.values(setting).length === 0) {
		return <LoginHeader withSpinner={true} userType={userType} />
	}

	const handleUserTypeSwitch = () => {
		setUserType((prevUser) => (prevUser === 'client' ? 'agency' : 'client'))
	}

	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<LoginHeader withSpinner={false} userType={userType} />
			<div className="w-full max-w-md px-6 py-8 shadow-lg rounded-lg">
				{alert.msg && (
					<Alert alert={{ error: alert.error ?? false, msg: alert.msg }} />
				)}
				<LoginForm
					email={email}
					setPassword={setPassword}
					setEmail={setEmail}
					password={password}
					handleSubmit={
						userType === 'agency' ? handleAgencySubmit : handleClientSubmit
					}
				/>
				<div className="text-center mt-4">
					<button
						onClick={handleUserTypeSwitch}
						className="text-xl font-medium text-blue-300 hover:text-orange-600 transition-colors duration-200"
					>
						Switch to {userType === 'agency' ? 'Client' : 'Agency'} Login
					</button>
				</div>
			</div>
		</div>
	)
}
