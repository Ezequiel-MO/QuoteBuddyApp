import { TransferList } from '@screens/index'
import { TransferProvider } from '@screens/transfers/context/TransfersContext'
import { TransferMasterForm } from '@screens/transfers/specs/TransferMasterForm'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const TransferRoute = withProviders([[TransferProvider]])

export const transferRoute = {
	path: 'transfer',
	element: (
		<TransferRoute>
			<Outlet />
		</TransferRoute>
	),
	children: [
		{
			index: true,
			element: <TransferList />
		},
		{
			path: 'specs',
			element: <TransferMasterForm />
		}
	]
}
