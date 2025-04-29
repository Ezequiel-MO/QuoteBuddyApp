// ClientAuthProvider.tsx
//
// This provider manages client-side authentication state for the backoffice client portal.
//
// Key Features:
// - Uses sessionStorage (not localStorage) to persist the client's login state (clientUserIsLoggedIn) only for the duration of the browser session.
// - This ensures that when the browser/tab is closed, the client is automatically logged out, improving security for shared or public devices.
// - The login and logout functions update sessionStorage and the React state accordingly.
// - On logout, any client-specific localStorage items (like 'currentProject') are also cleared to prevent data leakage between sessions.
// - The provider exposes a context with login/logout methods and the current authentication state.
//
// Rationale for sessionStorage:
// - sessionStorage is used instead of localStorage to ensure that authentication state does not persist across browser sessions.
// - This is important for client users who may access the portal from shared or public computers, reducing the risk of unauthorized access if the browser is closed and reopened.
// - localStorage would persist the login state even after closing the browser, which is not desirable for this use case.
//
// Usage:
// - Wrap your component tree with <ClientAuthProvider> to provide authentication context.
// - Use the useClientAuth() hook to access login/logout and authentication state in child components.
import {
	createContext,
	useContext,
	useState,
	FC,
	ReactNode,
	useEffect
} from 'react'

interface ClientAuthContextType {
	clientUserIsLoggedIn: boolean
	isInitializing: boolean
	clientLogin: () => void
	clientLogout: () => void
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(
	undefined
)

interface ClientAuthProviderProps {
	children: ReactNode
}

export const ClientAuthProvider: FC<ClientAuthProviderProps> = ({
	children
}) => {
	const [isInitializing, setIsInitializing] = useState(true)
	const [clientUserIsLoggedIn, setClientUserIsLoggedIn] = useState<boolean>(
		() => {
			// Initialize login state from sessionStorage to persist only for the session
			const isLoggedIn =
				sessionStorage.getItem('clientUserIsLoggedIn') === 'true'
			setIsInitializing(false)
			return isLoggedIn
		}
	)

	useEffect(() => {
		const validateAuth = async () => {
			try {
				// Simulate async auth check with sessionStorage
				await new Promise((resolve) => setTimeout(resolve, 100))
				const isLoggedIn =
					sessionStorage.getItem('clientUserIsLoggedIn') === 'true'
				setClientUserIsLoggedIn(isLoggedIn)
			} catch (error) {
				console.error('Auth validation error:', error)
			} finally {
				setIsInitializing(false)
			}
		}
		validateAuth()
	}, [])

	// Login sets sessionStorage so the state persists only for the session
	const clientLogin = () => {
		sessionStorage.setItem('clientUserIsLoggedIn', 'true')
		console.log('Client logged in')
		setClientUserIsLoggedIn(true)
	}

	// Logout clears sessionStorage and any client-specific localStorage items
	const clientLogout = () => {
		sessionStorage.removeItem('clientUserIsLoggedIn')
		// Clear any other client-specific storage items
		localStorage.removeItem('currentProject')
		console.log('Client logged out')
		setClientUserIsLoggedIn(false)
	}

	return (
		<ClientAuthContext.Provider
			value={{
				isInitializing,
				clientUserIsLoggedIn,
				clientLogin,
				clientLogout
			}}
		>
			{children}
		</ClientAuthContext.Provider>
	)
}

export const useClientAuth = (): ClientAuthContextType => {
	const context = useContext(ClientAuthContext)
	if (context === undefined) {
		throw new Error('useClientAuth must be used within a ClientAuthProvider')
	}
	return context
}
