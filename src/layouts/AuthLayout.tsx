import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/auth/AuthProvider'

const AuthLayout = () => {
	return (
		<>
			<main className="container md:flex md:justify-center bg-gradient-to-br from-blue-100 to-blue-900 dark:from-gray-900 dark:to-gray-800">
				<div className="w-1/3 sm:w-full md:w-4/5">
					<AuthProvider>
						<Outlet />
					</AuthProvider>
				</div>
			</main>
		</>
	)
}

export default AuthLayout
