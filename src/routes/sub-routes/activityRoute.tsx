import { ActivityProvider } from '@screens/events/context/ActivitiesContext'
import ActivityMasterForm from '@screens/events/specs/ActivityMasterForm'
import { ActivityList } from '@screens/index'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const ActivityRoute = withProviders([[ActivityProvider]])

export const activityRoute = {
	path: 'activity',
	element: (
		<ActivityRoute>
			<Outlet />
		</ActivityRoute>
	),
	children: [
		{
			index: true,
			element: <ActivityList />
		},
		{
			path: 'specs',
			element: <ActivityMasterForm />
		}
	]
}
