import React, { FC } from "react"
import { IInvoice } from "src/interfaces"
import accounting from 'accounting'
import { InvoiceActions } from "./InvoiceActions"
import { TableInvoiceCollectionsFromClient } from './TableInvoiceCollectionsFromClient'


interface InvoicesRowProps {
    invoice: IInvoice
}

export const InvoicesRow: FC<InvoicesRowProps> = ({ invoice }) => {
    return (
        <>
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
                <td align="left" className="px-4 py-2 text-sm relative">
                    <InvoiceActions invoice={invoice} key={invoice._id} />
                </td>
            </tr>
            <TableInvoiceCollectionsFromClient
                collectionsFromClient={invoice.collectionsFromClient}
                key={invoice._id}
            />
            {/* Spacer row */}
            <tr>
                <td colSpan={6} className="py-1" />
            </tr>
        </>
    )
}