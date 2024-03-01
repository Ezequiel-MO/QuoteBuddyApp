import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/context/auth/useAuth'
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
	const { clientLogin } = useClientAuth()
	const { setAuth } = useAuth()
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
		setTimeout(() => window.location.reload(), 500)
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
			<div className="mt-48">
				<Spinner />
				<p className="text-center text-orange-300 mt-8 text-xl">
					LOADING. PLEASE BE PATIENT ...
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
		<>
			<LoginHeader withSpinner={false} userType={userType} />
			<>
				{alert.msg && (
					<Alert alert={{ error: alert.error ?? false, msg: alert.msg }} />
				)}

				<LoginForm
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					handleSubmit={
						userType === 'agency' ? handleAgencySubmit : handleClientSubmit
					}
				/>
				<div className="text-center">
					<button
						onClick={handleUserTypeSwitch}
						className="text-2xl text-blue-300"
					>
						{userType === 'agency'
							? 'Are you a client user?'
							: 'Are you an agency user?'}
					</button>
				</div>
			</>
		</>
	)
}
