import { useEffect, FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { IVendorInvoice } from "src/interfaces/vendorInvoice"
import { removeItemFromList } from 'src/helper/RemoveItemFromList'
import { ModalPaymentForm } from "../payments/specs/ModalPaymentForm"
import { usePayment } from '../context/PaymentsProvider'
import { CreateBlankPayment } from "../context/CreateBlankPayment"


interface VendorInvoiceActionsProps {
    vendorInvoice: IVendorInvoice
    foundVendorInvoices: IVendorInvoice[]
}

export const VendorInvoiceActions: FC<VendorInvoiceActionsProps> = ({
    vendorInvoice,
    foundVendorInvoices,
}) => {

    const navigate = useNavigate()
    const { state, dispatch } = usePayment()


    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [openFormModal, setOpenFormModal] = useState(false)

    const handleToggleMenu = () => {
        setIsMenuOpen(prev => !prev)
    }

    const handleNavigatePaymentList = () => {
        dispatch({
            type: "UPDATE_VENDORINVOICE",
            payload: {
                vendorInvoiceUpdate: vendorInvoice
            }
        })
        navigate('/app/cash_flow/payment')
    }

    const handleDispatchRemoveItem = (updateVendorInvoices: IVendorInvoice[]) => {
        dispatch({
            type: "SET_VENDORINVOICES",
            payload: updateVendorInvoices
        })
    }

    const handleOpenFormModal = () => {
        dispatch({
            type: "UPDATE_VENDORINVOICE",
            payload: {
                vendorInvoiceUpdate: vendorInvoice
            }
        })
        const newPayment = CreateBlankPayment()
        dispatch({
            type: "TOGGLE_UPDATE",
            payload: false
        })
        dispatch({
            type: "ADD_PAYMENT",
            payload: newPayment
        })
        setOpenFormModal(true)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!event.target) return
            const target = event.target as Element
            if (target.id !== vendorInvoice._id && target.role !== "menuitem") {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <>
            <ModalPaymentForm open={openFormModal} setOpen={setOpenFormModal} />
            <Icon
                id={vendorInvoice._id}
                icon="mdi:dots-vertical"
                className="text-xl menu-icon cursor-pointer"
                onClick={() => handleToggleMenu()}
            />
            <div
                className={`absolute text-left transition-all duration-300   ${!isMenuOpen ? "max-h-0 opacity-0" : "max-h-[800px] opacity-100"}`}
            >
                <div
                    className="z-50  origin-top-right absolute right-0 mt-0 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden"
                >
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        <div className="px-4 py-2 text-sm text-white-0 border-b border-gray-700">
                            {vendorInvoice.invoiceNumber} - {vendorInvoice.project?.code}
                        </div>
                        <div
                            className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
                            role="menuitem"
                            onClick={() => handleOpenFormModal()}
                        >
                            <Icon icon="line-md:document-add" width={20} />
                            Add new Payment
                        </div>
                        <div
                            className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
                            role="menuitem"
                            onClick={() => handleNavigatePaymentList()}
                        >
                            <Icon icon="mdi:cash-multiple" width={20} />
                            View List Payments
                        </div>
                        {vendorInvoice.status === 'Pending' && (
                            <div
                                className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer hover:text-red-500"
                                role="menuitem"
                                onClick={() =>
                                    removeItemFromList(
                                        'vendorInvoices',
                                        vendorInvoice._id as string,
                                        (updateVendorInvoices) => handleDispatchRemoveItem(updateVendorInvoices as IVendorInvoice[]),
                                        foundVendorInvoices
                                    )
                                }
                            >
                                <Icon icon="mdi:delete" width={20} />
                                Delete Vendor Invoice
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
