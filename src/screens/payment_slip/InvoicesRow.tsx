import React, { FC } from "react"
import { IInvoice } from "src/interfaces"
import accounting from 'accounting'
import { Icon } from '@iconify/react'


interface InvoicesRowProps {
    invoice: IInvoice
}

export const InvoicesRow: FC<InvoicesRowProps> = ({ invoice }) => {
    return (
        <tr className="hover:bg-gray-200 hover:text-black-50">
            <td align="left" className="px-3 uppercase">
                {invoice?.type === 'official' ? 'invoice' : invoice?.type}
            </td>
            <td align="left" className="px-3">
                {invoice?.date}
            </td>
            <td align="left" className="px-3 uppercase text-green-500">
                {`issued`}
            </td>
            <td align="left" className="px-3 truncate max-w-28">
                {invoice?.reference}
            </td>
            <td align="left" className="px-3">
                {accounting.formatMoney(invoice?.lineAmount, '€')}
            </td>
            <td align="left" className="px-3">
            <Icon
                icon="mdi:dots-vertical"
                className="text-xl menu-icon cursor-pointer"
                onClick={() => console.log(invoice?._id)}
            />
            </td>
        </tr>
    )
}