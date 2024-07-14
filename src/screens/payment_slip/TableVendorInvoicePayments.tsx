import { FC } from "react"
import { IPayment } from "@interfaces/payment"

interface TableVendorInvoicePaymentsProps {
    payments: IPayment[]
}

export const TableVendorInvoicePayments: FC<TableVendorInvoicePaymentsProps> = ({ payments }) => {
    return (
        <>
            {
                payments.map(payment => {
                    return (
                        <tr className="bg-black-50 hover:bg-gray-200 hover:text-black-50">
                            <td align='left' className="px-6">
                                {`Payment`}
                            </td>
                            <td></td>
                            <td align='left' className="px-6">
                                {payment.paymentDate}
                            </td>
                            <td></td>
                            <td></td>
                            <td align='left' className="px-6">
                                {payment.status}
                            </td>
                            <td align='left' className="px-6">
                                {payment.amount}
                            </td>
                            <td align='left' className="px-6">
                                {
                                    payment.status === "Completed" ?
                                    0 : payment.amount
                                }
                            </td>
                        </tr>
                    )
                })
            }
        </>
    )
}