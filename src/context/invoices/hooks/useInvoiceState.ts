import { useInvoiceContext } from './useInvoiceContext'

export const useInvoiceState = () => {
	const { state } = useInvoiceContext()
	return state
}
