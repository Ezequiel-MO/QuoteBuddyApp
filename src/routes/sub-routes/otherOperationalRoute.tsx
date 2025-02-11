import {
	OtherOperationalList,
	OtherOperationalMasterForm
} from '@screens/other_operationals'
import { OtherOperationalsProvider } from '@screens/other_operationals/context/OtherOperationalsContext'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const OtherOperationalRoute = withProviders([[OtherOperationalsProvider]])

export const otherOperationalRoute = {
	path: 'other_operational',
	element: (
		<OtherOperationalRoute>
			<Outlet />
		</OtherOperationalRoute>
	),
	children: [
		{
			index: true,
			element: <OtherOperationalList />
		},
		{
			path: 'specs',
			element: <OtherOperationalMasterForm />
		}
	]
}
