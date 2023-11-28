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
	{
		title: 'Freelancers',
		route: 'freelancer',
		icon: 'healthicons:city-worker-negative'
	},
	{ title: 'Gifts', route: 'gift', icon: 'octicon:gift-16' },
	{ title: 'Entertainment', route: 'entertainment', icon: 'bx:bx-movie-play' },
	{ title: 'Users', route: 'user', icon: 'akar-icons:person' }
]


export const dashboardDataSettings:IDashboardData[] = [
	{ title: 'Company Settings', route: 'settings/companySettings', icon: "tdesign:user-setting" }
]