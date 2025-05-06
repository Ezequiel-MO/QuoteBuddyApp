import {
	createContext,
	FC,
	ReactNode,
	useContext,
	useState,
	useEffect
} from 'react'
import baseAPI from 'src/axios/axiosConfig'

interface AuthState {
	token?: string
	name?: string
	email?: string
	role?: string
	_id?: string
}

interface AuthContextType {
	auth: AuthState
	setAuth: (auth: AuthState) => void
	loading: boolean
	logout: () => void
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
	children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [auth, setAuth] = useState<AuthState>({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const authenticateUser = async () => {
			const token = localStorage.getItem('token')
			if (!token) {
				setLoading(false)
				return
			}

			try {
				const { data } = await baseAPI.get('users/profile')
				setAuth({ ...data, token }) // Ensure token from localStorage is included
			} catch (error) {
				console.error(error)
				setAuth({}) // Auth is cleared on error
				localStorage.removeItem('token')
			} finally {
				setLoading(false)
			}
		}

		authenticateUser()
	}, [])

	const logout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('user_name')
		localStorage.removeItem('user_email')
		setAuth({})
	}

	return (
		<AuthContext.Provider value={{ auth, setAuth, loading, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

// useAuth hook
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
