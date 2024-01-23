import {
	AccManagerList,
	AccManagerSpecs,
	ClientList,
	ClientSpecs,
	CountryList,
	CountrySpecs,
	ActivityList,
	EventSpecs,
	LocationList,
	LocationSpecs,
	RestaurantList,
	RestaurantSpecs,
	TransferList,
	TransferSpecs,
	InvoiceSpecs,
	Presentation,
	UserList,
	UserSpecs,
	CompanyList,
	CompanySpecs,
	NotificationList,
	NotificationSpecs
} from '../screens'
import { InvoiceVisualize } from '../screens/invoices/invoice_front_page'
import {
	AddHotelToProject,
	AddTransfersINToProject,
	AddTransfersOUTToProject
} from '../screens/projects/add'
import { ProjectList } from '../screens/projects/list'
import { Settings } from 'src/screens/settings/Settings'
import { SettingsCompany } from 'src/screens/settings/SettingsCompany'
import { SettingsModule } from 'src/screens/settings/SettingsModule'
import { ProjectSpecs } from '../screens/projects/main'
import { InvoiceList } from '../screens/invoices'
import { HotelList, HotelSpecs } from '../screens/hotels'
import { FreeLancerList, FreeLancerSpecs } from '../screens/freeLancers'
import { GiftList, GiftSpecs } from '../screens/gifts'
import { EntertainmentList } from '@screens/entertainment/list/EntertainmentList'
import { EntertainmentSpecs } from '@screens/entertainment/specs/EntertainmentSpecs'
import { RouteConfig } from './routeInterface'
import { TicketHome } from '@screens/tickets/TicketHome'
import { TicketRoutes } from 'src/layouts/TicketRoutes'
import { TicketPage } from '@screens/tickets/TicketPage'
import { ScheduleProvider } from '@screens/projects/render/schedule/render/ScheduleContext'
import { RenderSchedule } from '@screens/projects/render'
import { fetchProjects } from 'src/helper/fetch/fetchProjects'
import { SalesForecast } from '@screens/sales/SalesForecast'
import { fetchSettings } from 'src/helper/fetch/fetchSettings'
import baseAPI from 'src/axios/axiosConfig'

export const appRoutes: RouteConfig[] = [
	{
		index: true,
		element: <Presentation />,
		loader: fetchSettings
	},
	{
		path: 'settings',
		element: <Settings />
	},
	{
		path: 'settings/companySettings',
		element: <SettingsCompany />
	},
	{
		path: 'settings/modules',
		element: <SettingsModule />
	},
	{
		path: 'user',
		element: <UserList />
	},
	{
		path: 'user/specs',
		element: <UserSpecs />
	},
	{
		path: 'accManager',
		element: <AccManagerList />
	},
	{
		path: 'accManager/specs',
		element: <AccManagerSpecs />
	},
	{
		path: "notification",
		element: <NotificationList />
	},
	{
		path: "notification/specs",
		element: <NotificationSpecs />
	},
	{
		path: 'client',
		element: <ClientList />
	},
	{
		path: 'client/specs',
		element: (
			<ClientSpecs
				open={undefined}
				setOpen={undefined}
				dataCompany={undefined}
				setDataCompany={undefined}
			/>
		)
	},
	{
		path: 'country',
		element: <CountryList />
	},
	{
		path: 'country/specs',
		element: <CountrySpecs />
	},
	{
		path: 'event',
		element: <ActivityList />
	},
	{
		path: 'event/specs',
		element: <EventSpecs />
	},
	{
		path: 'hotel',
		element: <HotelList />
	},
	{
		path: 'hotel/specs',
		element: <HotelSpecs />
	},
	{
		path: 'hotel/:hotelId',
		element: <AddHotelToProject />
	},
	{
		path: 'location',
		element: <LocationList />
	},
	{
		path: 'location/specs',
		element: <LocationSpecs />
	},
	{
		path: 'project',
		element: <ProjectList />,
		loader: async () => {
			try {
				const response = await baseAPI.get('projects')
				return response.data.data.data
			} catch (error) {
				throw new Error('cant load the projects ...')
			}
		}
	},
	{
		path: 'project/specs',
		element: <ProjectSpecs />
	},
	{
		path: 'project/schedule',
		element: (
			<>
				<ScheduleProvider>
					<RenderSchedule />
				</ScheduleProvider>
			</>
		)
	},
	{
		path: 'project/schedule/transfers_in',
		element: <AddTransfersINToProject />
	},
	{
		path: 'project/schedule/transfers_out',
		element: <AddTransfersOUTToProject />
	},
	{
		path: 'restaurant',
		element: <RestaurantList />
	},
	{
		path: 'restaurant/specs',
		element: <RestaurantSpecs />
	},
	{
		path: 'entertainment',
		element: <EntertainmentList />
	},
	{
		path: 'entertainment/specs',
		element: <EntertainmentSpecs />
	},
	{
		path: 'transfer',
		element: <TransferList />
	},
	{
		path: 'transfer/specs',
		element: <TransferSpecs />
	},
	{
		path: 'invoice',
		element: <InvoiceList />
	},
	{
		path: 'invoice/specs',
		element: <InvoiceSpecs />
	},
	{
		path: 'invoice/specs/:invoiceId',
		element: <InvoiceVisualize />
	},
	{
		path: 'company',
		element: <CompanyList />
	},
	{
		path: 'company/specs',
		element: <CompanySpecs />
	},
	{
		path: 'salesfc',
		element: <SalesForecast />,
		loader: fetchProjects
	},
	{
		path: 'freelancer',
		element: <FreeLancerList />
	},
	{
		path: 'freelancer/specs',
		element: <FreeLancerSpecs />
	},
	{
		path: 'gift',
		element: <GiftList />
	},
	{
		path: 'gift/specs',
		element: <GiftSpecs />
	},
	{
		path: 'tickets',
		element: <TicketRoutes />,
		children: [
			{
				index: true,
				element: <TicketHome />
			},
			{
				path: ':ticketId',
				element: <TicketPage />
			}
		]
	}
]
