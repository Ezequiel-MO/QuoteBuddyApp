import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/useAuth'
import { Alert, Spinner } from '../../components/atoms'
import { LoginForm } from './LoginForm'
import { useLoginSubmit } from './useLogin'

export const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [alert, setAlert] = useState({})

	const { setAuth } = useAuth()

	const navigate = useNavigate()

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
	return (
		<>
			<h1 className="font-black text-4xl capitalize">
				Login <span className="text-white-100">to APP</span>
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
