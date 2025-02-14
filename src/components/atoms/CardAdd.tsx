import React, { FC } from 'react'
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

	if (!renderAddCard) return null

	const handleClick = () => {
		localStorage.setItem(
			'activeProjectTab',
			name === 'hotel' ? 'Hotels' : 'Schedule'
		)
		navigate(`/app/${route}`, {
			state: {
				timeOfEvent,
				dayOfEvent,
				canbeAddedToProject: true
			}
		})
	}

	return (
		<div
			className="mt-2 flex items-center justify-start p-2 
        min-w-[200px] rounded-lg border-2 border-dotted border-gray-400 bg-gray-700 
        hover:bg-gray-600 active:scale-95 transition duration-150 ease-in-out cursor-pointer shadow-sm text-white-0"
			onClick={handleClick}
		>
			<h2 className="text-sm font-semibold uppercase flex items-center">
				<Icon icon="bi:plus" width="24" className="text-orange-500 mr-1" />
				<span>Add {name}</span>
			</h2>
		</div>
	)
}
