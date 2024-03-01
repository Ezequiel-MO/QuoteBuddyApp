import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
	clientUserIsLoggedIn: boolean
	clientLogin: () => void
	clientLogout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface Props {
	children: React.ReactNode
}

export const ClientAuthProvider = ({ children }: Props) => {
	const [clientUserIsLoggedIn, setClientUserIsLoggedIn] =
		useState<boolean>(false)

	useEffect(() => {
		const loggedIn = localStorage.getItem('userIsLoggedIn') === 'true'
		setClientUserIsLoggedIn(loggedIn)
	}, [])

	const clientLogin = () => {
		localStorage.setItem('userIsLoggedIn', 'true')
		setClientUserIsLoggedIn(true)
	}

	const clientLogout = () => {
		localStorage.removeItem('userIsLoggedIn')
		setClientUserIsLoggedIn(false)
	}

	return (
		<AuthContext.Provider
			value={{ clientUserIsLoggedIn, clientLogin, clientLogout }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useClientAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within a ClientAuthProvider')
	}
	return context
}
