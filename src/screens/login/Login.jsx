import { useState } from 'react'
import baseAPI from '../../axios/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks'
import { Alert, Spinner } from '../../components/atoms'
import { LoginForm } from './LoginForm'

export const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [alert, setAlert] = useState({})

	const { setAuth, loading } = useAuth()

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		if ([email, password].includes('')) {
			setAlert({
				error: true,
				msg: 'Please fill in all fields'
			})
			return
		}
		try {
			const { data } = await baseAPI.post(`users/login`, {
				email,
				password
			})

			setAlert({
				error: false,
				msg: 'Access granted'
			})
			localStorage.setItem('token', data.token)
			localStorage.setItem('user_name', data.name)
			localStorage.setItem('user_email', data.email)
			setAuth(data)
			navigate('/app')
		} catch (error) {
			setAlert({
				error: true,
				msg: 'Invalid email or password'
			})
		}
		setTimeout(() => window.location.reload(), 500)()
	}

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
