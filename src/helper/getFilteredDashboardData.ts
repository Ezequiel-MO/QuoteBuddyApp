import {
	IDashboardData,
	adminData,
	dashboardData,
	dbMasterAndProjectsData,
	financialReportsData
} from 'src/constants/dashboardData'

const adminRoutes = [
	'/app/accManager',
	'/app/accManager/specs',
	'/app/user',
	'/app/user/specs',
	'/app/notification',
	'/app/notification/specs'
]

export const getFilteredDashboardData = (
	pathname: string,
	role: string
): IDashboardData[] => {
	if (pathname === '/app/hotel' || pathname === '/app/project') {
		// Include all objects except 'invoice', 'salesfc', 'accManager', and 'user'
		return dbMasterAndProjectsData
	} else if (
		pathname === '/app/invoice' ||
		pathname === '/app/salesfc' ||
		pathname === '/app/stats'
	) {
		// For '/app/invoice' and '/app/salesfc', include 'invoice' and conditionally include 'salesfc' for admin
		return financialReportsData.filter(
			(data) => data.route !== 'salesfc' || role === 'admin'
		)
	} else if (adminRoutes.includes(pathname)) {
		// For '/app/accManager' and '/app/user', include 'accManager' and conditionally include 'user' for admin
		return adminData.filter(
			(data) =>
				(data.route !== 'user' || role === 'admin') &&
				(data.route !== 'notification' || role === 'admin')
		)
	}

	// For other routes, filter out 'invoice', 'salesfc', 'accManager', and 'user'
	return dashboardData.filter(
		(data) =>
			!['invoice', 'salesfc', 'accManager', 'user', 'notification'].includes(
				data.route
			)
	)
}
