import { useState } from "react"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from '../DayEvents.module.css'
import { DeleteIcon } from './DeleteIcon'
import { HotelName } from './HotelName'
import { ButtonModalMetting } from "./addMeetingModal/ButtonModalMetting"
import { MettingModal } from "./addMeetingModal/MeetingModal"

export const HotelCard = ({ hotel, onDelete, handleClick, index }) => {
	const [open, setOpen] = useState(false)
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id: hotel.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

	const handleOpenModalMetting = () => {
		setOpen(true)
	}

	return (
		<>
			<MettingModal open={open} setOpen={setOpen} hotel={hotel} />
			<div
				className={styles.cardHotel}
				style={style}
				ref={setNodeRef}
				{...attributes}
				onClick={(e) => handleClick(e, hotel, index)}
			>
				<HotelName
					hotel={hotel}
					index={index}
					handleClick={handleClick}
					listeners={listeners}
					isDragging={isDragging}
				/>
				<DeleteIcon onDelete={onDelete} id={hotel.id} />
				{
					!isDragging &&
					<ButtonModalMetting handleOpenModalMetting={handleOpenModalMetting} isDragging={isDragging} />
				}
			</div>
		</>
	)
}
