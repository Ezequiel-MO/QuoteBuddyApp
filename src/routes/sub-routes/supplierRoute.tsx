import { SupplierProvider } from '@screens/suppliers/context/SupplierContext'
import { SupplierList } from '@screens/suppliers/list/SupplierList'
import SupplierMasterForm from '@screens/suppliers/specs/SupplierMasterForm'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const SupplierRoute = withProviders([[SupplierProvider]])

export const supplierRoute = {
	path: 'supplier',
	element: (
		<SupplierRoute>
			<Outlet />
		</SupplierRoute>
	),
	children: [
		{
			index: true,
			element: <SupplierList />
		},
		{
			path: 'specs',
			element: <SupplierMasterForm />
		}
	]
}
