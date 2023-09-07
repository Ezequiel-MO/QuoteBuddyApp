import AuthLayout from '../layouts/AuthLayout'
import GeneralLayout from '../layouts/GeneralLayout'

import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from './error-page'
import { RouteConfig } from './routeInterface'
import { authRoutes } from './authRoutes'
import { appRoutes } from './appRoutes'

const routesConfig: RouteConfig[] = [
	{
		path: '/',
		element: <AuthLayout />,
		children: authRoutes,
		errorElement: <ErrorPage />
	},
	{
		path: 'app',
		element: <GeneralLayout />,
		children: appRoutes,
		errorElement: <ErrorPage />
	}
]

const router = createBrowserRouter(routesConfig as any)

export default router
