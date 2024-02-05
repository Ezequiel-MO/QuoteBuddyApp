import baseAPI from 'src/axios/axiosConfig'

export async function fetchInvoices() {
	try {
		const response = await baseAPI.get('invoices')
		return response.data.data.data
	} catch (error) {
		console.error('Failed to load invoices:', error)
		throw error
	}
}
