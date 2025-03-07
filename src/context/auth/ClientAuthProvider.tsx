import { createContext, useContext, useState, FC, ReactNode } from 'react'

interface ClientAuthContextType {
	clientUserIsLoggedIn: boolean
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
	// Initialize directly from localStorage to ensure state is correct from the first render
	const [clientUserIsLoggedIn, setClientUserIsLoggedIn] = useState<boolean>(
		() => localStorage.getItem('userIsLoggedIn') === 'true'
	)

	const clientLogin = () => {
		localStorage.setItem('userIsLoggedIn', 'true')
		setClientUserIsLoggedIn(true)
	}

	const clientLogout = () => {
		localStorage.removeItem('userIsLoggedIn')
		// Clear any other client-specific storage items
		localStorage.removeItem('currentProject')
		setClientUserIsLoggedIn(false)
	}

	return (
		<ClientAuthContext.Provider
			value={{
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
