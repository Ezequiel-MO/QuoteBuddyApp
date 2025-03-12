import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'
import Map from 'src/client/components/map/Map'
import { Destination } from 'src/client/destination/Destination'
import PDFPresentation from 'src/client/pdf/PDFPresentation'
import { QuotationProvider } from 'src/quotation/context/QuotationContext'
import QuotationDashboard from 'src/quotation/pages/QuotationDashboard'

// Create a provider wrapper using withProviders HOC
const QuotationRoute = withProviders([[QuotationProvider]])

// Export the route configuration
export const quotationRoute = {
	path: 'quotation',
	element: (
		<QuotationRoute>
			<Outlet />
		</QuotationRoute>
	),
	children: [
		{
			index: true,
			element: <QuotationDashboard />
		},
		{
			path: 'map',
			element: <Map />
		},
		{
			path: 'destination',
			element: <Destination />
		},
		{
			path: 'pdf',
			element: <PDFPresentation />
		}
	]
}
