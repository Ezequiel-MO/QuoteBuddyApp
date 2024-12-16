import { FreeLancerList, FreeLancerMasterForm } from '@screens/freeLancers'
import { FreelancerProvider } from '@screens/freeLancers/context/FreelancerContext'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const FreelancerRoute = withProviders([[FreelancerProvider]])

export const freelancerRoute = {
	path: 'freelancer',
	element: (
		<FreelancerRoute>
			<Outlet />
		</FreelancerRoute>
	),
	children: [
		{
			index: true,
			element: <FreeLancerList />
		},
		{
			path: 'specs',
			element: <FreeLancerMasterForm />
		}
	]
}
