import { LocationList } from '@screens/index'
import { LocationProvider } from '@screens/locations/context/LocationsContext'
import LocationMasterForm from '@screens/locations/specs/LocationMasterForm'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const LocationRoute = withProviders([[LocationProvider]])

export const locationRoute = {
	path: 'location',
	element: (
		<LocationRoute>
			<Outlet />
		</LocationRoute>
	),
	children: [
		{
			index: true,
			element: <LocationList />
		},
		{
			path: 'specs',
			element: <LocationMasterForm />
		}
	]
}
