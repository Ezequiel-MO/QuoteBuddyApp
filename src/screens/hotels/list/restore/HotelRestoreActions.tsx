import { FC, useState } from 'react'
import { ModalMenuActions } from 'src/components/atoms/modal/ModalMenuActions'
import { Icon } from '@iconify/react'
import { IHotel } from 'src/interfaces'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { errorSweetalert } from 'src/components/atoms/sweetalert/ErrorSweetalert'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { useHotel } from '../../context/HotelsContext'

interface HotelRestoreActions {
    hotel: IHotel
}


export const HotelRestoreActions: FC<HotelRestoreActions> = ({ hotel }) => {
    const mySwal = withReactContent(Swal)

    const { state, dispatch } = useHotel()

    const confirmRestoreHotelAlert = async (titleAlert: string) =>
        mySwal.fire({
            title: titleAlert,
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'yes',
            cancelButtonText: `Cancel`,
            customClass: { container: 'custom-container' }
        })

    const handleClickRestoreHotel = async () => {
        const loadingToast = toast.loading('please wait!')
        try {
            const confirmAlert = await confirmRestoreHotelAlert(`Restore Hotel: ${hotel.name}`)
            if (confirmAlert.dismiss) return
            const updatedHotels = state.hotels.filter(el => el._id !== hotel._id)
            await baseAPI.patch(`hotels/isDeleted/true/${hotel._id}`)
            dispatch({ type: 'SET_HOTELS', payload: updatedHotels })
            toast.success('Hotel Restore Completed', toastOptions)
        } catch (error: any) {
            console.error('Error:', error)
            errorSweetalert(
                'Error Creating/Updating Payment',
                error.response?.data?.message || 'An unexpected error occurred'
            )
        } finally {
            toast.dismiss(loadingToast)
        }
    }

    const handleClickDeleteHotel = async () => {
        const loadingToast = toast.loading('please wait!')
        try {
            const confirmAlert = await confirmRestoreHotelAlert(`Permanently Delete Hotel: ${hotel.name}`)
            if (confirmAlert.dismiss) return
            const updatedHotels = state.hotels.filter(el => el._id !== hotel._id)
            await baseAPI.delete(`hotels/isDeleted/true/${hotel._id}`)
            dispatch({ type: 'SET_HOTELS', payload: updatedHotels })
            toast.success('Permanently Delete Hotel Completed', toastOptions)
        } catch (error: any) {
            console.error('Error:', error)
            errorSweetalert(
                'Error Creating/Updating Payment',
                error.response?.data?.message || 'An unexpected error occurred'
            )
        } finally {
            toast.dismiss(loadingToast)
        }
    }

    return (
        <ModalMenuActions item={hotel}>
            <div
                className="px-4 py-2 text-sm text-white-0 border-b border-gray-700"
                role="menuitem"
            >
                {hotel?.name}
            </div>
            <div
                className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
                role="menuitem"
            // onClick={() => handleOpenModalAddCollection()}
            >
                <Icon icon="carbon:view" width={20} />
                View details
            </div>
            <div
                className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-green-700 cursor-pointer"
                role="menuitem"
                onClick={() => handleClickRestoreHotel()}
            >
                <Icon icon="hugeicons:data-recovery" width={20} />
                Recovery Hotel
            </div>
            <div
                className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-red-700 cursor-pointer"
                role="menuitem"
                onClick={() => handleClickDeleteHotel()}
            >
                <Icon icon="material-symbols:delete-history" width={22} />
                Delete Definitively
            </div>
        </ModalMenuActions>
    )
}