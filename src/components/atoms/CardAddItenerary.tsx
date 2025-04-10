import React, { FC } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

interface CardAddItineraryProps {
	name: string
	route: string
	dayIndex: number
	typeOfEvent:
		| 'morningActivity'
		| 'afternoonActivity'
		| 'nightActivity'
		| 'lunch'
		| 'dinner'
}

export const CardAddItenerary: FC<CardAddItineraryProps> = ({
	name,
	route,
	dayIndex,
	typeOfEvent
}) => {
	const navigate = useNavigate()

	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const addItinerary = {
			name,
			dayIndex,
			typeOfEvent
		}
		localStorage.setItem('addItinerary', JSON.stringify(addItinerary))
		navigate(`/app/${route}`)
	}

	return (
		<div
			className="min-w-[210px]  rounded-lg cursor-pointer border-2 border-dotted border-gray-500 bg-gray-800 w-full flex items-center justify-between p-4 hover:border-orange-500 active:scale-95 transition duration-150 ease-in-out"
			onClick={(e) => handleClick(e)}
		>
			<h2 className="text-sm font-semibold text-gray-300 truncate flex flex-row items-center justify-center">
				<Icon icon="bi:plus" width="30" className="text-orange-500 mr-2" />
				<span className="uppercase whitespace-nowrap">Add {name}</span>
			</h2>
		</div>
	)
}
