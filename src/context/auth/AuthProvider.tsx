// Import statements
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

// Define the type for the context value
interface AuthContextType {
	auth: AuthState
	setAuth: (auth: AuthState) => void
	loading: boolean
}

// Create the context with an initial undefined value, but with a defined type
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// AuthProvider component
interface AuthProviderProps {
	children: ReactNode
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
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
				const { data } = await baseAPI.get('users/profile', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				setAuth(data)
			} catch (error) {
				console.error(error)
				setAuth({})
			} finally {
				setLoading(false)
			}
		}
		authenticateUser()
	}, [])

	return (
		<AuthContext.Provider value={{ auth, setAuth, loading }}>
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

// Export the AuthProvider and useAuth hook
export { AuthProvider }
