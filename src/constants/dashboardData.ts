export interface IDashboardData {
	title: string
	route: string
	icon: string
}

export const dashboardData: IDashboardData[] = [
	{ title: 'Hotels', route: 'hotel', icon: 'bxs:hotel' },
	{ title: 'Restaurants', route: 'restaurant', icon: 'bx:restaurant' },
	{ title: 'Activities', route: 'event', icon: 'ic:baseline-event-available' },
	{ title: 'Transfers', route: 'transfer', icon: 'cil:bus-alt' },
	{ title: 'Clients', route: 'client', icon: 'mdi:handshake-outline' },
	{ title: 'Locations', route: 'location', icon: 'akar-icons:location' },
	{ title: 'Acc. Managers', route: 'accManager', icon: 'akar-icons:person' },
	{ title: 'Countries', route: 'country', icon: 'gis:search-country' },
	{
		title: 'Companies',
		route: 'company',
		icon: 'mdi:company'
	},
	{ title: 'Invoices', route: 'invoice', icon: 'tabler:file-invoice' },
	{
		title: 'Sales Forecast',
		route: 'salesfc',
		icon: 'carbon:sales-ops'
	},
	{
		title: 'Payments',
		route: 'cash_flow',
		icon: 'streamline:subscription-cashflow-solid'
	},
	{
		title: 'Stats',
		route: 'stats',
		icon: 'gridicons:stats'
	},
	{
		title: 'Freelancers',
		route: 'freelancer',
		icon: 'healthicons:city-worker-negative'
	},
	{ title: 'Gifts', route: 'gift', icon: 'octicon:gift-16' },

	{ title: 'Entertainment', route: 'entertainment', icon: 'bx:bx-movie-play' },
	{ title: 'Users', route: 'user', icon: 'akar-icons:person' },
	{
		title: 'Notification',
		route: 'notification',
		icon: 'fluent:mail-28-regular'
	}
]

export const dashboardDataSettings: IDashboardData[] = [
	{
		title: 'Company Settings',
		route: 'settings/companySettings',
		icon: 'tdesign:user-setting'
	},
	{
		title: 'Modules',
		route: 'settings/modules',
		icon: 'cil:view-module'
	}
]

export const dbMasterAndProjectsData = dashboardData.filter(
	(data) =>
		!['invoice', 'salesfc', 'accManager', 'user', 'notification' , "stats" , "cash_flow"].includes(
			data.route
		)
)

export const financialReportsData = dashboardData.filter((data) =>
	['invoice', 'salesfc', 'cash_flow', 'stats'].includes(data.route)
)

export const adminData = dashboardData.filter((data) =>
	['accManager', 'user', 'notification'].includes(data.route)
)
