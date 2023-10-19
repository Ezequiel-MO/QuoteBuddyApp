import { RouteConfig } from './routeInterface'
import { Login } from '../screens'
import { ResetPassword } from '@screens/login/ResetPassword'

export const authRoutes: RouteConfig[] = [
	{
		index: true,
		element: <Login />
	},
	{
		path: 'reset/:token',
		element: <ResetPassword />
	}
]
