import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../context/auth/AuthProvider'
import ProtectedRoute from './ProtectedRoute'
import { InvoiceProvider } from '@screens/invoices/context/InvoiceContext'

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
