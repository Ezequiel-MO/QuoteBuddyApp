import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'src/context/auth/useAuth'
import { Alert, Spinner } from 'src/components/atoms'
import { LoginForm } from './LoginForm'
import { useLoginSubmit } from './useLogin'
import { useLocalStorageItem } from 'src/hooks'
import { LoginHeader } from './LoginHeader'
import { fetchSettings } from "src/helper/fetch/fetchSettings"


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

	const { setAuth } = useAuth()
	const navigate = useNavigate()

	const setting = useLocalStorageItem('settings', {})

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadSetting = async () => {
			try {
				await fetchSettings()
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoading(false)
			}
		}
		loadSetting()
	}, [])

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

	if (isLoading) {
		return (
			<div className='mt-48'>
				<Spinner />
				<p className='text-center text-orange-300 mt-8 text-xl'>
					Loading settings, the app will be ready in a few seconds...
				</p>
			</div>
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
