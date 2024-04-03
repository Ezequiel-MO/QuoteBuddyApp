export interface IPayment {
	_id?: string
	amount: number
	paymentDate: string
	vendorInvoiceId: string
	method?: string
	status: 'Completed' | 'Pending' | 'Failed'
	projectId?: string
}
