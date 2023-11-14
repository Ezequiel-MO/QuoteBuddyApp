import { Icon } from '@iconify/react'

import { DeleteIcon } from '@components/atoms'

export const MeetingCard = ({ meeting, onDelete, index, handleClick }) => {
	const deletedIcon =
		' hover:text-gray-700 hover:scale-125 hover:transition hover:duration-150 hover:ease-in-out'
	return (
		<div
			className="flex items-center p-2 my-2 bg-gray-700 border border-gray-600 rounded-md shadow-lg"
			style={{ cursor: 'pointer' }}
			id={index}
			onClick={(e) => handleClick(e, meeting)}
		>
			<span
				className={deletedIcon}
				style={{ color: 'white', marginRight: '5px', fontSize: '20px' }}
			>
				<Icon icon="ph:coffee-bold" />
			</span>
			<span className="mx-2 ">
				<Icon icon="mdi:eye-outline" />
			</span>
			<p className="truncate">{meeting.hotelName}</p>
			<DeleteIcon id={meeting._id} onDelete={onDelete} />
		</div>
	)
}
