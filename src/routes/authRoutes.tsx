import { RouteConfig } from './routeInterface'
import { Login } from '../screens'
import { ResetPassword } from '@screens/login/ResetPassword'
import { fetchSettings } from "src/helper/fetch/fetchSettings"

export const authRoutes: RouteConfig[] = [
	{
		index: true,
		element: <Login />,
		// loader: fetchSettings
	},
	{
		path: 'reset/:token',
		element: <ResetPassword />
	}
]
