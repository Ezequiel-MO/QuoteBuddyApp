import { AudiovisualProvider } from '@screens/audiovisuals/context/AudiovisualsContext'
import { AudiovisualList } from '@screens/audiovisuals/list/AudiovisualList'
import AudiovisualMasterForm from '@screens/audiovisuals/specs/AudiovisualMasterForm'
import ActivityMasterForm from '@screens/events/specs/ActivityMasterForm'
import { Outlet } from 'react-router-dom'
import { withProviders } from 'src/HOC/WithProviders'

const AudiovisualRoute = withProviders([[AudiovisualProvider]])

export const audiovisualRoute = {
	path: 'audiovisual',
	element: (
		<AudiovisualRoute>
			<Outlet />
		</AudiovisualRoute>
	),
	children: [
		{
			index: true,
			element: <AudiovisualList />
		},
		{
			path: 'specs',
			element: <AudiovisualMasterForm />
		}
	]
}
