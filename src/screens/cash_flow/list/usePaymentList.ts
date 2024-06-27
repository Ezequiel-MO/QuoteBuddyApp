import { IVendorInvoice } from "@interfaces/vendorInvoice"
import { useApiFetch } from 'src/hooks/fetchData'

export const usePaymentList = () => {
	const url = 'vendorInvoices'
	const { data, isLoading , setData} = useApiFetch<IVendorInvoice[]>(url)

	return { data, isLoading , setData }
}
