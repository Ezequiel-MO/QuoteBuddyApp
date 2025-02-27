import { useState, useEffect, FC, MouseEvent } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { EventName } from './EventName'
import { EventCardTransfer } from './EventCardTransfer'
import { IconTransfer } from './IconTransfer'
import { IEvent} from '../../../../../../interfaces'
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
		if (leaveTimeout) {
			clearTimeout(leaveTimeout)
			setLeaveTimeout(null)
		}
		const timeoutId = setTimeout(() => {
			setChange(true)
			setOpenInfoTransfer(true)
		}, 700)
		setEnterTimeout(timeoutId)
	}

	const handleMouseLeave = (e: any) => {
		if (enterTimeout) {
			clearTimeout(enterTimeout)
			setEnterTimeout(null)
		}
		const timeoutId = setTimeout(() => {
			setChange(false)
		}, 1000)
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
			className={`relative z-0 hover:z-10 p-2 my-2 bg-gray-700 border border-gray-600 rounded-md shadow-md transition-all 
        ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'} hover:bg-gray-600`}
			ref={setNodeRef}
			style={style}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...attributes}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<EyeIconDetail
						handleClick={(e) => {
							toggleModal()
							handleClick(e, event, index)
						}}
						isDragging={isDragging}
					/>
					<EventName
						event={event}
						index={index}
						handleClick={handleClick}
						listeners={listeners}
						isDragging={isDragging}
					/>
				</div>
				<DeleteIcon onDelete={onDelete} id={event._id} />
			</div>

			{change && (
				<div
					className={`transition-all duration-700 ease-in-out 
            ${show ? 'opacity-100 scale-100 mt-2' : 'opacity-0 scale-95'} 
          `}
				>
					{!isDragging && (
						<IconTransfer
							event={event}
							typeEvent={typeEvent}
							dayIndex={dayIndex}
						/>
					)}
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
			/>
		</div>
	)
}
