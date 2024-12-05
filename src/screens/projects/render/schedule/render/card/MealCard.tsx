import { useState, useEffect, FC, MouseEvent } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EventName } from './EventName'
import { EventCardTransfer } from './EventCardTransfer'
import { IconTransfer } from './IconTransfer'
import { AddOrEditVenue } from './AddOrEditVenue'
import { AddShowEntertainment } from './AddShowEntertainment'
import { RestaurantEntertainment } from './RestaurantEntertainment'
import { IRestaurant } from '../../../../../../interfaces'
import { DeleteIcon } from '@components/atoms'
import { EyeIconDetail } from './EyeIconDetail'

interface MealCardProps {
	event: IRestaurant
	onDelete: () => void
	handleClick: (
		e: MouseEvent<HTMLElement>,
		event: IRestaurant,
		index: number
	) => void
	index: number
	typeEvent: "lunch" | "dinner"
	dayIndex: number
}

export const MealCard: FC<MealCardProps> = ({
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
		transition
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

	const handleMouseLeave = (e:any) => {
		if (openModalVenue || e.target.localName === 'select') return
		if (enterTimeout) {
			clearTimeout(enterTimeout)
			setEnterTimeout(null)
		}
		const timeoutId = setTimeout(() => {
			setChange(false)
		}, 2000) // 2000ms delay before hiding
		setLeaveTimeout(timeoutId)
	}

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
			className={`p-2 my-2 bg-gray-700 border border-gray-600 rounded-md shadow-lg transition-all ${
				isDragging ? 'cursor-grabbing' : 'cursor-grab'
			}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={(e)=>handleMouseLeave(e)}
			ref={setNodeRef}
			style={style}
			{...attributes}
		>
			<div className="flex items-center justify-center">
				<EyeIconDetail
					handleClick={(e: MouseEvent<HTMLElement, globalThis.MouseEvent>) =>
						handleClick(e, event, index)
					}
					isDragging={isDragging}
				/>
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
					} mt-2`}
				>
					{!isDragging && (
						<IconTransfer
							event={event}
							typeEvent={typeEvent}
							dayIndex={dayIndex}
						/>
					)}
					<br />
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
