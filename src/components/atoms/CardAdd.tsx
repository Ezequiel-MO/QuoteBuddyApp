import { FC } from 'react'
import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

interface CardAddProps {
	renderAddCard?: boolean
	name: string
	route: string
	timeOfEvent?: string
	dayOfEvent?: number
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
			className="min-w-[250px] rounded-lg cursor-pointer border-2 border-dotted border-gray-500 bg-gray-800 w-full flex items-center justify-between p-4 hover:border-orange-500 active:scale-95 transition duration-150 ease-in-out"
			onClick={handleClick}
		>
			<h2 className="text-sm font-semibold text-gray-300 truncate flex flex-row items-center justify-center">
				<Icon icon="bi:plus" width="30" className="text-orange-500 mr-2" />
				<span className="uppercase whitespace-nowrap">Add {name}</span>
			</h2>
		</div>
	)
}

CardAdd.propTypes = {
	name: PropTypes.string.isRequired,
	route: PropTypes.string.isRequired,
	timeOfEvent: PropTypes.string,
	dayOfEvent: PropTypes.number
}
