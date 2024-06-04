import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Spinner } from '../components/atoms'
import Header from '../components/header/Header'
import DashboardSidebar from '../screens/dashboard/DashboardSidebar'
import { DashboardSettingSidebar } from 'src/screens/settings/DashboardSettingSidebar'
import { useAuth } from 'src/context/auth/AuthProvider'

interface ProtectedRouteProps {
	children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { auth, loading } = useAuth()
	const location = useLocation()

	if (loading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<Spinner />
			</div>
		)
	}

	const showSidebar =
		location.pathname !== '/app/map' &&
		location.pathname !== '/app/budget' &&
		location.pathname !== '/app/project/schedule' &&
		location.pathname !== '/app/project' &&
		!location.pathname.includes('/app/tickets') &&
		location.pathname !== '/app' &&
		!location.pathname.includes('/app/settings')

	const showSettingsSidebar = location.pathname.includes('/app/settings')

	return (
		<div className="bg-gray-900 text-gray-200 flex flex-col">
			{auth && auth._id ? (
				<>
					<Header />
					<div className="flex flex-1 overflow-hidden">
						{showSidebar && (
							<nav className="hidden sm:block bg-gray-800 border-r border-gray-700 sm:w-16 md:w-48 overflow-y-auto h-screen sticky top-0">
								<DashboardSidebar />
							</nav>
						)}
						{showSettingsSidebar && (
							<nav className="hidden sm:block bg-gray-800 border-r border-gray-700 sm:w-16 md:w-48 overflow-y-auto h-screen sticky top-0">
								<DashboardSettingSidebar />
							</nav>
						)}
						<main
							className={`flex-1 overflow-y-auto ${
								showSidebar || showSettingsSidebar
									? 'sm:pl-10 md:pl-18'
									: 'pl-0'
							}`}
						>
							{children}
						</main>
					</div>
				</>
			) : (
				<Navigate to="/app" state={{ from: location }} replace />
			)}
		</div>
	)
}

export default ProtectedRoute
