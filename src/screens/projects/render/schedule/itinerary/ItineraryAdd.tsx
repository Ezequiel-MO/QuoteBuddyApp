import React, { FC } from "react"
import { Icon } from '@iconify/react'

interface ItineraryAddProps {
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
	openModal: boolean
	dayIndex: number
	setDayIndex: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const ItineraryAdd: FC<ItineraryAddProps> = ({ openModal, setOpenModal , dayIndex , setDayIndex }) => {

	const handleClick = () => {
		setOpenModal(true)
		setDayIndex(dayIndex)
	}


	return (
		<div
			className="rounded-lg cursor-pointer border-2 border-dotted border-gray-500 bg-gray-800 w-full flex items-center justify-between p-4 hover:border-orange-500 active:scale-95 transition duration-150 ease-in-out"
			onClick={handleClick}
		>
			<h2 className="text-sm font-semibold text-gray-300 truncate flex flex-row items-center justify-center">
				<Icon icon="bi:plus" width="30" className="text-orange-500 mr-2" />
				<span className="uppercase whitespace-nowrap">Add Transfer</span>
			</h2>
		</div>
	)
}
