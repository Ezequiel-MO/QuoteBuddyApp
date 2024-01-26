import { useInvoiceContext } from './useInvoiceContext'

export const useInvoiceDispatch = () => {
	const { dispatch } = useInvoiceContext()
	return dispatch
}
