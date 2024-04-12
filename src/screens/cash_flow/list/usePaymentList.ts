import { IPayment } from '@interfaces/payment'
import { useApiFetch } from 'src/hooks/fetchData'

export const usePaymentList = () => {
	const url = 'payments'
	const { data } = useApiFetch<IPayment>(url)

	return { data }
}
