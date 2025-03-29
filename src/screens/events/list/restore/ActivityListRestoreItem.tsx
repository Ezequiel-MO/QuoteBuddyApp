import { FC, useState } from 'react'
import { IEvent } from 'src/interfaces'
import { listStyles } from 'src/constants/listStyles'
import { Icon } from '@iconify/react'
import { formatDate } from 'src/helper/formatDate'
import { formatMoney } from 'src/helper/'
import { useActivity } from '../../context/ActivitiesContext'
import { ActivityDetailModal } from './modal/ActivityDetailModal'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import baseAPI from 'src/axios/axiosConfig'

interface ActivityListRestoreItemProps {
    item: IEvent
}

export const ActivityListRestoreItem: FC<ActivityListRestoreItemProps> = ({ item: event }) => {

    const { state, dispatch } = useActivity()

    const [openModal, setOpenModal] = useState(false)

    const handleViewDetails = () => {
        setOpenModal(true)
    }

    const handleRestore = async (activityId: string) => {
        const updatedActivities = state.activities.filter(el => el._id !== activityId)
        await baseAPI.patch(`events/isDeleted/true/${event._id}`)
        dispatch({ type: 'SET_ACTIVITIES', payload: updatedActivities })
    }

    const handleDelete = async (activityId: string) => {
        const updatedActivities = state.activities.filter(el => el._id !== activityId)
        await baseAPI.patch(`events/isDeleted/true/${event._id}`)
        dispatch({ type: 'SET_ACTIVITIES', payload: updatedActivities })
    }

    return (
        <tr className={`${listStyles.tr} mb-80`}>
            <td
                className={`${listStyles.td} hover:text-blue-600 hover:underline flex items-center`}
            >
                <Icon icon="fluent:delete-arrow-back-16-regular" width={20} className='mr-1' />
                {event.name}
            </td>
            <td className={listStyles.td}>
                {`${event?.city}`}
            </td>
            <td className={listStyles.td}>
                {formatMoney(event?.price ? event?.price : 0)}
            </td>
            <td className={listStyles.td}>
                {event?.pricePerPerson ? 'TRUE' : 'FALSE'}
            </td>
            <td className={listStyles.td}>
                {event?.pricePerPerson ? 'TRUE' : 'FALSE'}
            </td>
            <td className={`${listStyles.td} text-red-500`}>
                {formatDate(event.deletedAt)}
            </td>
            <td className={`${listStyles.td}`}>
                <ActivityDetailModal event={event} open={openModal} setOpen={setOpenModal} />
                <MenuRestoreActions
                    item={event}
                    itemType='Activity'
                    onViewDetails={handleViewDetails}
                    onRestore={(activityId) => handleRestore(activityId)}
                    onDelete={(activityId) => handleDelete(activityId)}
                    key={event._id}
                />
            </td>
        </tr>
    )
}