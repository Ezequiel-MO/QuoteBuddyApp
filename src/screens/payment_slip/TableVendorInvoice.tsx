import { useNavigate, useParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { usePaymentSlip } from "@screens/payment_slip/context/PaymentSlipContext"
import { TableHeaders } from "src/ui"
import { TableVendorInvoicePayments } from "./TableVendorInvoicePayments"
import { IPayment } from "@interfaces/payment"
import { IVendorInvoice } from "@interfaces/vendorInvoice"
import { Button } from '@components/atoms'
import { usePayment } from '@screens/cash_flow/context/PaymentsProvider'
import { CreateBlankVendorInvoice } from '@screens/cash_flow/context/CreateBlankVendorInvoice'
import { VendorInvoiceActions } from "src/screens/cash_flow/list/VendorInvoiceActions"


export const TableVendorInvoice = () => {
    const navigate = useNavigate()
    const { projectId } = useParams<{ projectId: string }>()


    const { stateProject, setForceRefresh: setForceRefreshPaymentSlip } = usePaymentSlip()

    const { dispatch, state } = usePayment()

    const handleCreateNewItem = () => {
        const newVendorInvoice: IVendorInvoice = CreateBlankVendorInvoice()
        dispatch({
            type: 'ADD_VENDORINVOICE',
            payload: newVendorInvoice
        })
        dispatch({
            type: 'TOGGLE_UPDATE',
            payload: false
        })
        dispatch({
            type: "UPDATE_VENDORINVOICE_FIELD",
            payload: { name: "project", value: projectId }
        })
        setTimeout(() => {
            navigate('vendorInvoice_specs')
        }, 250)
    }

    const handleClickUpdate = (vendorInvoice: IVendorInvoice) => {
        dispatch({
            type: 'UPDATE_VENDORINVOICE',
            payload: {
                vendorInvoiceUpdate: vendorInvoice
            }
        })
        dispatch({
            type: "TOGGLE_UPDATE",
            payload: true
        })
        setTimeout(() => {
            navigate('vendorInvoice_specs')
        }, 250)
    }


    const vendorName = (vendor: any) => {
        if (vendor.name) {
            return `${vendor.name.slice(0, 10)}...`
        }
        if (vendor.company) {
            return `${vendor.company.slice(0, 10)}...`
        }
        if (vendor.email) {
            return `${vendor.email}`
        }
        return ""
    }

    const balance = (payments: IPayment[], vendorInvoice: IVendorInvoice) => {
        let finalbalance = vendorInvoice.amount
        for (let i = 0; i < payments.length; i++) {
            if (payments[i].status === "Completed") {
                finalbalance = finalbalance - payments[i].amount
            }
        }
        return finalbalance
    }

    return (
        <>
            <table className='mt-10 mb-3 min-w-full  table-auto border-collapse border-2'>
                <TableHeaders headers="paymentSlimpVendorInvoice" />
                <tbody className="divide-y">
                    {
                        stateProject?.vendorInvoices && stateProject?.vendorInvoices.map(vendorInvoice => {
                            return (
                                <>
                                    <tr key={vendorInvoice._id} className="hover:bg-gray-200 hover:text-black-50">
                                        <td align='left' className="px-3 flex">
                                            {`SUPPLIER INVOICE`}
                                            <span className='ml-2 mt-[6px]' onClick={(e) => handleClickUpdate(vendorInvoice)}>
                                                <abbr title='Edit SUPPLIER INVOICE'>
                                                    <Icon
                                                        icon="ci:file-edit"
                                                        width={18}
                                                        className='text-green-600 cursor-pointer transition-all duration-300 hover:scale-150 hover:text-emerald-600 active:scale-95'
                                                    />
                                                </abbr>
                                            </span>
                                        </td>
                                        <td align='left' className="px-3">
                                            {vendorInvoice.invoiceNumber}
                                        </td>
                                        <td align='left' className="px-3">
                                            {vendorInvoice.invoiceDate}
                                        </td>
                                        <td align='left' className="px-3">
                                            {vendorInvoice.vendorType}
                                        </td>
                                        <td align='left' className="px-3">
                                            {
                                                vendorName(vendorInvoice.vendor)
                                            }
                                        </td>
                                        <td align='left' className="px-3">
                                            {vendorInvoice.status}
                                        </td>
                                        <td align='left' className="px-3">
                                            {vendorInvoice.amount}
                                        </td>
                                        <td align='left' className="px-3">
                                            {balance(vendorInvoice.relatedPayments, vendorInvoice)}
                                        </td>
                                        <td align='left' className="px-3">
                                            <VendorInvoiceActions
                                                vendorInvoice={vendorInvoice}
                                                foundVendorInvoices={state.vendorInvoices}
                                                setForceRefresh={setForceRefreshPaymentSlip}
                                            />
                                        </td>
                                    </tr >
                                    <TableVendorInvoicePayments payments={vendorInvoice.relatedPayments} />
                                    <tr>
                                        <td colSpan={7} className="py-2"></td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table >
            <div className="mt-4 flex justify-end mr-2">
                <Button
                    newClass="
                flex items-center gap-1 flex-none  bg-black-50 hover:animate-pulse
                hover:bg-orange-50 text-white-100 uppercase font-semibold 
                py-2 px-2 border border-orange-50 rounded-md 
                transition-transform transform active:scale-95 
                "
                    icon="basil:add-outline"
                    widthIcon={30}
                    handleClick={() => handleCreateNewItem()}
                >
                    add vendor invoice
                </Button>
            </div>
        </>
    )
}