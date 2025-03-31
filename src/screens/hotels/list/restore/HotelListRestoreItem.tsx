import { FC, useState } from 'react'
import { IHotel } from 'src/interfaces'
import { listStyles } from 'src/constants/listStyles'
import { Icon } from '@iconify/react'
import { formatDate } from 'src/helper/formatDate'
import { useHotel } from '../../context/HotelsContext'
import { HotelDetailModal } from './modal/HotelDetailModal'
import baseAPI from 'src/axios/axiosConfig'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'



interface HotelListRestoreItemProps {
    item: IHotel
}

export const HotelListRestoreItem: FC<HotelListRestoreItemProps> = ({ item: hotel }) => {

    const { state, dispatch } = useHotel()

    const [openModal, setOpenModal] = useState(false)

    const handleViewDetails = () => {
        setOpenModal(true)
    }

    const handleRestore = async (hotelId: string) => {
        const updatedHotels = state.hotels.filter(el => el._id !== hotelId)
        await baseAPI.patch(`hotels/isDeleted/true/${hotel._id}`)
        dispatch({ type: 'SET_HOTELS', payload: updatedHotels })
    }

    const handleDelete = async (hotelId: string) => {
        const updatedHotels = state.hotels.filter(el => el._id !== hotelId)
        await baseAPI.delete(`hotels/isDeleted/true/${hotel._id}`)
        dispatch({ type: 'SET_HOTELS', payload: updatedHotels })
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
                {hotel?.deletedAt ? formatDate(hotel?.deletedAt) : ''}
            </td>
            <td className={`${listStyles.td}`}>
                <HotelDetailModal hotel={hotel} open={openModal} setOpen={setOpenModal} />
                <MenuRestoreActions
                    item={hotel}
                    itemType='Hotel'
                    onViewDetails={handleViewDetails}
                    onRestore={(hotelId) => handleRestore(hotelId)}
                    onDelete={(hotelId) => handleDelete(hotelId)}
                    key={hotel._id}
                />
            </td>
        </tr>
    )
}