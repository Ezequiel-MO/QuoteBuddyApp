import { useState, useEffect, FC, MouseEvent } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EventName } from './EventName'
import { EventCardTransfer } from './EventCardTransfer'
import { IconTransfer } from './IconTransfer'
import { EyeIconDetail } from './EyeIconDetail'
import { AddOrEditVenue } from './AddOrEditVenue'
import { AddShowEntertainment } from './AddShowEntertainment'
import { RestaurantEntertainment } from './RestaurantEntertainment'
import { IEvent, IRestaurant } from '../../../../../../interfaces'
import styles from '../../../DayEvents.module.css'
import { DeleteIcon } from '@components/atoms'

interface EventCardProps {
	event: IRestaurant | IEvent
	onDelete: () => void
	handleClick: (
		e: MouseEvent<HTMLElement>,
		event: IEvent | IRestaurant,
		index: number
	) => void
	index: number
	typeEvent: string
	dayIndex: number
}

export const EventCard: FC<EventCardProps> = ({
	event,
	onDelete,
	handleClick,
	index,
	typeEvent,
	dayIndex
}) => {
	const [openInfoTransfer, setOpenInfoTransfer] = useState(false)
	const [change, setChange] = useState(false)
	const [show, setShow] = useState(false)
	const [openModalVenue, setOpenModalVenue] = useState(false)

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id: event._id || 1 })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		cursor: 'default'
	}

	const [enterTimeout, setEnterTimeout] = useState<number | any>(null)
	const [leaveTimeout, setLeaveTimeout] = useState<number | any>(null)

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
		}, 900)
		setEnterTimeout(timeoutId)
	}

	const handleMouseLeave = () => {
		if (openModalVenue) return
		if (enterTimeout) {
			clearTimeout(enterTimeout)
			setEnterTimeout(null)
		}
		const timeoutId = setTimeout(() => {
			setChange(false)
		}, 2000) // 2000ms de retraso antes de ocultar
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
		<div
			className={
				!openInfoTransfer || (event.transfer && event.transfer.length === 0)
					? styles.containerEvent
					: styles.containerEventOpen
			}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{ marginTop: '20px' }}
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
			{change && (
				<div
					className={`transition-all duration-1000 ease-in ${
						show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
					}`}
					style={{ marginLeft: '35%' }}
				>
					{!isDragging && (
						<IconTransfer
							event={event}
							typeEvent={typeEvent}
							dayIndex={dayIndex}
						/>
					)}
					<div>
						<EyeIconDetail
							handleClick={(e) => handleClick(e, event, index)}
							eye={false}
							isDragging={isDragging}
						/>
					</div>
					<AddOrEditVenue
						isDragging={isDragging}
						typeEvent={typeEvent}
						restaurant={event as IRestaurant}
						open={openModalVenue}
						setOpen={setOpenModalVenue}
						dayIndex={dayIndex}
						setChange={setChange}
					/>
					<RestaurantEntertainment
						typeMeal={typeEvent}
						restaurant={event as IRestaurant}
						dayIndex={dayIndex}
						setChange={setChange}
					/>
					<AddShowEntertainment
						typeMeal={typeEvent}
						dayIndex={dayIndex}
						idRestaurant={event._id}
					/>
				</div>
			)}
			<EventCardTransfer
				key={event._id}
				event={event}
				open={openInfoTransfer}
				setOpen={setOpenInfoTransfer}
				typeEvent={typeEvent}
				dayIndex={dayIndex}
				setChange={setChange}
				openModalVenue={openModalVenue}
			/>
		</div>
	)
}
