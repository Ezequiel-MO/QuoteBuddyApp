import React from 'react'
import { useAuth } from 'src/context/auth/AuthProvider'

export const withRoleAuthorization = <P extends object>(
	Component: React.ComponentType<P>
) => {
	return (props: P) => {
		const { auth } = useAuth()
		if (auth.role !== 'admin') return null
		return <Component {...props} />
	}
}
