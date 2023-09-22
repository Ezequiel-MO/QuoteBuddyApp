import { Icon } from '@iconify/react'

import styles from '../../../DayEvents.module.css'
import { DeleteIcon } from '@components/atoms'

export const MeetingCard = ({
	meeting,
	onDelete,
	dayIndex,
	index,
	handleClick
}) => {
	const deletedIcon =
		' hover:text-gray-700 hover:scale-125 hover:transition hover:duration-150 hover:ease-in-out'
	return (
		<div
			className={styles.cardHotel}
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
			<p className="truncate">{meeting.hotelName}</p>
			<DeleteIcon id={meeting._id} onDelete={onDelete} />
		</div>
	)
}
