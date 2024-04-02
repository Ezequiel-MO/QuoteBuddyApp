import { ListHeader } from '@components/molecules'
import { useNavigate } from 'react-router-dom'
import { listStyles } from 'src/constants/listStyles'
import { TableHeaders } from 'src/ui'

export const PaymentsList = () => {
	const navigate = useNavigate()
	const handleClick = () => navigate('/app/cash_flow/specs')
	return (
		<>
			<ListHeader title="Payments" handleClick={handleClick} />
			<hr />
			<table className={listStyles.table}>
				<TableHeaders headers="payments" />
			</table>
		</>
	)
}
