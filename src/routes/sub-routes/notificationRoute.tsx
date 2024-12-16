import { NotificationList } from '@screens/index'
import { NotificationProvider } from '@screens/notifications/context/NotificationContext'
import { NotificationMasterForm } from '@screens/notifications/specs/NotificationMasterForm'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const NotificationRoute = withProviders([[NotificationProvider]])

export const notificationRoute = {
	path: 'notification',
	element: (
		<NotificationRoute>
			<Outlet />
		</NotificationRoute>
	),
	children: [
		{
			index: true,
			element: <NotificationList />
		},
		{
			path: 'specs',
			element: <NotificationMasterForm />
		}
	]
}
