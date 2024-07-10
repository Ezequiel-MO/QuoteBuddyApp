
export interface IPayment {
	_id?: string
	amount: number
	paymentDate: string
	method?: string
	status: 'Completed' | 'Pending' | 'Rejected'
	proofOfPaymentPDF: string[]
	update?: boolean //
	createdAt?: string
	updatedAt?: string
}
