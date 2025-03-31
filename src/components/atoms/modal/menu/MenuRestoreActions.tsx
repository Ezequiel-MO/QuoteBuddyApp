import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ModalMenuActions } from 'src/components/atoms/modal/ModalMenuActions';
import { toast } from 'react-toastify';
import { toastOptions } from 'src/helper/toast';


interface MenuRestoreActionsProps<T> {
    item: T;
    itemType: string;
    itemName?:string;
    onRestore: (id: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
    onViewDetails: () => void;
    children?: React.ReactNode
}

export const MenuRestoreActions = <T extends { _id: string; name?: string  }>({
    item,
    itemType,
    itemName,
    onRestore,
    onDelete,
    onViewDetails,
    children
}: MenuRestoreActionsProps<T>) => {

    const mySwal = withReactContent(Swal)

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

    const handleRestoreClick = async () => {
        const loadingToast = toast.loading('Please wait...');
        try {
            const confirmAlert = await confirmRestoreAlert(`Restore ${itemType}: ${ itemName ?? item?.name}`)
            if (confirmAlert.dismiss) return
            await onRestore(item._id)
            toast.success(`${itemType} restored successfully!`, toastOptions)
        } catch (error) {
            toast.error('Failed to restore. Try again.', toastOptions);
        } finally {
            toast.dismiss(loadingToast);
        }
    }

    const handleDeleteClick = async () => {
        const loadingToast = toast.loading('Please wait...');
        try {
            const confirmAlert = await confirmRestoreAlert(`Delete ${itemType} permanently: ${itemName ?? item?.name}`)
            if (confirmAlert.dismiss) return
            await onDelete(item._id)
            toast.success(`${itemType} deleted permanently!`, toastOptions)
        } catch (error) {
            toast.error('Failed to delete. Try again.', toastOptions);
        } finally {
            toast.dismiss(loadingToast);
        }
    }

    return (
        <ModalMenuActions item={item}>
            <div
                className="px-4 py-2 text-sm text-white-0 border-b border-gray-700"
                role="menuitem"
            >
                {itemName ?? item?.name}
            </div>
            <div
                className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
                role="menuitem"
                onClick={(e) => {
                    e.stopPropagation()
                    onViewDetails()
                }}
            >
                <Icon icon="carbon:view" width={20} />
                View details
            </div>
            <div
                className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-green-700 cursor-pointer"
                role="menuitem"
                onClick={handleRestoreClick}
            >
                <Icon icon="hugeicons:data-recovery" width={20} />
                Recover {itemType}
            </div>
            <div
                className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-red-700 cursor-pointer"
                role="menuitem"
                onClick={handleDeleteClick}
            >
                <Icon icon="material-symbols:delete-history" width={22} />
                Delete Definitively
            </div>
            {children}
        </ModalMenuActions>
    )
}