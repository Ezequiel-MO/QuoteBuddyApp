import {
	IDashboardData,
	adminData,
	dashboardData,
	dbMasterAndProjectsData,
	financialReportsData
} from 'src/constants/dashboardData'
import { findPathname } from './helperFunctions'

const routesDBmaster = [
	'/app/hotel',
	'/app/restaurant',
	'/app/activity',
	'/app/transfer',
	'/app/marketing/client',
	'/app/location',
	'/app/country',
	'/app/marketing/company',
	'/app/freelancer',
	'/app/gift',
	'/app/entertainment',
	'/app/audiovisual',
	'/app/other_operational'
]

const adminRoutes = [
	'/app/accManager',
	'/app/accManager/specs',
	'/app/user',
	'/app/user/specs',
	'/app/notification',
	'/app/notification/specs'
]

const routesFinancialReportsData = [
	'/app/invoice',
	'/app/invoice/proforma',
	'/app/salesfc',
	'/app/stats',
	'/app/cash_flow',
	/* '/app/suppliers', */
	'/app/expense'
]

export const getFilteredDashboardData = (
	pathname: string,
	role: string
): IDashboardData[] => {
	if (findPathname(pathname, routesDBmaster) || pathname === '/app/project') {
		// Include all objects except 'invoice', 'salesfc', 'accManager', and 'user'
		return dbMasterAndProjectsData
	} else if (findPathname(pathname, routesFinancialReportsData)) {
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
