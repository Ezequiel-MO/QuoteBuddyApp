import MainClientPage from 'src/client/MainClientPage'
import { RouteConfig } from './routeInterface'
import PDFPresentation from '@screens/clientMainPage/pdf/PDFPresentation'

export const clientRoutes: RouteConfig[] = [
	{
		index: true,
		element: <MainClientPage />
		/* loader: fetchSettings */
	},
	{
		path: 'pdf',
		element: <PDFPresentation />
	}
]
