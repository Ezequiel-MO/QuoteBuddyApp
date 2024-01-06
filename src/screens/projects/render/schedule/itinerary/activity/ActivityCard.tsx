import { FC } from "react"
import { Icon } from '@iconify/react'
import { DeleteIcon } from '@components/atoms'
import { IEvent } from "src/interfaces"

interface ActivityCardProps {
    activity: IEvent
    onDelete: () => void
}

export const ActivityCard: FC<ActivityCardProps> = ({ activity, onDelete }) => {
    const classIcon = "hover:text-amber-600 hover:scale-125 hover:transition hover:duration-150 hover:ease-in-out"

    return (
        <div className={`flex items-start p-2 my-2 bg-gray-700 border border-gray-600 rounded-md shadow-lg `}>
            <span
                style={{ color: 'white', marginRight: '5px', fontSize: '20px' }}
                className={classIcon}
            >
                <Icon icon="mdi:event-alert" />
            </span>
            <p className="truncate">{activity.name}</p>
            <DeleteIcon id={activity._id} onDelete={onDelete} />
        </div>
    )
}