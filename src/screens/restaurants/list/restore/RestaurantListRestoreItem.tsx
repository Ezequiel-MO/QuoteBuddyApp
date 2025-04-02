import { FC, useState } from 'react'
import { IRestaurant } from 'src/interfaces'
import { listStyles } from 'src/constants/listStyles'
import { Icon } from '@iconify/react'
import { formatDate } from 'src/helper/formatDate'
import { formatMoney } from 'src/helper/'
import { useRestaurant } from '../../context/RestaurantsContext'
import { RestaurantDetailModal } from './modal/RestaurantDetailModal'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import baseAPI from 'src/axios/axiosConfig'

interface RestaurantListRestoreItemProps {
    item: IRestaurant
}

export const RestaurantListRestoreItem: FC<RestaurantListRestoreItemProps> = ({ item: restaurant, }) => {

    const { state, dispatch } = useRestaurant()

    const [openModal, setOpenModal] = useState(false)

    const handleViewDetails = () => {
        setOpenModal(true)
    }

    const handleRestore = async (restaurantId: string) => {
        const updatedRestaurants = state.restaurants.filter(el => el._id !== restaurantId)
        await baseAPI.patch(`restaurants/isDeleted/true/${restaurant._id}`)
        dispatch({ type: 'SET_RESTAURANTS', payload: updatedRestaurants })
    }

    const handleDelete = async (restaurantId: string) => {
        const updatedRestaurants = state.restaurants.filter(el => el._id !== restaurantId)
        await baseAPI.delete(`restaurants/isDeleted/true/${restaurant._id}`)
        dispatch({ type: 'SET_RESTAURANTS', payload: updatedRestaurants })
    }

    return (
        <tr className={`${listStyles.tr}`}>
            <td
                className={`${listStyles.td} hover:text-blue-600 hover:underline flex items-center`}
            >
                <Icon icon="fluent:delete-arrow-back-16-regular" width={20} className='mr-1' />
                {restaurant.name}
            </td>
            <td className={listStyles.td}>
                {`${restaurant?.city}`}
            </td>
            <td className={`max-w-40 truncate ${listStyles.td}`}>
                {restaurant?.maxCapacity}
            </td>
            <td className={listStyles.td}>
                {formatMoney(restaurant?.price ? restaurant?.price : 0)}
            </td>
            <td className={listStyles.td}>
                {restaurant?.isVenue ? 'TRUE' : 'FALSE'}
            </td>
            <td className={`${listStyles.td} text-red-500`}>
                {restaurant?.deletedAt ? formatDate(restaurant.deletedAt) : ''}
            </td>
            <td className={`${listStyles.td}`}>
                <RestaurantDetailModal restaurant={restaurant} open={openModal} setOpen={setOpenModal} />
                <MenuRestoreActions
                    item={restaurant}
                    itemType='Restaurant'
                    onViewDetails={handleViewDetails}
                    onRestore={(restaurantId) => handleRestore(restaurantId)}
                    onDelete={(restaurantId) => handleDelete(restaurantId)}
                    key={restaurant._id}
                />
            </td>
        </tr>
    )
}