import { useState, useEffect, createContext } from 'react'
import baseAPI from 'src/axios/axiosConfig'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const authenticateUser = async () => {
			const token = localStorage.getItem('token')
			if (!token) {
				setLoading(false)
				return
			}
			if (token) {
				try {
					const { data } = await baseAPI.get('users/profile', {
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`
						}
					})
					setAuth(data)
				} catch (error) {
					setAuth({})
				} finally {
					setLoading(false)
				}
			}
		}
		authenticateUser()
	}, [])
	return (
		<AuthContext.Provider value={{ setAuth, auth, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthProvider }

export default AuthContext
