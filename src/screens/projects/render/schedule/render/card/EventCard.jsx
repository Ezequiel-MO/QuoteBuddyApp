import { useState, useEffect } from "react"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
// import { Icon } from '@iconify/react'
import { DeleteIcon } from './DeleteIcon'
import { EventName } from './EventName'
import { EventCardTransfer } from "./EventCardTransfer"
import { IconTransfer } from "./IconTransfer"
import styles from '../../../DayEvents.module.css'

export const EventCard = ({ event, onDelete, handleClick, index, typeEvent, dayIndex }) => {
	const [openInfoTransfer, setOpenInfoTransfer] = useState(false)

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id: event._id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

	// useEffect(() => {
	// 	if(!isDragging){
	// 		setOpenInfoTransfer(false)
	// 	}
	// }, [isDragging])

	return (
		<div className={!openInfoTransfer || event.transfer.length === 0 ? styles.containerEvent : styles.containerEventOpen} >
			<div
				className={!isDragging ? styles.carEvent : styles.cardHotelActivate}
				style={style}
				ref={setNodeRef}
				{...attributes}
				onClick={(e) => handleClick(e, event, index)}
			>
				<EventName
					event={event}
					index={index}
					handleClick={handleClick}
					listeners={listeners}
					isDragging={isDragging}
					setOpenInfoTransfer={setOpenInfoTransfer}
				/>
				<IconTransfer event={event} open={openInfoTransfer} setOpen={setOpenInfoTransfer} />
				<DeleteIcon onDelete={onDelete} id={event._id} />
			</div>
			<EventCardTransfer
				key={event._id}
				event={event}
				open={openInfoTransfer}
				setOpen={setOpenInfoTransfer}
				typeEvent={typeEvent}
				dayIndex={dayIndex}
			/>
		</div>
	)
}