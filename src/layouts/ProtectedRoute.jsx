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
		<div>
			{auth && auth._id ? (
				<div>
					<Header />
					<div className="flex flex-row">
						{location.pathname !== '/app/project/schedule' &&
							location.pathname !== '/app' &&
							!match && (
								<nav className="min-w-fit ml-2">
									<DashboardSidebar />
								</nav>
							)}
						<main className="w-full min-w-[800px] mx-8">
							<Outlet />
						</main>
					</div>
				</div>
			) : (
				<Navigate to="/" />
			)}
		</div>
	)
}

export default ProtectedRoute
