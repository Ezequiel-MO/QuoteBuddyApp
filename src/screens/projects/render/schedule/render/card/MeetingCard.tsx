import { Icon } from '@iconify/react'
import { DeleteIcon } from '@components/atoms'
import { IMeeting } from '@interfaces/meeting'
import React, { FC } from 'react'

interface MeetingCardProps {
	meeting: IMeeting
	onDelete: (id: string) => void
	index: number
	handleClick: (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		meeting: IMeeting
	) => void
}

export const MeetingCard: FC<MeetingCardProps> = ({
	meeting,
	onDelete,
	index,
	handleClick
}) => {
	return (
		<div
			className="flex items-center p-2 my-2 bg-gray-700 border border-gray-600 rounded-md shadow-md cursor-pointer hover:bg-gray-600 transition duration-150 ease-in-out text-white-0"
			id={`meeting-${index}`}
			onClick={(e) => handleClick(e, meeting)}
		>
			<span className="hover:text-gray-300 hover:scale-125 transition duration-150 ease-in-out mr-2 text-lg">
				<Icon icon="ph:coffee-bold" />
			</span>
			<span className="text-gray-400 mx-2">
				<Icon icon="mdi:eye-outline" />
			</span>
			<p className="truncate flex-1">{meeting.hotelName}</p>
			<DeleteIcon id={meeting._id} onDelete={onDelete} />
		</div>
	)
}
