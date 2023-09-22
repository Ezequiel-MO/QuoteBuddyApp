import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/AuthProvider'
import ProtectedRoute from './ProtectedRoute'

const GeneralLayout: React.FC = () => {
	return (
		<AuthProvider>
			<ProtectedRoute>
				<Outlet />
			</ProtectedRoute>
		</AuthProvider>
	)
}

export default GeneralLayout
