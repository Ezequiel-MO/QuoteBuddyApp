import Login from '../components/Login'
import AuthLayout from '../layouts/AuthLayout'
import GeneralLayout from '../layouts/GeneralLayout'
import SettingsPage from '../screens/settings/SettingsPage'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from './error-page'
import {
  AccManagerList,
  AccManagerSpecs,
  AddEventToSchedule,
  AddHotelToProject,
  AddScheduleToProject,
  AddTransfersINToProject,
  AddTransfersOUTToProject,
  ClientList,
  ClientSpecs,
  CountryList,
  CountrySpecs,
  Dashboard,
  EventList,
  EventSpecs,
  HotelList,
  HotelSpecs,
  LocationList,
  LocationSpecs,
  ProjectList,
  ProjectSpecs,
  RestaurantList,
  RestaurantSpecs,
  TransferList,
  TransferSpecs,
  InvoiceList,
  InvoiceSpecs,
  Presentation
} from '../screens'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />
      }
    ],
    errorElement: <ErrorPage />
  },
  {
    path: 'app',
    element: <GeneralLayout />,
    children: [
      {
        index: true,
        element: <Presentation />
      },
      {
        path: 'settings',
        element: <SettingsPage />
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
        path: 'client',
        element: <ClientList />
      },
      {
        path: 'client/specs',
        element: <ClientSpecs />
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
        element: <EventList />
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
        element: <ProjectList />
      },
      {
        path: 'project/specs',
        element: <ProjectSpecs />
      },
      {
        path: 'project/schedule',
        element: <AddScheduleToProject />
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
        path: 'project/schedule/:eventId',
        element: <AddEventToSchedule />
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
      }
    ]
  }
])

export default router
