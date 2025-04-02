import { useState, useEffect, FC, MouseEvent } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EventName } from './EventName'
import { EventCardTransfer } from './EventCardTransfer'
import { IconTransfer } from './IconTransfer'
import { IEvent } from '../../../../../../interfaces'
import { DeleteIcon } from '@components/atoms'
import { EyeIconDetail } from './EyeIconDetail'
import { useCurrentProject } from 'src/hooks'

interface EventCardProps {
	event: IEvent
	onDelete: () => void
	handleClick: (
		e: MouseEvent<HTMLElement>,
		event: IEvent,
		index: number
	) => void
	index: number
	typeEvent: 'morningEvents' | 'afternoonEvents'
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
	const { toggleModal } = useCurrentProject()
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
		id: event._id || `event-${index}`
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

	const [enterTimeout, setEnterTimeout] = useState<any>(null)
	const [leaveTimeout, setLeaveTimeout] = useState<any>(null)

	const handleMouseEnter = () => {
		if (leaveTimeout.current !== null) {
			clearTimeout(leaveTimeout.current)
		}
		const timeoutId = setTimeout(() => {
			setChange(true)
			setOpenInfoTransfer(true)
		}, 400)
		setEnterTimeout(timeoutId)
	}

	const handleMouseLeave = (e: any) => {
		if (enterTimeout.current !== null) {
			clearTimeout(enterTimeout.current)
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
					? 'bg-cyan-800/60 border-2 border-cyan-500 cursor-grabbing'
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
				<div className="flex-shrink-0 mr-2">
					<EyeIconDetail
						handleClick={(e) => {
							toggleModal()
							handleClick(e, event, index)
						}}
						isDragging={isDragging}
					/>
				</div>

				{/* Event Name */}
				<div className="flex-grow">
					<EventName
						event={event}
						index={index}
						handleClick={handleClick}
						listeners={listeners}
						isDragging={isDragging}
					/>
				</div>

				{/* Delete Icon */}
				<div className="flex-shrink-0 ml-2 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
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
