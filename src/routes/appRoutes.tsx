import { Presentation, UserList, UserSpecs } from '../screens'
import { Settings } from 'src/screens/settings/Settings'
import { SettingsCompany } from 'src/screens/settings/SettingsCompany'
import { SettingsModule } from 'src/screens/settings/SettingsModule'
import { RouteConfig } from './routeInterface'
import { TicketHome } from '@screens/tickets/TicketHome'
import { TicketRoutes } from 'src/layouts/TicketRoutes'
import { TicketPage } from '@screens/tickets/TicketPage'
import { SalesForecast } from '@screens/sales/SalesForecast'
import { fetchSettings } from 'src/helper/fetch/fetchSettings'
import { Stats } from '@screens/sales/Stats'
import { fetchInvoices } from 'src/helper/fetch/fetchInvoices'
import { MapWrapper } from '@screens/vendor_map/Wrapper'

import {
	accManagerRoute,
	activityRoute,
	cashFlowRoute,
	countryRoute,
	entertainmentRoute,
	expenseRoute,
	freelancerRoute,
	giftRoute,
	hotelRoute,
	audiovisualRoute,
	invoiceRoute,
	locationRoute,
	marketingRoute,
	notificationRoute,
	otherOperationalRoute,
	projectRoutes,
	restaurantRoute,
	supplierRoute,
	transferRoute
} from './sub-routes'
import { BudgetTable } from '@screens/budget/MainTable/higherComponents'

export const appRoutes: RouteConfig[] = [
	{
		index: true,
		element: <Presentation />,
		loader: fetchSettings
	},
	{
		path: 'settings',
		element: <Settings />
	},
	{
		path: 'settings/companySettings',
		element: <SettingsCompany />
	},
	{
		path: 'settings/modules',
		element: <SettingsModule />
	},
	{
		path: 'user',
		element: <UserList />
	},
	{
		path: 'user/specs',
		element: <UserSpecs />
	},
	accManagerRoute,
	notificationRoute,
	countryRoute,
	activityRoute,
	hotelRoute,
	audiovisualRoute,
	locationRoute,
	...projectRoutes,
	restaurantRoute,
	otherOperationalRoute,
	entertainmentRoute,
	transferRoute,
	invoiceRoute,
	marketingRoute,
	{
		path: 'salesfc',
		element: <SalesForecast />
	},
	{
		path: 'stats',
		element: <Stats />,
		loader: fetchInvoices
	},
	cashFlowRoute,
	freelancerRoute,
	giftRoute,
	supplierRoute,
	expenseRoute,
	{
		path: 'tickets',
		element: <TicketRoutes />,
		children: [
			{
				index: true,
				element: <TicketHome />
			},
			{
				path: ':ticketId',
				element: <TicketPage />
			}
		]
	},
	{
		path: 'map',
		element: <MapWrapper />
	},
	{
		path: 'budget',
		element: <BudgetTable />
	}
]
