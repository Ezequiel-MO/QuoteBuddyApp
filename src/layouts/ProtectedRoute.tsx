import React, { ReactNode } from 'react'
import { Navigate, useLocation, useMatch } from 'react-router-dom'
import { Spinner } from '../components/atoms'
import Header from '../components/header/Header'
import { useAuth } from '../hooks'
import DashboardSidebar from '../screens/dashboard/DashboardSidebar'
import { DashboardSettingSidebar } from "src/screens/settings/DashboardSettingSidebar"

interface ProtectedRouteProps {
	children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { auth, loading } = useAuth()
	const location = useLocation()
	const match = useMatch('/app/settings')

	if (loading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<Spinner />
			</div>
		)
	}

	return (
		<div className="bg-gray-900 text-gray-200 flex flex-col h-screen">
			{auth && auth._id ? (
				<>
					<Header />
					<div className="flex flex-1 overflow-hidden">
						{location.pathname !== '/app/project/schedule' &&
							location.pathname !== '/app'
							&& !location.pathname.includes("/app/settings")
							? (
								<nav className="bg-gray-800 border-r border-gray-700 w-48 overflow-y-auto h-screen sticky top-0">
									<DashboardSidebar />
								</nav>
							) : null}
						{
							location.pathname !== '/app/project/schedule' &&
								location.pathname !== '/app'
								&& location.pathname.includes("/app/settings")
								? (
									<nav className="bg-gray-800 border-r border-gray-700 w-48 overflow-y-auto h-screen sticky top-0">
										<DashboardSettingSidebar/>
									</nav>
								) : null
						}
						<main className="flex-1 overflow-y-auto mx-2 hide-scrollbar">
							{children}
						</main>
					</div>
				</>
			) : (
				<Navigate to="/" />
			)}
		</div>
	)
}

export default ProtectedRoute
