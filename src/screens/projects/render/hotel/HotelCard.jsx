import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from '@iconify/react'
import styles from '../DayEvents.module.css'

export const HotelCard = ({ hotel, onDelete, handleClick, index }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: hotel.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            className={styles.cardHotel}
            style={style} // style del "dnd-kit" drag and drop
            ref={setNodeRef}
            {...attributes}
            // {...listeners}
            onClick={(e) => handleClick(e, hotel, index)} // activa el modal hotel
        >
            <p
                {...listeners}
                className="truncate"
                style={{ cursor: !isDragging ? "grab" : "grabbing" }}
                onDoubleClick={(e) => handleClick(e, hotel, index)} // activa el modal hotel
            >
                {hotel.name}
            </p>
            <span
                className={styles.deletedIcon}
                onClick={(e) => {
                    e.stopPropagation()
                    onDelete(hotel._id)
                }}
            >
                <Icon icon="lucide:delete" color="#ea5933" />
            </span>
        </div>
    )
}


