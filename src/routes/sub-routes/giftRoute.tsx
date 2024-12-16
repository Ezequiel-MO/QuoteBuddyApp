import { GiftList, GiftMasterForm } from '@screens/gifts'
import { GiftProvider } from '@screens/gifts/context/GiftsContext'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const GiftRoute = withProviders([[GiftProvider]])

export const giftRoute = {
	path: 'gift',
	element: (
		<GiftRoute>
			<Outlet />
		</GiftRoute>
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
}
