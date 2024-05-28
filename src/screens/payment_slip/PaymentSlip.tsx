import { useParams } from 'react-router-dom'

const PaymentSlip = () => {
	const { projectId } = useParams<{ projectId: string }>()
	return <div>{projectId}</div>
}

export default PaymentSlip
