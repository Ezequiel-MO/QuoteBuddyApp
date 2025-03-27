import { IEvent } from 'src/interfaces'
import { listStyles } from 'src/constants/listStyles'
import { Spinner } from 'src/components/atoms'
import { ActivityRestoreActions } from './ActivityRestoreActions'
import { Icon } from '@iconify/react'
import { formatDate } from 'src/helper/formatDate'
import { formatMoney } from 'src/helper/'

interface ActivityListRestoreItemProps {
    item: IEvent
    isLoading?: boolean
}

export const ActivityListRestoreItem: React.FC<ActivityListRestoreItemProps> = ({
    item: event,
    isLoading
}) => {

    if (isLoading) {
        return (
            <div className='mt-20'>
                <Spinner />
            </div>
        )
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
                <ActivityRestoreActions event={event} key={event._id} />
            </td>
        </tr>
    )
}