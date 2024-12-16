import { RestaurantList } from '@screens/index'
import { RestaurantProvider } from '@screens/restaurants/context/RestaurantsContext'
import RestaurantMasterForm from '@screens/restaurants/specs/RestaurantMasterForm'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const RestaurantRoute = withProviders([[RestaurantProvider]])

export const restaurantRoute = {
	path: 'restaurant',
	element: (
		<RestaurantRoute>
			<Outlet />
		</RestaurantRoute>
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
}
