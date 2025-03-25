import { useNavigate, useLocation } from 'react-router-dom'
import { IHotel } from 'src/interfaces'
import { listStyles } from 'src/constants/listStyles'
import { HotelRecoveryActions } from './HotelRecoveryActions'
import { TableHeaders } from 'src/ui'
import { Spinner } from 'src/components/atoms'


interface HotelListRecoveryItemProps {
    hotels: IHotel[]
    isLoading: boolean
}

export const HotelListRecoveryItem: React.FC<HotelListRecoveryItemProps> = ({
    hotels,
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
        <table className={listStyles.table}>
            <TableHeaders headers="hotel" />
            {
                !isLoading && hotels?.map((hotel) => {
                    return (
                        <tr className={listStyles.tr} key={hotel?._id}>
                            <td
                                className={`${listStyles.td} hover:text-blue-600 hover:underline`}
                            >
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
                            <td className={`${listStyles.td}`}>
                                <HotelRecoveryActions hotel={hotel} key={hotel._id} />
                            </td>
                        </tr>
                    )
                })
            }
        </table>
    )
}
