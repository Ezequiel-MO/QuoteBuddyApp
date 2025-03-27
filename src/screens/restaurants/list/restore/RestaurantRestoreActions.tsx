import { FC, useState } from 'react'
import { ModalMenuActions } from 'src/components/atoms/modal/ModalMenuActions'
import { Icon } from '@iconify/react'
import { IRestaurant } from 'src/interfaces'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { errorSweetalert } from 'src/components/atoms/sweetalert/ErrorSweetalert'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { useRestaurant } from '../../context/RestaurantsContext'
import { RestaurantDetailModal } from './modal/RestaurantDetailModal'

interface RestaurantRestoreActionsProps {
    restaurant: IRestaurant
}


export const RestaurantRestoreActions: FC<RestaurantRestoreActionsProps> = ({ restaurant }) => {
    const mySwal = withReactContent(Swal)

    const { state, dispatch } = useRestaurant()

    const [openModal, setOpenModal] = useState(false)

    const confirmRestoreAlert = async (titleAlert: string) =>
        mySwal.fire({
            title: titleAlert,
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'yes',
            cancelButtonText: `Cancel`,
            customClass: { container: 'custom-container' }
        })

    const handleClickRestore = async () => {
        const loadingToast = toast.loading('please wait!')
        try {
            const confirmAlert = await confirmRestoreAlert(`Restore Restaurant: ${restaurant.name}`)
            if (confirmAlert.dismiss) return
            const updatedRestaurants = state.restaurants.filter(el => el._id !== restaurant._id)
            await baseAPI.patch(`restaurants/isDeleted/true/${restaurant._id}`)
            dispatch({ type: 'SET_RESTAURANTS', payload: updatedRestaurants })
            toast.success('Restaurant Restore Completed', toastOptions)
        } catch (error: any) {
            console.error('Error:', error)
            errorSweetalert(
                'Error restore Restaurant',
                error.response?.data?.message || 'An unexpected error occurred'
            )
        } finally {
            toast.dismiss(loadingToast)
        }
    }

    const handleClickDelete = async () => {
        const loadingToast = toast.loading('please wait!')
        try {
            const confirmAlert = await confirmRestoreAlert(`Permanently Delete Restaurant : ${restaurant.name}`)
            if (confirmAlert.dismiss) return
            const updatedRestaurants = state.restaurants.filter(el => el._id !== restaurant._id)
            await baseAPI.delete(`restaurants/isDeleted/true/${restaurant._id}`)
            dispatch({ type: 'SET_RESTAURANTS', payload: updatedRestaurants })
            toast.success('Permanently Delete Restaurant Completed', toastOptions)
        } catch (error: any) {
            console.error('Error:', error)
            errorSweetalert(
                'Error permanently Restaurant',
                error.response?.data?.message || 'An unexpected error occurred'
            )
        } finally {
            toast.dismiss(loadingToast)
        }
    }

    return (
        <ModalMenuActions item={restaurant}>
            <RestaurantDetailModal restaurant={restaurant} open={openModal} setOpen={setOpenModal} />
            <div
                className="px-4 py-2 text-sm text-white-0 border-b border-gray-700"
                role="menuitem"
            >
                {restaurant?.name}
            </div>
            <div
                className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
                role="menuitem"
                onClick={() => setOpenModal(true)}
            >
                <Icon icon="carbon:view" width={20} />
                View details
            </div>
            <div
                className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-green-700 cursor-pointer"
                role="menuitem"
                onClick={() => handleClickRestore()}
            >
                <Icon icon="hugeicons:data-recovery" width={20} />
                Recover Restaurant
            </div>
            <div
                className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-red-700 cursor-pointer"
                role="menuitem"
                onClick={() => handleClickDelete()}
            >
                <Icon icon="material-symbols:delete-history" width={22} />
                Delete Definitively
            </div>
        </ModalMenuActions>
    )
}