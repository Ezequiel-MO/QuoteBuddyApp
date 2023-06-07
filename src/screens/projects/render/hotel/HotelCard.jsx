import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from '../DayEvents.module.css'
import { DeleteIcon } from './DeleteIcon'
import { HotelName } from './HotelName'

export const HotelCard = ({ hotel, onDelete, handleClick, index }) => {
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

	return (
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
		</div>
	)
}
