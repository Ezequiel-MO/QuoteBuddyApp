import { useState, useEffect, FC, MouseEvent } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EventName } from './EventName'
import { EventCardTransfer } from './EventCardTransfer'
import { IconTransfer } from './IconTransfer'
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
	typeEvent: 'lunch' | 'dinner'
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

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: event._id || `meal-${index}`
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

	const [enterTimeout, setEnterTimeout] = useState<NodeJS.Timeout | null>(null)
	const [leaveTimeout, setLeaveTimeout] = useState<NodeJS.Timeout | null>(null)

	const handleMouseEnter = () => {
		if (leaveTimeout) {
			clearTimeout(leaveTimeout)
		}
		const timeoutId = setTimeout(() => {
			setChange(true)
			setOpenInfoTransfer(true)
		}, 400)
		setEnterTimeout(timeoutId)
	}

	const handleMouseLeave = () => {
		if (enterTimeout) {
			clearTimeout(enterTimeout)
		}
		const timeoutId = setTimeout(() => {
			setChange(false)
		}, 400)
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

	useEffect(() => {
		return () => {
			if (enterTimeout) clearTimeout(enterTimeout)
			if (leaveTimeout) clearTimeout(leaveTimeout)
		}
	}, [enterTimeout, leaveTimeout])

	return (
		<div
			className={`relative rounded-lg overflow-hidden shadow-lg ${
				isDragging
					? 'bg-orange-800/60 border-2 border-orange-500 cursor-grabbing'
					: 'bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 hover:from-gray-650 hover:to-gray-750 cursor-grab'
			} transition-all duration-300 ease-in-out`}
			ref={setNodeRef}
			style={style}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...attributes}
		>
			<div className="flex items-center p-3 group">
				{/* Detail Icon */}
				<div className="flex-shrink-0 mr-2 w-6 flex justify-center">
					<EyeIconDetail
						handleClick={(e) => handleClick(e, event, index)}
						isDragging={isDragging}
					/>
				</div>

				{/* Restaurant Name */}
				<div className="flex-grow">
					<EventName
						event={event}
						index={index}
						handleClick={handleClick}
						listeners={listeners}
						isDragging={isDragging}
					/>
				</div>

				{/* Venue Indicator if applicable */}
				{event.isVenue && (
					<div className="flex-shrink-0 mx-1">
						<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-900 text-orange-200">
							Venue
						</span>
					</div>
				)}

				{/* Delete Icon */}
				<div className="flex-shrink-0 ml-1 w-6 flex justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-200">
					<DeleteIcon onDelete={onDelete} id={event._id} />
				</div>
			</div>

			{/* Event Transfer Info */}
			{change && (
				<div
					className={`transition-all duration-500 ease-in-out px-3 pb-3 ${
						show ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
					}`}
				>
					{!isDragging && (
						<IconTransfer
							event={event}
							typeEvent={typeEvent}
							dayIndex={dayIndex}
						/>
					)}

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
			)}
		</div>
	)
}
