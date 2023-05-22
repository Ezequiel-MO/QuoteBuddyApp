import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

export const CardAdd = ({ name, route, timeOfEvent, dayOfEvent }) => {
	const navigate = useNavigate()
	return (
		<div
			className="rounded-lg cursor-pointer border border-transparent bg-[#000] text-left w-[280px] flex items-center active:scale-95 active:transition active:duration-150 active:ease-in-out"
			onClick={() =>
				navigate(`/app/${route}`, {
					state: {
						timeOfEvent,
						dayOfEvent
					}
				})
			}
		>
			<h2 className="text-sm font-semibold flex items-center hover:bg-gray-600 hover:rounded-lg w-full">
				<Icon icon="bi:plus" width="30" className="text-orange-700" />
				<span className="uppercase text-white-0 ">Add {name}</span>
			</h2>
		</div>
	)
}
