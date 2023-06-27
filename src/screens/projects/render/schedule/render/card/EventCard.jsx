import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { DeleteIcon } from './DeleteIcon'
import { EventName } from './EventName'
import styles from '../../../DayEvents.module.css'

export const EventCard = ({ event, onDelete, handleClick, index }) => {
	
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

	return (
		<div
			className={!isDragging ? styles.cardHotel : styles.cardHotelActivate}
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
			/>
			<DeleteIcon onDelete={onDelete} id={event._id} />
		</div>
	)
}