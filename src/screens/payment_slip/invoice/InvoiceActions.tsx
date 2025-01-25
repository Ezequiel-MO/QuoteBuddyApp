import { useEffect, FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IInvoice } from '@interfaces/invoice'
import { ICollectionFromClient } from '@interfaces/collectionFromClient'
import { ModalMenuActions } from "src/components/atoms/modal/ModalMenuActions"
import { useInvoice } from 'src/screens/invoices/context/InvoiceContext'
import { Icon } from '@iconify/react'
import { usePaymentSlip } from '@screens/payment_slip/context/PaymentSlipContext'
import { ModalCollectionFromClientForm } from '../ModalCollectionFromClientForm'


interface InvoiceActionsProps {
    invoice: IInvoice
}

export const InvoiceActions: FC<InvoiceActionsProps> = ({ invoice }) => {
    const { dispatch, state } = useInvoice()
    const {
        stateProject: project,
        setIsUpdate,
        setCollectionFromClient
    } = usePaymentSlip()
    const navigate = useNavigate()

    const [openModal, setOpenModal] = useState(false)

    const handleOpenModalAdd = () => {
        setCollectionFromClient({} as ICollectionFromClient)
        setOpenModal(true)
        setIsUpdate(false)
    }

    return (
        <>
            <ModalCollectionFromClientForm open={openModal} setOpen={setOpenModal} />
            <ModalMenuActions item={invoice}>
                <div className="px-4 py-2 text-sm text-white-0 border-b border-gray-700" role="menuitem">
                    Invoice number: {invoice?.invoiceNumber}
                </div>
                <div
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
                    role="menuitem"
                    onClick={() => handleOpenModalAdd()}
                >
                    <Icon icon="line-md:document-add" width={20} />
                    Add new Collection
                </div>
                <div
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
                    role="menuitem"
                    onClick={() => console.log("list")}
                >
                    <Icon icon="fluent:document-multiple-24-filled" width={20} />
                    View List of Collections
                </div>
                {invoice?.type === 'proforma' &&
                    <div
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer transition-all duration-200 hover:text-red-500"
                        role="menuitem"
                        onClick={() => console.log("delete")}
                    >
                        <Icon icon="mdi:delete" width={20} />
                        Delete Proforma
                    </div>
                }
            </ModalMenuActions>
        </>
    )
}