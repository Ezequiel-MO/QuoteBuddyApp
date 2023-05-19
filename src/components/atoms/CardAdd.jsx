import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

export const CardAdd = ({ name, route, timeOfEvent, dayOfEvent }) => {
	const navigate = useNavigate()
	return (
		<div
			className="opacity-70 my-1 mx-2 mr-1 rounded-lg cursor-pointer p-2 border border-transparent bg-orange-200 text-left w-[150px] h-8 flex items-center active:scale-95 active:transition active:duration-150 active:ease-in-out hover:bg-orange-300"
			onClick={() =>
				navigate(`/app/${route}`, {
					state: {
						timeOfEvent,
						dayOfEvent
					}
				})
			}
		>
			<h2 className="text-sm font-semibold ml-2 flex items-center">
				<Icon icon="bi:plus" width="30" className="mr-1 text-orange-700" />
				<span className="ml-1 capitalize text-black-50">Add {name}</span>
			</h2>
		</div>
	)
}
