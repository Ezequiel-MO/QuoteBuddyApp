import { Spinner } from 'src/components/atoms/spinner/Spinner'
import { formatMoney } from 'src/helper'
import { VendorInvoiceActions } from './VendorInvoiceActions'
import { usePayment } from '../context/PaymentsProvider'
import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'
import { useNavigate } from 'react-router-dom'
import { IVendorInvoice } from '@interfaces/vendorInvoice'


export const ListTableVendorInvoice = () => {

    const navigate = useNavigate()
    const {
        state,
        dispatch,
        isLoading,
    } = usePayment()

    if (isLoading) {
        return <Spinner />
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
        navigate('specs')
    }

    return (
        <table className={listStyles.table}>
            <TableHeaders headers="vendorInvoice" />
            {state.vendorInvoices?.map((vendorInvoice) => {
                return (
                    <tr key={vendorInvoice?._id} className={listStyles.tr}>
                        <td
                            className="cursor-pointer hover:text-blue-600"
                            onClick={() => handleClickUpdate(vendorInvoice)}
                        >
                            {vendorInvoice?.project?.code}
                        </td>
                        <td align="left" className="px-6">
                            {vendorInvoice.project?.accountManager[0] &&
                                `${vendorInvoice?.project?.accountManager[0]?.firstName} 
									${vendorInvoice?.project?.accountManager[0]?.familyName}`}
                        </td>
                        <td align="left" className="px-6">
                            {vendorInvoice?.invoiceNumber}
                        </td>
                        <td align="left" className="px-6">
                            {vendorInvoice?.invoiceDate}
                        </td>
                        <td align="left" className="px-6">
                            {(vendorInvoice?.vendor as any)?.name ||
                                (vendorInvoice?.vendor as any)?.company ||
                                (vendorInvoice?.vendor as any)?.email}
                        </td>
                        <td align="left" className="px-6">
                            {vendorInvoice?.vendorType}
                        </td>
                        <td align="left" className="px-6">
                            {formatMoney(vendorInvoice?.amount)}
                        </td>
                        <td align="left" className="px-6">
                            {vendorInvoice?.status}
                        </td>
                        <td align="left" className="px-6">
                            <VendorInvoiceActions
                                vendorInvoice={vendorInvoice}
                                foundVendorInvoices={state.vendorInvoices}
                            />
                        </td>
                    </tr>
                )
            })}
        </table>
    )

}