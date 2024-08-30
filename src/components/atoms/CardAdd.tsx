import { FC } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

interface CardAddProps {
	renderAddCard?: boolean
	name: string
	route: string
	timeOfEvent?: string | null
	dayOfEvent?: number | null
}

export const CardAdd: FC<CardAddProps> = ({
	renderAddCard = true,
	name,
	route,
	timeOfEvent,
	dayOfEvent
}) => {
	const navigate = useNavigate()

	const handleClick = () => {
		localStorage.setItem(
			'activeProjectTab',
			name === 'hotel' ? 'Hotels' : 'Schedule'
		)
		navigate(`/app/${route}`, {
			state: {
				timeOfEvent,
				dayOfEvent
			}
		})
	}

	if (!renderAddCard) return null

	return (
		<div
			className="mt-2 min-w-[250px] rounded-lg cursor-pointer border-2 border-dotted border-gray-400 dark:border-gray-500 bg-black-50 flex items-center justify-start p-2 hover:bg-gray-600 active:scale-95 transition duration-150 ease-in-out shadow-sm"
			onClick={handleClick}
		>
			<h2 className="text-sm font-semibold text-white-0 hover:text-cyan-400 flex flex-row items-center justify-center">
				<Icon icon="bi:plus" width="24" className="text-orange-500 mr-2" />
				<span className="uppercase whitespace-nowrap">Add {name}</span>
			</h2>
		</div>
	)
}
