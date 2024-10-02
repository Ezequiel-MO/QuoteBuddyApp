import HotelsList from 'src/client/components/hotels-list/HotelsList'
import { RouteConfig } from './routeInterface'
import ClientProjectDashboard from 'src/client/ClientProjectDashboard'
import Map from 'src/client/components/map/Map'
import ProjectOverview from 'src/client/components/project-overview/ProjectOverview'
import Schedule from 'src/client/components/schedule/Schedule'
import GiftsList from 'src/client/components/gifts-list/GiftsList'
import ClientBrief from 'src/client/components/client-brief/ClientBrief'
import ImageGallery from 'src/client/components/image-gallery/ImageGallery'
import NotFound from 'src/client/components/not-found/NotFound'

export const clientRoutes: RouteConfig[] = [
	{
		path: '',
		element: <ClientProjectDashboard />,
		children: [
			{
				index: true,
				element: <ProjectOverview />
			},
			{
				path: 'overview',
				element: <ProjectOverview />
			},
			{
				path: 'hotels',
				element: <HotelsList />
			},
			{
				path: 'schedule',
				element: <Schedule />
			},
			{
				path: 'map',
				element: <Map />
			},

			{
				path: 'gifts',
				element: <GiftsList />
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
