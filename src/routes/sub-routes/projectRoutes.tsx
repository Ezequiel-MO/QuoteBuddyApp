import { PaymentsProvider } from '@screens/cash_flow/context/PaymentsProvider'
import { PaymentsList } from '@screens/cash_flow/payments/list/PaymentsList'
import { PaymentMasterForm } from '@screens/cash_flow/payments/specs/PaymentMasterForm'
import { ClientProvider } from '@screens/clients/context/ClientContext'
import { CompanyProvider } from '@screens/companies/context/CompanyContext'
import { InvoiceSpecs } from '@screens/index'
import { InvoiceProvider } from '@screens/invoices/context/InvoiceContext'
import { PaymentSlipProvider } from '@screens/payment_slip/context/PaymentSlipContext'
import { PaymentSlip } from '@screens/payment_slip/PaymentSlip'
import { ProjectProvider } from '@screens/projects/context/ProjectContext'
import { ProjectList } from '@screens/projects/list'
import ProjectComposition from '@screens/projects/render/schedule/render/ProjectComposition'
import { ProjectMasterForm } from '@screens/projects/specs/ProjectMasterForm'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'
import { InvoiceVisualize } from '@screens/invoices/invoice_front_page'
import { VendorInvoiceMasterForm } from '@screens/cash_flow/specs/VendorInvoiceMasterForm'
import { QuotationProvider } from '@client/context/QuotationContext'
import MainClientPage from '@client/MainClientPage'

const ProjectRoute = withProviders([
	[ProjectProvider],
	[CompanyProvider],
	[ClientProvider]
])

const PaymentSlipRoute = withProviders([
	[PaymentSlipProvider],
	[PaymentsProvider],
	[InvoiceProvider]
])

export const projectRoutes = [
	{
		path: 'project',
		element: (
			<ProjectRoute>
				<Outlet />
			</ProjectRoute>
		),
		children: [
			{
				index: true,
				element: <ProjectList />
			},
			{
				path: 'specs',
				element: <ProjectMasterForm />
			},
			{
				path: 'preview/:projectId',
				element: (
					<QuotationProvider>
						<MainClientPage />
					</QuotationProvider>
				)
			}
		]
	},
	{
		path: 'project/schedule',
		element: <ProjectComposition />
	},
	{
		path: 'project/:projectId/payment_slip',
		element: (
			<PaymentSlipRoute>
				<Outlet />
			</PaymentSlipRoute>
		),
		children: [
			{
				index: true,
				element: <PaymentSlip />
			},
			{
				path: 'vendorInvoice_specs',
				element: <VendorInvoiceMasterForm />
			},
			{
				path: 'payment',
				element: <PaymentsList />
			},
			{
				path: 'payment/specs',
				element: <PaymentMasterForm />
			},
			{
				path: 'invoice_specs',
				element: <InvoiceSpecs />
			},
			{
				path: 'invoice_specs/:invoiceId',
				element: <InvoiceVisualize />
			}
		]
	}
]
