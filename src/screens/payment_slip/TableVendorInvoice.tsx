import { usePaymentSlip } from "@screens/payment_slip/context/PaymentSlipContext"
import { TableHeaders } from "src/ui"
import { TableVendorInvoicePayments } from "./TableVendorInvoicePayments"
import { IPayment } from "@interfaces/payment"


export const TableVendorInvoice = () => {
    const { stateProject } = usePaymentSlip()

    const vendorName = (vendor:any)=>{
        if(vendor.name){
            return `${vendor.name.slice(0, 10)}...` 
        }
        if(vendor.company){
            return `${vendor.company.slice(0, 10)}...`
        }
        if(vendor.email){
            return `${vendor.email}`
        }
        return ""
    }

    const balance = (payments: IPayment[], vendorInvoiceAmount: number) => {
        let finalbalance = vendorInvoiceAmount
        for (let i = 0; i < payments.length; i++) {
            if (payments[i].status === "Completed") {
                finalbalance = finalbalance - payments[i].amount
            }
        }
        return finalbalance
    }


    return (
        <>
            <table className='mt-10 mb-10 min-w-full  table-auto border-collapse border-2'>
                <TableHeaders headers="paymentSlimpVendorInvoice" />
                <tbody className="divide-y">
                    {
                        stateProject?.vendorInvoices && stateProject?.vendorInvoices.map(vendorInvoice => {
                            return (
                                <>
                                    <tr key={vendorInvoice._id} className="hover:bg-gray-200 hover:text-black-50">
                                        <td align='left' className="px-6">
                                            {`SUPPLIER INVOICE`}
                                        </td>
                                        <td align='left' className="px-6">
                                            {vendorInvoice.invoiceNumber}
                                        </td>
                                        <td align='left' className="px-6">
                                            {vendorInvoice.invoiceDate}
                                        </td>
                                        <td align='left' className="px-6">
                                            {vendorInvoice.vendorType}
                                        </td>
                                        <td align='left' className="px-6">
                                            {
                                                vendorName(vendorInvoice.vendor)
                                            }
                                        </td>
                                        <td align='left' className="px-6">
                                            {vendorInvoice.status}
                                        </td>
                                        <td align='left' className="px-6">
                                            {vendorInvoice.amount}
                                        </td>
                                        <td align='left' className="px-6">
                                            {balance(vendorInvoice.relatedPayments, vendorInvoice.amount)}
                                        </td>
                                    </tr>
                                    <TableVendorInvoicePayments payments={vendorInvoice.relatedPayments} />
                                    <tr>
                                        <td colSpan={7} className="py-2"></td>
                                    </tr>
                                </>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}