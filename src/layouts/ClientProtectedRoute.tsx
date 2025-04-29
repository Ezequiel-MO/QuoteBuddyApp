import React from 'react'
import ClientHeader from 'src/client/header/ClientHeader'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useClientAuth } from 'src/context/auth/ClientAuthProvider'
import { AuthProvider } from 'src/context/auth/AuthProvider'
import { Spinner } from '@components/atoms'

const ClientProtectedRoute: React.FC = () => {
	const { clientUserIsLoggedIn, isInitializing } = useClientAuth()
	const location = useLocation()

	console.log(
		'ClientProtectedRoute - Auth state:',
		clientUserIsLoggedIn,
		'Path:',
		location.pathname
	)

	// Check if this is a client route that should be protected
	const isClientProtectedPath =
		location.pathname.startsWith('/client/') && location.pathname !== '/client'

	if (isInitializing) {
		return (
			<div className="h-screen flex justify-center items-center">
				<Spinner />
			</div>
		)
	}

	// Redirect to home if not logged in and trying to access a protected client route
	if (!clientUserIsLoggedIn) {
		console.log(
			'Unauthenticated user accessing client route:',
			location.pathname
		)

		// If trying to access a protected client route, redirect to home
		if (isClientProtectedPath) {
			console.log('Redirecting unauthenticated user from protected route to /')
			return <Navigate to="/" replace />
		}

		// For the base client route, allow access to show login page
		return <Outlet />
	}

	// For authenticated users, show the client interface
	if (isInitializing) {
		return (
			<div className="h-screen flex justify-center items-center">
				<Spinner />
			</div>
		)
	}
	return (
		<div className="bg-slate-200 dark:bg-slate-800">
			<ClientHeader />
			<AuthProvider>
				<Outlet />
			</AuthProvider>
		</div>
	)
}

export default ClientProtectedRoute
