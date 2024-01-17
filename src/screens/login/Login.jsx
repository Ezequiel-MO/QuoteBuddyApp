import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/useAuth'
import { Alert, Spinner } from '../../components/atoms'
import { LoginForm } from './LoginForm'
import { useLoginSubmit } from './useLogin'
import { useLocalStorageItem } from 'src/hooks'

export const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [alert, setAlert] = useState({})
	const [settingsLoaded, setSettingsLoaded] = useState(false)

	const { setAuth } = useAuth()

	const navigate = useNavigate()

	const setting = useLocalStorageItem('settings', {})

	useEffect(() => {
		if (Object.keys(setting).length > 0) {
			setSettingsLoaded(true)
		}
	}, [setting])

	const onSuccess = (data) => {
		localStorage.setItem('token', data.token)
		localStorage.setItem('user_name', data.name)
		localStorage.setItem('user_email', data.email)
		setAuth(data)
		navigate('/app')
		setTimeout(() => window.location.reload(), 500)
	}

	const { handleSubmit, loading } = useLoginSubmit({
		email,
		password,
		setAlert,
		onSuccess
	})

	const { msg } = alert

	if (!settingsLoaded) {
		return (
			<div className="flex flex-col items-center justify-center">
				<Spinner />
				<p className="text-xl mt-4 text-white-0">
					Loading settings, the app will be ready in a few seconds...
				</p>
			</div>
		)
	}

	if (Object.values(setting).length === 0) {
		return (
			<>
				<h1 className="font-black text-4xl capitalize">
					<span className="text-primary">Login to APP</span>
				</h1>
				<Spinner />
			</>
		)
	}

	return (
		<>
			<h1 className="font-black text-4xl capitalize">
				Login to
				<span className="text-primary"> APP</span>
			</h1>
			{loading ? (
				<Spinner />
			) : (
				<>
					{msg && <Alert alert={alert} />}
					<LoginForm
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						handleSubmit={handleSubmit}
					/>
				</>
			)}
		</>
	)
}
