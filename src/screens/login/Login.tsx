import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/context/auth/useAuth'
import { Alert, Spinner } from 'src/components/atoms'
import { LoginForm } from './LoginForm'
import { useLoginSubmit } from './useLogin'
import { useLocalStorageItem } from 'src/hooks'
import { LoginHeader } from './LoginHeader'

export interface IAlert {
	msg?: string
	error: boolean
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
	const [settingsLoaded, setSettingsLoaded] = useState<boolean>(false)

	const { setAuth } = useAuth()
	const navigate = useNavigate()

	const setting = useLocalStorageItem('settings', {})

	useEffect(() => {
		setSettingsLoaded(Object.keys(setting).length > 0)
	}, [setting])

	const onSuccess = (data: IUserData) => {
		localStorage.setItem('token', data.token)
		localStorage.setItem('user_name', data.name)
		localStorage.setItem('user_email', data.email)
		setAuth(data)
		navigate('/app')
		setTimeout(() => window.location.reload(), 500)
	}

	const { handleSubmit } = useLoginSubmit({
		email,
		password,
		setAlert,
		onSuccess
	})

	if (!settingsLoaded) {
		return (
			<Spinner message="Loading settings, the app will be ready in a few seconds..." />
		)
	}

	if (Object.values(setting).length === 0) {
		return <LoginHeader withSpinner={true} />
	}

	return (
		<>
			<LoginHeader withSpinner={false} />
			<>
				{alert.msg && (
					<Alert alert={{ error: alert.error ?? false, msg: alert.msg }} />
				)}

				<LoginForm
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					handleSubmit={handleSubmit}
				/>
			</>
		</>
	)
}
