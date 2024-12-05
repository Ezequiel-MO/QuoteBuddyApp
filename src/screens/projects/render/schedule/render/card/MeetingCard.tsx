import { Icon } from '@iconify/react'
import { DeleteIcon } from '@components/atoms'
import { IMeeting } from '@interfaces/meeting'
import React, { FC } from 'react'

interface MeetingCardProps {
	meeting: IMeeting
	onDelete: (id: string) => void
	index: string
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
	const deletedIcon =
		' hover:text-gray-700 hover:scale-125 hover:transition hover:duration-150 hover:ease-in-out'
	return (
		<div
			className="flex items-center p-2 my-2 bg-gray-700 border border-gray-600 rounded-md shadow-lg cursor-pointer hover:bg-gray-600 transition duration-150 ease-in-out"
			id={`meeting-${index}`}
			onClick={(e) => handleClick(e, meeting)}
		>
			<span className="hover:text-gray-300 hover:scale-125 transition duration-150 ease-in-out text-white-0 mr-2 text-lg">
				<Icon icon="ph:coffee-bold" />
			</span>
			<span className="text-gray-400 mx-2">
				<Icon icon="mdi:eye-outline" />
			</span>
			<p className="truncate text-white-0 flex-1">{meeting.hotelName}</p>
			<DeleteIcon id={meeting._id} onDelete={onDelete} />
		</div>
	)
}
