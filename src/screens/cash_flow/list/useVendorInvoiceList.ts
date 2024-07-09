import { IVendorInvoice } from "@interfaces/vendorInvoice"
import { useApiFetch } from 'src/hooks/fetchData'

export const useVendorInvoiceList = () => {
	const url = 'vendorInvoices'
	const { data, isLoading , setData} = useApiFetch<IVendorInvoice[]>(url)

	return { data, isLoading , setData }
}
