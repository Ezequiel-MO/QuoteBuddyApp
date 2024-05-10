import { ListHeader } from '@components/molecules'
import { IPayment } from '@interfaces/payment'
import { useNavigate } from 'react-router-dom'
import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'
import { usePaymentList } from './usePaymentList'
import { CreateBlankPayment } from '../context/CreateBlankPayment'
import { usePayment } from '../context/PaymentsProvider'

export const PaymentsList = () => {
	const { state, dispatch } = usePayment()
	const navigate = useNavigate()

	const { data: foundPayments } = usePaymentList()

	const handleClick = () => {
		const newPayment: IPayment = CreateBlankPayment()
		dispatch({
			type: 'ADD_PAYMENT',
			payload: newPayment
		})
		navigate('/app/cash_flow/specs')
	}
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
