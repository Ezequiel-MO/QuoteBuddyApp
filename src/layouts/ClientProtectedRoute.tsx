import React from 'react'
import ClientHeader from '@components/header/ClientHeader'
import { Outlet } from 'react-router-dom'

const ClientProtectedRoute: React.FC = () => {
	return (
		<div className="bg-slate-200 dark:bg-slate-800">
			<ClientHeader />
			<Outlet />
		</div>
	)
}

export default ClientProtectedRoute
