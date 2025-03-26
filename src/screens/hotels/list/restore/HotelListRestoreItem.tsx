import { useNavigate, useLocation } from 'react-router-dom'
import { IHotel } from 'src/interfaces'
import { listStyles } from 'src/constants/listStyles'
import { Spinner } from 'src/components/atoms'
import { HotelRestoreActions } from './HotelRestoreActions'
import { Icon } from '@iconify/react'
import { formatDate } from 'src/helper/formatDate'

interface HotelListRestoreItemProps {
    item: IHotel
    isLoading?: boolean
}

export const HotelListRestoreItem: React.FC<HotelListRestoreItemProps> = ({
    item: hotel,
    isLoading
}) => {
    const navigate = useNavigate()
    const location = useLocation()

    if (isLoading) {
        return (
            <div className='mt-20'>
                <Spinner />
            </div>
        )
    }

    return (
        <tr className={listStyles.tr}>
            <td
                className={`${listStyles.td} hover:text-blue-600 hover:underline flex items-center`}
            >
                <Icon icon="fluent:delete-arrow-back-16-regular" width={20} className='mr-1' />
                {hotel.name}
            </td>
            <td className={listStyles.td}>
                {`${hotel.numberStars} stars`}
            </td>
            <td className={`max-w-40 truncate ${listStyles.td}`}>
                {hotel.address}
            </td>
            <td className={listStyles.td}>
                {`${hotel.numberRooms} rooms`}
            </td>
            <td className={listStyles.td}>
                {`${hotel.meetingRooms ?? ''} meeting rooms`}
            </td>
            <td className={listStyles.td}>
                {`${hotel.city ?? ''}`}
            </td>
            <td className={`${listStyles.td} text-red-500`}>
                {formatDate(hotel.deletedAt)}
            </td>
            <td className={`${listStyles.td}`}>
                <HotelRestoreActions hotel={hotel} key={hotel._id} />
            </td>
        </tr>
    )
}