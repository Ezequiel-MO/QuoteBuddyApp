import { useContext } from 'react'
import { InvoiceContext } from '../Context'

export const useInvoiceContext = () => {
	const context = useContext(InvoiceContext)

	if (context === undefined) {
		throw new Error('useInvoiceContext must be used within an InvoiceProvider')
	}

	return context
}
