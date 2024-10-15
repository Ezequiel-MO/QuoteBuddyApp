import {
	AccManagerList,
	ClientList,
	CountryList,
	ActivityList,
	LocationList,
	RestaurantList,
	TransferList,
	InvoiceSpecs,
	Presentation,
	UserList,
	UserSpecs,
	CompanyList,
	NotificationList
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
import { InvoiceList } from '../screens/invoices'
import { HotelList, HotelMasterForm } from '../screens/hotels'
import { FreeLancerList, FreeLancerMasterForm } from '../screens/freeLancers'
import { GiftList, GiftMasterForm } from '../screens/gifts'
import { EntertainmentList } from '@screens/entertainment/list/EntertainmentList'
import { RouteConfig } from './routeInterface'
import { TicketHome } from '@screens/tickets/TicketHome'
import { TicketRoutes } from 'src/layouts/TicketRoutes'
import { TicketPage } from '@screens/tickets/TicketPage'
import { SalesForecast } from '@screens/sales/SalesForecast'
import { fetchSettings } from 'src/helper/fetch/fetchSettings'
import { Stats } from '@screens/sales/Stats'
import { fetchInvoices } from 'src/helper/fetch/fetchInvoices'
import { MapWrapper } from '@screens/vendor_map/Wrapper'
import { Budget } from '@screens/budget/MainTable/higherComponents'
import { VendorInvoicesList } from '@screens/cash_flow/list/VendorInvoicesList'
import { VendorInvoiceSpecs } from '@screens/cash_flow/specs/VendorInvoiceSpecs'
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
import { TransferProvider } from '@screens/transfers/context/TransfersContext'
import { TransferMasterForm } from '@screens/transfers/specs/TransferMasterForm'
import AccManagerMasterForm from '@screens/accManagers/specs/AccManagerMasterForm'
import { AccManagerProvider } from '@screens/accManagers/context/AccManagersContext'
import { FreelancerProvider } from '@screens/freeLancers/context/FreelancerContext'
import { NotificationMasterForm } from '@screens/notifications/specs/NotificationMasterForm'
import { NotificationProvider } from '@screens/notifications/context/NotificationContext'
import { PaymentsList } from '@screens/cash_flow/payments/list/PaymentsList'
import { PaymentMasterForm } from '@screens/cash_flow/payments/specs/PaymentMasterForm'
import ClientMasterForm from '@screens/clients/specs/ClientMasterForm'
import CompanyMasterForm from '@screens/companies/specs/CompanyMasterForm'
import { ClientProvider } from '@screens/clients/context/ClientContext'
import { CompanyProvider } from '@screens/companies/context/CompanyContext'
import CountryMasterForm from '@screens/countries/specs/CountryMasterForm'
import { CountryProvider } from '@screens/countries/context/CountriesContext'
import { GiftProvider } from '@screens/gifts/context/GiftsContext'
import { LocationProvider } from '@screens/locations/context/LocationsContext'
import LocationMasterForm from '@screens/locations/specs/LocationMasterForm'
import Quotation from '@screens/quotation/Quotation'
import QuotationMasterForm from '@screens/quotation/specs/QuotationMasterForm'
import { ProjectMasterForm } from '@screens/projects/specs/ProjectMasterForm'
import ProjectComposition from '@screens/projects/render/schedule/render/ProjectComposition'
import { ProjectProvider } from '@screens/projects/context/ProjectContext'

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
		element: (
			<AccManagerProvider>
				<Outlet />
			</AccManagerProvider>
		),
		children: [
			{
				index: true,
				element: <AccManagerList />
			},
			{
				path: 'specs',
				element: <AccManagerMasterForm />
			}
		]
	},
	{
		path: 'notification',
		element: (
			<NotificationProvider>
				<Outlet />
			</NotificationProvider>
		),
		children: [
			{
				index: true,
				element: <NotificationList />
			},
			{
				path: 'specs',
				element: <NotificationMasterForm />
			}
		]
	},
	{
		path: 'country',
		element: (
			<CountryProvider>
				<Outlet />
			</CountryProvider>
		),
		children: [
			{
				index: true,
				element: <CountryList />
			},
			{
				path: 'specs',
				element: <CountryMasterForm />
			}
		]
	},
	{
		path: 'activity',
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
		element: (
			<LocationProvider>
				<Outlet />
			</LocationProvider>
		),
		children: [
			{
				index: true,
				element: <LocationList />
			},
			{
				path: 'specs',
				element: <LocationMasterForm />
			}
		]
	},
	{
		path: 'quotation',
		element: <Outlet />,
		children: [
			{
				index: true,
				element: <ProjectList />
			},
			{
				path: 'specs',
				element: <QuotationMasterForm />
			},
			{
				path: 'schedule',
				element: <Quotation />
			}
		]
	},
	{
		path: 'project',
		element: (
			<ProjectProvider>
				<Outlet />
			</ProjectProvider>
		),
		children: [
			{
				index: true,
				element: <ProjectList />
			},
			{
				path: 'specs',
				element: <ProjectMasterForm />
			}
		]
	},
	// {
	// 	path: 'project/specs',
	// 	element: <ProjectMasterForm />
	// },
	{
		path: 'project/schedule',
		element: (
			<>
				<ProjectComposition />
			</>
		)
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
		path: 'project/schedule/transfers_in', //REVISAR PARA ELEMINAR
		element: <AddTransfersINToProject />
	},
	{
		path: 'project/schedule/transfers_out', //REVISAR PARA ELEMINAR
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
		element: (
			<TransferProvider>
				<Outlet />
			</TransferProvider>
		),
		children: [
			{
				index: true,
				element: <TransferList />
			},
			{
				path: 'specs',
				element: <TransferMasterForm />
			}
		]
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
		path: 'marketing',
		element: (
			<CompanyProvider>
				<ClientProvider>
					<Outlet />
				</ClientProvider>
			</CompanyProvider>
		),
		children: [
			{
				path: 'client',
				element: <ClientList />
			},
			{
				path: 'client/specs',
				element: <ClientMasterForm />
			},
			{
				path: 'company',
				element: <CompanyList />
			},
			{
				path: 'company/specs',
				element: <CompanyMasterForm />
			}
		]
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
	},
	{
		path: 'freelancer',
		element: (
			<FreelancerProvider>
				<Outlet />
			</FreelancerProvider>
		),
		children: [
			{
				index: true,
				element: <FreeLancerList />
			},
			{
				path: 'specs',
				element: <FreeLancerMasterForm />
			}
		]
	},
	{
		path: 'gift',
		element: (
			<GiftProvider>
				<Outlet />
			</GiftProvider>
		),
		children: [
			{
				index: true,
				element: <GiftList />
			},
			{
				path: 'specs',
				element: <GiftMasterForm />
			}
		]
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
