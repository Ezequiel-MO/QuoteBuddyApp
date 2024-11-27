import { FC } from "react"
import { IPayment } from "@interfaces/payment"
import { formatMoney } from 'src/helper'

interface TableVendorInvoicePaymentsProps {
    payments: IPayment[]
}

export const TableVendorInvoicePayments: FC<TableVendorInvoicePaymentsProps> = ({ payments }) => {
    return (
        <>
            {
                payments.map(payment => {
                    return (
                        <tr className="bg-black-50 hover:bg-gray-200 hover:text-black-50" key={payment._id}>
                            <td align='left' className="px-3">
                                {`Payment`}
                            </td>
                            <td></td>
                            <td align='left' className="px-3">
                                {payment.paymentDate}
                            </td>
                            <td align='left' className="px-3">
                                {payment.status}
                            </td>
                            <td></td>
                            <td align='left' className="px-3">
                                {formatMoney(payment.amount)}
                            </td>
                            <td align='left' className="px-3">
                                {
                                    payment.status === "Completed" ? formatMoney(0)
                                        : formatMoney(payment.amount)
                                }
                            </td>
                            <td></td>
                        </tr>
                    )
                })
            }
        </>
    )
}