import { EntertainmentProvider } from '@screens/entertainment/context/EntertainmentsContext'
import { EntertainmentList } from '@screens/entertainment/list/EntertainmentList'
import { EntertainmentMasterForm } from '@screens/entertainment/specs/EntertainmentMasterForm'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const EntertainmentRoute = withProviders([[EntertainmentProvider]])

export const entertainmentRoute = {
	path: 'entertainment',
	element: (
		<EntertainmentRoute>
			<Outlet />
		</EntertainmentRoute>
	),
	children: [
		{
			index: true,
			element: <EntertainmentList />
		},
		{
			path: 'specs',
			element: <EntertainmentMasterForm />
		}
	]
}
