import { PaymentsProvider } from '@screens/cash_flow/context/PaymentsProvider'
import { VendorInvoicesList } from '@screens/cash_flow/list/VendorInvoicesList'
import { VendorInvoiceSpecs } from '@screens/cash_flow/specs/VendorInvoiceSpecs'
import { GeneralExpenseProvider } from '@screens/general_expenses/context/GeneralExpensesContext'
import { GeneralExpenseList } from '@screens/general_expenses/list/GeneralExpenseList'
import { GeneralExpenseMasterForm } from '@screens/general_expenses/specs/GeneralExpenseMasterForm'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const ExpenseRoute = withProviders([
	[GeneralExpenseProvider],
	[PaymentsProvider]
])

export const expenseRoute = {
	path: 'expense',
	element: (
		<ExpenseRoute>
			<Outlet />
		</ExpenseRoute>
	),
	children: [
		{
			index: true,
			element: <GeneralExpenseList />
		},
		{
			path: 'specs',
			element: <GeneralExpenseMasterForm />
		},
		{
			path: 'vendorInvoice',
			element: <VendorInvoicesList />
		},
		{
			path: 'vendorInvoice/specs',
			element: <VendorInvoiceSpecs />
		}
	]
}
