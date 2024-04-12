import { ListHeader } from '@components/molecules'
import { IPayment } from '@interfaces/payment'
import { useNavigate } from 'react-router-dom'
import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'
import { usePaymentList } from './usePaymentList'

export const PaymentsList = () => {
	const navigate = useNavigate()

	const { data: foundPayments } = usePaymentList()

	const payment: IPayment = {
		_id: 'sdfasdfasdf',
		amount: 1000,
		paymentDate: '30-07-2024',
		vendorInvoiceId: 'adsfas',
		status: 'Pending',
		projectId: 'BCNSAMPLE2023'
	}
	const handleClick = () =>
		navigate('/app/cash_flow/specs', { state: { payment } })
	return (
		<>
			<ListHeader title="Payments" handleClick={handleClick} />
			<hr />
			<table className={listStyles.table}>
				<TableHeaders headers="payments" />
				{foundPayments?.map((payment) => {
					return <td key={payment._id}>{payment.amount}</td>
				})}
			</table>
		</>
	)
}
