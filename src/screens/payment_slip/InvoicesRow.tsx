import React, { FC } from "react"
import { IInvoice } from "src/interfaces"
import accounting from 'accounting'


interface InvoicesRowProps {
    invoice: IInvoice
}

export const InvoicesRow: FC<InvoicesRowProps> = ({ invoice }) => {
    return (
        <tr className="hover:bg-gray-200 hover:text-black-50">
            <td align="left" className="px-3 uppercase">
                {`Invoice`}
            </td>
            <td align="left" className="px-3">
               {invoice.date} 
            </td>
            <td align="left" className="px-3">
               {accounting.formatMoney(invoice.lineAmount, '€')} 
            </td>
            <td align="left" className="px-3 uppercase text-green-500">
               {`issued`} 
            </td>
        </tr>
    )
}