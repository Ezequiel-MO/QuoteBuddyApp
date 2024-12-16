import { AccManagerProvider } from '@screens/accManagers/context/AccManagersContext'
import AccManagerMasterForm from '@screens/accManagers/specs/AccManagerMasterForm'
import { AccManagerList } from '@screens/index'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const AccManagerRoute = withProviders([[AccManagerProvider]])

export const accManagerRoute = {
	path: 'accManager',
	element: (
		<AccManagerRoute>
			<Outlet />
		</AccManagerRoute>
	),
	children: [
		{
			index: true,
			element: <AccManagerList />
		},
		{
			path: 'specs',
			element: <AccManagerMasterForm />
		}
	]
}
