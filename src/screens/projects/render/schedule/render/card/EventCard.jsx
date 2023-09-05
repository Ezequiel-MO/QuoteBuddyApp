import { useState, useEffect } from "react"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DeleteIcon } from './DeleteIcon'
import { EventName } from './EventName'
import { EventCardTransfer } from "./EventCardTransfer"
import { IconTransfer } from "./IconTransfer"
import { EyeIconDetail } from "./EyeIconDetail"
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

	// useEffect(() => {
	// 	if(!isDragging){
	// 		setOpenInfoTransfer(false)
	// 	}
	// }, [isDragging])

	//UNA PRUEBA
	// useEffect(() => {
	// 	if(isDragging){
	// 		setChange(false)
	// 	}
	// }, [isDragging])


	useEffect(() => {
		if (change) {
			setTimeout(() => {
				setShow(true)
			}, 180)
		} else {
			setShow(false)
		}
	}, [change])

	return (
		<div className={!openInfoTransfer || event.transfer.length === 0 ? styles.containerEvent : styles.containerEventOpen}
			onMouseOver={(e) => {
				setChange(true)
			}}
			onMouseOut={(e) => {
				setChange(false)
			}}
			style={{ marginTop: "20px" }}
		>
			<div
				className={!isDragging ? styles.carEvent : styles.cardHotelActivate}
				style={style}
				ref={setNodeRef}
				{...attributes}
				//UNA PRUEBA
				// onClick={(e)=>{
				// 	if(!change){
				// 		setChange(true)
				// 	}else{
				// 		setChange(false)
				// 	}
				// }}
			>
				<EyeIconDetail handleClick={(e) => handleClick(e, event, index)} />
				<EventName
					event={event}
					index={index}
					handleClick={handleClick}
					listeners={listeners}
					isDragging={isDragging}
					setOpenInfoTransfer={setOpenInfoTransfer}
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
						<IconTransfer event={event} open={openInfoTransfer} setOpen={setOpenInfoTransfer} />
					}
					<div>
						{
							!openInfoTransfer &&
							<EyeIconDetail handleClick={(e) => handleClick(e, event, index)} eye={false} isDragging={isDragging} />
						}
					</div>
				</div>
			}
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