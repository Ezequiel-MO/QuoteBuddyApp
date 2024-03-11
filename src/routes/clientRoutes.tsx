import MainClientPage from 'src/client/MainClientPage'
import { RouteConfig } from './routeInterface'

export const clientRoutes: RouteConfig[] = [
	{
		index: true,
		element: <MainClientPage />
		/* loader: fetchSettings */
	}
]
