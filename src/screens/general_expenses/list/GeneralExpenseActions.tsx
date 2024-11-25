import { useEffect, FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { removeItemFromList } from 'src/helper/RemoveItemFromList'
import { IGeneralExpense } from '@interfaces/generalExpense'
import { useGeneralExpense } from '../context/GeneralExpensesContext'
import { useAuth } from 'src/context/auth/AuthProvider'
import { usePayment } from '@screens/cash_flow/context/PaymentsProvider'
import { CreateBlankVendorInvoice } from '@screens/cash_flow/context/CreateBlankVendorInvoice'
import { IVendorInvoice } from "src/interfaces/vendorInvoice"

interface GeneralExpenseActionsProps {
    generalExpense: IGeneralExpense
    allGeneralExpense: IGeneralExpense[]
}

export const GeneralExpenseActions: FC<GeneralExpenseActionsProps> = ({ generalExpense, allGeneralExpense }) => {

    const navigate = useNavigate()
    const { auth } = useAuth()
    const { dispatch, state } = useGeneralExpense()

    const { dispatch: vendorInvoiceDispatch, state: vendorInvoiceState } = usePayment()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const handleToggleMenu = () => {
        setIsMenuOpen(prev => !prev)
    }


    const handleDispatchRemoveItem = (updateGeneralExpenses: IGeneralExpense[]) => {
        dispatch({
            type: "SET_EXPENSES",
            payload: updateGeneralExpenses
        })
    }

    //useEffect para open o closed del menu actions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!event.target) {
                return
            }
            const target = event.target as Element
            if (target.id !== generalExpense._id && target.role !== "menuitem") {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleCreateNewItem = () => {
        const newVendorInvoice: IVendorInvoice = CreateBlankVendorInvoice()
        vendorInvoiceDispatch({
            type: 'ADD_VENDORINVOICE',
            payload: newVendorInvoice
        })
        vendorInvoiceDispatch({
            type: 'TOGGLE_UPDATE',
            payload: false
        })
        vendorInvoiceDispatch({
            type: "UPDATE_VENDORINVOICE_FIELD",
            payload: { name: "vendorType", value: "GeneralExpense" }
        })
        vendorInvoiceDispatch({
            type: "UPDATE_VENDORINVOICE_FIELD",
            payload: { name: "vendor", value: generalExpense._id }
        })
        setTimeout(() => {
            navigate('vendorInvoice/specs')
        }, 250)
    }

    const handleNavigateVendorInvoiceList = () => {
        vendorInvoiceDispatch({
            type: 'SET_FILTER',
            payload: {
                name: 'vendorTypeFilter',
                value: 'GeneralExpense'
            }
        })
        vendorInvoiceDispatch({
            type: 'SET_FILTER',
            payload: {
                name: 'vendorIdFilter',
                value: generalExpense._id as string
            }
        })
        setTimeout(() => {
            navigate('vendorInvoice')
        }, 250)
    }

    return (
        <>
            <Icon
                id={generalExpense._id}
                icon="mdi:dots-vertical"
                className="text-xl menu-icon cursor-pointer"
                onClick={() => handleToggleMenu()}
            />
            <div
                className={`absolute text-left transition-all duration-300   ${!isMenuOpen ? "max-h-0 opacity-0" : "max-h-[800px] opacity-100"}`}
            >
                <div
                    className="z-50 origin-top-right absolute right-0 mt-0 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 overflow-hidden"
                >
                    <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        <div className="px-4 py-2 text-sm text-white-0 border-b border-gray-700">
                            {generalExpense.name} - {generalExpense.category}
                        </div>
                        <div
                            className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
                            role="menuitem"
                            onClick={() => handleCreateNewItem()}
                        >
                            <Icon icon="mdi:invoice-text-edit-outline" width={20} />
                            Add new Vendor Invoice
                        </div>
                        <div
                            className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer"
                            role="menuitem"
                            onClick={() => handleNavigateVendorInvoiceList()}
                        >
                            <Icon icon="mdi:invoice-text-multiple-outline" width={20} />
                            View List Vendor Invoices
                        </div>
                        {
                            auth.role === 'admin' &&
                            <div
                                className="flex items-center gap-2 px-4 py-2 text-sm text-white-0 hover:bg-gray-700 cursor-pointer hover:text-red-500"
                                role="menuitem"
                                onClick={() => {
                                    removeItemFromList(
                                        'expenses',
                                        generalExpense._id as string,
                                        (updateGeneralExpenses) => handleDispatchRemoveItem(updateGeneralExpenses as IGeneralExpense[]),
                                        allGeneralExpense
                                    )
                                }}
                            >
                                <Icon icon="mdi:delete" width={20} />
                                Delete Expense
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}