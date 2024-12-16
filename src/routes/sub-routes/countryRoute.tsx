import { CountryProvider } from '@screens/countries/context/CountriesContext'
import CountryMasterForm from '@screens/countries/specs/CountryMasterForm'
import { CountryList } from '@screens/index'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const CountryRoute = withProviders([[CountryProvider]])

export const countryRoute = {
	path: 'country',
	element: (
		<CountryRoute>
			<Outlet />
		</CountryRoute>
	),
	children: [
		{
			index: true,
			element: <CountryList />
		},
		{
			path: 'specs',
			element: <CountryMasterForm />
		}
	]
}
