import {
	AccManagerList,
	AccManagerSpecs,
	ClientList,
	ClientSpecs,
	CountryList,
	CountrySpecs,
	ActivityList,
	LocationList,
	LocationSpecs,
	RestaurantList,
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
import { HotelList, HotelMasterForm } from '../screens/hotels'
import { FreeLancerList, FreeLancerSpecs } from '../screens/freeLancers'
import { GiftList, GiftSpecs } from '../screens/gifts'
import { EntertainmentList } from '@screens/entertainment/list/EntertainmentList'
import { RouteConfig } from './routeInterface'
import { TicketHome } from '@screens/tickets/TicketHome'
import { TicketRoutes } from 'src/layouts/TicketRoutes'
import { TicketPage } from '@screens/tickets/TicketPage'
import { ScheduleProvider } from '@screens/projects/render/schedule/render/ScheduleContext'
import { RenderSchedule } from '@screens/projects/render'
import { SalesForecast } from '@screens/sales/SalesForecast'
import { fetchSettings } from 'src/helper/fetch/fetchSettings'
import { Stats } from '@screens/sales/Stats'
import { fetchInvoices } from 'src/helper/fetch/fetchInvoices'
import { MapWrapper } from '@screens/vendor_map/Wrapper'
import { Budget } from '@screens/budget/MainTable/higherComponents'
import { PaymentsList } from '@screens/cash_flow/list/PaymentsList'
import PaymentsSpecs from '@screens/cash_flow/specs/PaymentsSpecs'
import { InvoiceProvider } from '@screens/invoices/context/InvoiceContext'
import { Outlet } from 'react-router-dom'
import { PaymentsProvider } from '@screens/cash_flow/context/PaymentsProvider'
import { PaymentSlip } from '@screens/payment_slip/PaymentSlip'
import { PaymentSlipProvider } from '@screens/payment_slip/context/PaymentSlipContext'
import { HotelProvider } from '@screens/hotels/context/HotelsContext'
import RestaurantMasterForm from '@screens/restaurants/specs/RestaurantMasterForm'
import { RestaurantProvider } from '@screens/restaurants/context/RestaurantsContext'
import { ActivityProvider } from '@screens/events/context/ActivitiesContext'
import ActivityMasterForm from '@screens/events/specs/ActivityMasterForm'
import { EntertainmentProvider } from '@screens/entertainment/context/EntertainmentsContext'
import { EntertainmentMasterForm } from '@screens/entertainment/specs/EntertainmentMasterForm'

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
		path: 'notification',
		element: <NotificationList />
	},
	{
		path: 'notification/specs',
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
		element: (
			<ActivityProvider>
				<Outlet />
			</ActivityProvider>
		),
		children: [
			{
				index: true,
				element: <ActivityList />
			},
			{
				path: 'specs',
				element: <ActivityMasterForm />
			}
		]
	},
	{
		path: 'hotel',
		element: (
			<HotelProvider>
				<Outlet />
			</HotelProvider>
		),
		children: [
			{
				index: true,
				element: <HotelList />
			},
			{
				path: 'specs',
				element: <HotelMasterForm />
			},
			{
				path: ':hotelId',
				element: <AddHotelToProject />
			}
		]
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
		element: <ProjectList />
	},
	{
		path: 'project/specs',
		element: <ProjectSpecs />
	},
	{
		path: 'project/:projectId/payment_slip',
		element: (
			<PaymentSlipProvider>
				<PaymentSlip />
			</PaymentSlipProvider>
		)
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
		element: (
			<RestaurantProvider>
				<Outlet />
			</RestaurantProvider>
		),
		children: [
			{
				index: true,
				element: <RestaurantList />
			},
			{
				path: 'specs',
				element: <RestaurantMasterForm />
			}
		]
	},
	{
		path: 'entertainment',
		element: (
			<EntertainmentProvider>
				<Outlet />
			</EntertainmentProvider>
		),
		children: [
			{
				index: true,
				element: <EntertainmentList />
			},
			{
				path: 'specs',
				element: <EntertainmentMasterForm />
			}
		]
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
		element: (
			<InvoiceProvider>
				<Outlet />
			</InvoiceProvider>
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
			}
		]
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
		element: <SalesForecast />
	},
	{
		path: 'stats',
		element: <Stats />,
		loader: fetchInvoices
	},
	{
		path: 'cash_flow',
		element: (
			<PaymentsProvider>
				<Outlet />
			</PaymentsProvider>
		),
		children: [
			{
				index: true,
				element: <PaymentsList />
			},
			{
				path: 'specs',
				element: <PaymentsSpecs />
			}
		]
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
	},
	{
		path: 'map',
		element: <MapWrapper />
	},
	{
		path: 'budget',
		element: <Budget />
	}
]
