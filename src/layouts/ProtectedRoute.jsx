import { Outlet, Navigate, useLocation, useMatch } from 'react-router-dom'
import { Spinner } from '../components/atoms'
import Header from '../components/header/Header'
import { useAuth } from '../hooks'
import DashboardSidebar from '../screens/dashboard/DashboardSidebar'

const ProtectedRoute = () => {
	const { auth, loading } = useAuth()
	let location = useLocation()
	const match = useMatch('/app/hotel/:id')

	if (loading)
		return (
			<div className="h-screen flex justify-center items-center">
				<Spinner />
			</div>
		)
	return (
		<div className="bg-gray-900 text-gray-200 h-screen flex flex-col">
			{auth && auth._id ? (
				<>
					<Header />
					<div className="flex flex-1 overflow-hidden">
						{location.pathname !== '/app/project/schedule' &&
							location.pathname !== '/app' &&
							!match && (
								<nav className="bg-gray-800 border-r border-gray-700 w-64 overflow-y-auto">
									<DashboardSidebar />
								</nav>
							)}
						<main className="flex-1 overflow-y-auto">
							<Outlet />
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
