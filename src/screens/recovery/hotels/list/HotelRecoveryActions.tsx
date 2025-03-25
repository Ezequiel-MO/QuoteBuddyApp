import { FC, useState } from 'react'
import { ModalMenuActions } from 'src/components/atoms/modal/ModalMenuActions'
import { Icon } from '@iconify/react'
import { IHotel } from 'src/interfaces'


interface HotelRecoveryActions {
    hotel: IHotel
}



export const HotelRecoveryActions: FC<HotelRecoveryActions> = ({hotel}) => {

    return (
        <ModalMenuActions item={hotel}>
            <div
                className="px-4 py-2 text-sm text-white-0 border-b border-gray-700"
                role="menuitem"
            >
                Name: {hotel?.name}
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
                // onClick={() => handleOpenModalAddCollection()}
            >
                <Icon icon="hugeicons:data-recovery" width={20} />
                Recovery Hotel
            </div>
            <div
                className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-red-700 cursor-pointer"
                role="menuitem"
                // onClick={() => handleViewInvoice(invoice)}
            >
                <Icon icon="material-symbols:preview" width={22} />
                Delete definitively
            </div>
        </ModalMenuActions>
    )
}