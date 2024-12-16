import { PaymentsProvider } from '@screens/cash_flow/context/PaymentsProvider'
import { VendorInvoicesList } from '@screens/cash_flow/list/VendorInvoicesList'
import { PaymentsList } from '@screens/cash_flow/payments/list/PaymentsList'
import { PaymentMasterForm } from '@screens/cash_flow/payments/specs/PaymentMasterForm'
import { VendorInvoiceSpecs } from '@screens/cash_flow/specs/VendorInvoiceSpecs'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const CashFlowRoute = withProviders([[PaymentsProvider]])

export const cashFlowRoute = {
	path: 'cash_flow',
	element: (
		<CashFlowRoute>
			<Outlet />
		</CashFlowRoute>
	),
	children: [
		{
			index: true,
			element: <VendorInvoicesList />
		},
		{
			path: 'specs',
			element: <VendorInvoiceSpecs />
		},
		{
			path: 'payment',
			element: <PaymentsList />
		},
		{
			path: 'payment/specs',
			element: <PaymentMasterForm />
		}
	]
}
