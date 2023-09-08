import { useState, useEffect } from "react"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DeleteIcon } from './DeleteIcon'
import { EventName } from './EventName'
import { EventCardTransfer } from "./EventCardTransfer"
import { IconTransfer } from "./IconTransfer"
import { EyeIconDetail } from "./EyeIconDetail"
import { AddOrEditVenue } from "./AddOrEditVenue"
import styles from '../../../DayEvents.module.css'

export const EventCard = ({ event, onDelete, handleClick, index, typeEvent, dayIndex }) => {
	const [openInfoTransfer, setOpenInfoTransfer] = useState(false)
	const [change, setChange] = useState(false)
	const [show, setShow] = useState(false)

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
		transition,
		cursor: "default"
	}

	//MANEJO CUANTO TARDA Y CIERRA EL DIV
	const [enterTimeout, setEnterTimeout] = useState(null)
	const [leaveTimeout, setLeaveTimeout] = useState(null)

	useEffect(() => {
		return () => {
			if (enterTimeout) clearTimeout(enterTimeout)
			if (leaveTimeout) clearTimeout(leaveTimeout)
		}
	}, [enterTimeout, leaveTimeout, isDragging])

	const handleMouseEnter = () => {
		if (leaveTimeout) {
			clearTimeout(leaveTimeout)
			setLeaveTimeout(null)
		}
		const timeoutId = setTimeout(() => {
			setChange(true)
			setOpenInfoTransfer(true)
		}, 900);  // 900ms de retraso antes de mostrar
		setEnterTimeout(timeoutId)
	}

	const handleMouseLeave = () => {
		if (enterTimeout) {
			clearTimeout(enterTimeout)
			setEnterTimeout(null)
		}
		const timeoutId = setTimeout(() => {
			setChange(false);
		}, 2000)  // 2500ms de retraso antes de ocultar
		setLeaveTimeout(timeoutId)
	}
	//

	useEffect(() => {
		if (change) {
			setTimeout(() => {
				setShow(true)
			}, 180)
		} else {
			setShow(false)
			setOpenInfoTransfer(false)
		}
	}, [change])

	return (
		<div className={!openInfoTransfer || event.transfer.length === 0 ? styles.containerEvent : styles.containerEventOpen}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{ marginTop: "20px" }}
		>
			<div
				className={!isDragging ? styles.carEvent : styles.cardHotelActivate}
				style={style}
				ref={setNodeRef}
				{...attributes}
			>
				<EyeIconDetail handleClick={(e) => handleClick(e, event, index)} />
				<EventName
					event={event}
					index={index}
					handleClick={handleClick}
					listeners={listeners}
					isDragging={isDragging}
				/>
				<DeleteIcon onDelete={onDelete} id={event._id} />
			</div>
			{
				//muestro lo que hay cuando estoy sobre el div
				change &&
				<div
					className={`transition-all duration-1000 ease-in ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
					style={{ marginLeft: "35%" }}
				>
					{
						!isDragging &&
						<IconTransfer event={event} typeEvent={typeEvent} dayIndex={dayIndex} />
					}
					<div>
						<EyeIconDetail handleClick={(e) => handleClick(e, event, index)} eye={false} isDragging={isDragging} />
					</div>
					<AddOrEditVenue isDragging={isDragging} typeEvent={typeEvent} event={event}/>
				</div>
			}
			<EventCardTransfer
				key={event._id}
				event={event}
				open={openInfoTransfer}
				setOpen={setOpenInfoTransfer}
				typeEvent={typeEvent}
				dayIndex={dayIndex}
				setChange={setChange}
			/>
		</div>
	)
}