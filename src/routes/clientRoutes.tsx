import MainClientPage from 'src/client/MainClientPage'
import { RouteConfig } from './routeInterface'
import OverviewTable from '@screens/clientMainPage/overview/OverviewTable'

export const clientRoutes: RouteConfig[] = [
	{
		index: true,
		element: <MainClientPage />
		/* loader: fetchSettings */
	}
]
