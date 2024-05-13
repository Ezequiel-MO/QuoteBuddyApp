import { IPayment } from '@interfaces/payment'
import { useApiFetch } from 'src/hooks/fetchData'

export const usePaymentList = () => {
	const url = 'payments'
	const { data, isLoading } = useApiFetch<IPayment[]>(url)

	return { data, isLoading }
}
