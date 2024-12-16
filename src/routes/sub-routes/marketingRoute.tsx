import { Outlet } from 'react-router-dom'
import { ClientProvider } from '@screens/clients/context/ClientContext'
import { CompanyProvider } from '@screens/companies/context/CompanyContext'
import { withProviders } from 'src/HOC/WithProviders'
import { ClientList, CompanyList } from '@screens/index'
import ClientMasterForm from '@screens/clients/specs/ClientMasterForm'
import CompanyMasterForm from '@screens/companies/specs/CompanyMasterForm'

const MarketingRoute = withProviders([[CompanyProvider], [ClientProvider]])

export const marketingRoute = {
	path: 'marketing',
	element: (
		<MarketingRoute>
			<Outlet />
		</MarketingRoute>
	),
	children: [
		{
			path: 'client',
			element: <ClientList />
		},
		{
			path: 'client/specs',
			element: <ClientMasterForm />
		},
		{
			path: 'company',
			element: <CompanyList />
		},
		{
			path: 'company/specs',
			element: <CompanyMasterForm />
		}
	]
}
