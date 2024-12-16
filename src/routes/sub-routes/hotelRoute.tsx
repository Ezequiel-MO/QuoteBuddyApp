import { HotelList, HotelMasterForm } from '@screens/hotels'
import { HotelProvider } from '@screens/hotels/context/HotelsContext'
import { AddHotelToProject } from '@screens/projects/add'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const HotelRoute = withProviders([[HotelProvider]])

export const hotelRoute = {
	path: 'hotel',
	element: (
		<HotelRoute>
			<Outlet />
		</HotelRoute>
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
}
