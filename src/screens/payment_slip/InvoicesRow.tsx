import React, { FC } from "react"
import { IInvoice } from "src/interfaces"

interface InvoicesRowProps {
    invoice: IInvoice
}

export const InvoicesRow: FC<InvoicesRowProps> = ({ invoice }) => {
    return (
        <tr className="hover:bg-gray-200 hover:text-black-50">
            <td align="left" className="px-6 uppercase">
                {`Invoice`}
            </td>
            <td align="left" className="px-6">
               {invoice.date} 
            </td>
            <td align="left" className="px-6">
               {invoice.lineAmount} 
            </td>
            <td align="left" className="px-6 uppercase text-green-500">
               {`issued`} 
            </td>
        </tr>
    )
}