import AuthLayout from '../layouts/AuthLayout'
import GeneralLayout from '../layouts/GeneralLayout'
import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from './error-page'
import { RouteConfig } from './routeInterface'
import { authRoutes } from './authRoutes'
import { appRoutes } from './appRoutes'
import NotFound from '@components/atoms/NotFound'
import { clientRoutes } from './clientRoutes'
import ClientProtectedRoute from 'src/layouts/ClientProtectedRoute'

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
	},
	{
		path: 'client',
		element: <ClientProtectedRoute />,
		children: clientRoutes,
		errorElement: <ErrorPage />
	},
	{
		path: '*',
		element: <NotFound />
	}
]

const router = createBrowserRouter(routesConfig as any)

export default router
