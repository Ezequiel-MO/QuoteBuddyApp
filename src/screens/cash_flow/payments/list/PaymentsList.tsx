import { useNavigate } from 'react-router-dom'
import { usePayment } from '../../context/PaymentsProvider'
import { CreateBlankPayment } from "../../context/CreateBlankPayment"
import { ListHeader } from '@components/molecules'
import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'




export const PaymentsList = () => {
    const navigate = useNavigate()

    const { state, dispatch } = usePayment()

    const vendorInvoice = state.vendorInvoice ?? {}
    const vendor: any = state.vendorInvoice?.vendor ?? {}

    if (!state.vendorInvoice) {
        return null
    }

    const handleClickCreatePaymeny = () => {
        const newPayment = CreateBlankPayment()
        dispatch({
            type: "ADD_PAYMENT",
            payload: newPayment
        })
        navigate('/app/cash_flow/payment/specs')
    }

    return (
        <div>
            <h1>
                {
                    `Number invoice: ${vendorInvoice?.invoiceNumber}
                     - ${vendorInvoice?.vendorType}
                     - ${vendor.name || vendor.company.email}
                    `
                }
            </h1>
            <ListHeader
                title="Payments"
                handleClick={() => handleClickCreatePaymeny()}
            />
            <hr />
            <table className={listStyles.table}>
                <TableHeaders headers="payments" />
                {
                    vendorInvoice.relatedPayments?.map((payment, index) => {
                        return (
                            <tr key={index} className={listStyles.tr}>
                                <td align='left' className='px-6'>
                                    {payment.amount}
                                </td>
                                <td align='left' className='px-6'>
                                    {payment.status}
                                </td>
                                <td align='left' className='px-6'>
                                    {payment.paymentDate}
                                </td>
                                <td align='left' className='px-6'>
                                    {payment.method ?? '...'}
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}