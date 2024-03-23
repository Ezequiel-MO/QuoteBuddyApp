import React from 'react'
import ClientHeader from 'src/client/header/ClientHeader'
import { Navigate, Outlet } from 'react-router-dom'
import { useClientAuth } from 'src/context/auth/ClientAuthProvider'

const ClientProtectedRoute: React.FC = () => {
	const { clientUserIsLoggedIn } = useClientAuth()

	if (!clientUserIsLoggedIn) {
		return <Navigate to="/" replace />
	}

	return (
		<div className="bg-slate-200 dark:bg-slate-800">
			<ClientHeader />
			<Outlet />
		</div>
	)
}

export default ClientProtectedRoute
