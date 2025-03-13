import { RouteConfig } from './routeInterface'
import ClientProjectDashboard from 'src/client/ClientProjectDashboard'
import Map from 'src/client/components/map/Map'
import ClientBrief from 'src/client/components/client-brief/ClientBrief'
import ImageGallery from 'src/client/components/image-gallery/ImageGallery'
import NotFound from 'src/client/components/not-found/NotFound'
import MainClientPage from 'src/client/MainClientPage'
import { Destination } from 'src/client/destination/Destination'
import PDFPresentation from 'src/client/pdf/PDFPresentation'

export const clientRoutes: RouteConfig[] = [
	{
		path: '',
		element: <ClientProjectDashboard />,
		children: [
			{
				index: true,
				element: <MainClientPage />
			},
			{
				path: 'main-page',
				element: <MainClientPage />
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
			},
			{
				path: 'client-brief',
				element: <ClientBrief />
			},
			{
				path: 'gallery',
				element: <ImageGallery />
			},
			{
				path: '*',
				element: <NotFound />
			}
		]
	}
]
