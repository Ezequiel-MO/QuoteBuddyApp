import { RouteConfig } from './routeInterface'
import { Login } from '../screens'

export const authRoutes: RouteConfig[] = [
	{
		index: true,
		element: <Login />
	}
]
