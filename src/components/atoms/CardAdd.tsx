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
	const handleClick = () =>
		navigate(`/app/${route}`, {
			state: {
				timeOfEvent,
				dayOfEvent
			}
		})

	if (!renderAddCard) return null

	const cardClassNames =
		'rounded-lg cursor-pointer border border-transparent bg-[#000] text-left w-[280px] flex items-center active:scale-95 active:transition active:duration-150 active:ease-in-out'
	const headerClassNames =
		'text-sm font-semibold flex items-center hover:bg-gray-600 hover:rounded-lg w-full'
	return (
		<div className={cardClassNames} onClick={handleClick}>
			<h2 className={headerClassNames}>
				<Icon icon="bi:plus" width="30" className="text-orange-700" />
				<span className="uppercase text-white-0 ">Add {name}</span>
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
