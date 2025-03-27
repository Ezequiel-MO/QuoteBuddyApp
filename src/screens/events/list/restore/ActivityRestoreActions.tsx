import { FC, useState } from 'react'
import { ModalMenuActions } from 'src/components/atoms/modal/ModalMenuActions'
import { Icon } from '@iconify/react'
import { IEvent } from 'src/interfaces'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { errorSweetalert } from 'src/components/atoms/sweetalert/ErrorSweetalert'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { useActivity } from '../../context/ActivitiesContext'
import { ActivityDetailModal } from './modal/ActivityDetailModal'

interface ActivityRestoreActionsProps {
    event: IEvent
}


export const ActivityRestoreActions: FC<ActivityRestoreActionsProps> = ({ event }) => {
    const mySwal = withReactContent(Swal)

    const { state, dispatch } = useActivity()

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
            const confirmAlert = await confirmRestoreAlert(`Restore Activity: ${event.name}`)
            if (confirmAlert.dismiss) return
            const updatedActivities = state.activities.filter(el => el._id !== event._id)
            await baseAPI.patch(`events/isDeleted/true/${event._id}`)
            dispatch({ type: 'SET_ACTIVITIES', payload: updatedActivities })
            toast.success('Activity Restore Completed', toastOptions)
        } catch (error: any) {
            console.error('Error:', error)
            errorSweetalert(
                'Error restore Activity',
                error.response?.data?.message || 'An unexpected error occurred'
            )
        } finally {
            toast.dismiss(loadingToast)
        }
    }

    const handleClickDelete = async () => {
        const loadingToast = toast.loading('please wait!')
        try {
            const confirmAlert = await confirmRestoreAlert(`Permanently Delete Activity : ${event.name}`)
            if (confirmAlert.dismiss) return
            const updatedActivities = state.activities.filter(el => el._id !== event._id)
            await baseAPI.delete(`events/isDeleted/true/${event._id}`)
            dispatch({ type: 'SET_ACTIVITIES', payload: updatedActivities })
            toast.success('Permanently Delete Activity Completed', toastOptions)
        } catch (error: any) {
            console.error('Error:', error)
            errorSweetalert(
                'Error permanently Activity',
                error.response?.data?.message || 'An unexpected error occurred'
            )
        } finally {
            toast.dismiss(loadingToast)
        }
    }

    return (
        <ModalMenuActions item={event}>
            <ActivityDetailModal event={event} open={openModal} setOpen={setOpenModal} />
            <div
                className="px-4 py-2 text-sm text-white-0 border-b border-gray-700"
                role="menuitem"
            >
                {event?.name}
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
                Recover Activity
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