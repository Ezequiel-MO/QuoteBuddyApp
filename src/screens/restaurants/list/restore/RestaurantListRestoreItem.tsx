import { IRestaurant } from 'src/interfaces'
import { listStyles } from 'src/constants/listStyles'
import { Spinner } from 'src/components/atoms'
import { RestaurantRestoreActions } from './RestaurantRestoreActions'
import { Icon } from '@iconify/react'
import { formatDate } from 'src/helper/formatDate'
import { formatMoney } from 'src/helper/'

interface RestaurantListRestoreItemProps {
    item: IRestaurant
    isLoading?: boolean
}

export const RestaurantListRestoreItem: React.FC<RestaurantListRestoreItemProps> = ({
    item: restaurant,
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
                {formatDate(restaurant.deletedAt)}
            </td>
            <td className={`${listStyles.td}`}>
                <RestaurantRestoreActions restaurant={restaurant} key={restaurant._id} />
            </td>
        </tr>
    )
}