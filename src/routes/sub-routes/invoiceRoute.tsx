import { ClientProvider } from '@screens/clients/context/ClientContext'
import { CompanyProvider } from '@screens/companies/context/CompanyContext'
import { InvoiceSpecs } from '@screens/index'
import { InvoiceList } from '@screens/invoices'
import { InvoiceProvider } from '@screens/invoices/context/InvoiceContext'
import { InvoiceVisualize } from '@screens/invoices/invoice_front_page'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const InvoiceRoute = withProviders([
	[CompanyProvider],
	[InvoiceProvider],
	[ClientProvider]
])

export const invoiceRoute = {
	path: 'invoice',
	element: (
		<InvoiceRoute>
			<Outlet />
		</InvoiceRoute>
	),
	children: [
		{
			index: true,
			element: <InvoiceList />
		},
		{
			path: 'specs',
			element: <InvoiceSpecs />
		},
		{
			path: 'specs/:invoiceId',
			element: <InvoiceVisualize />
		},
		//ruta list Invoices proforma
		{
			path: 'proforma',
			element: <div>Vista de facturas proforma en construcción</div>
		}
	]
}
