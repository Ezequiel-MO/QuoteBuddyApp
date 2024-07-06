
export interface IPayment {
	_id?: string
	amount: number
	paymentDate: string
	method?: string
	status: 'Completed' | 'Pending' | 'Rejected'
	proofOfPaymentPDF: string[]
	update?: false //
	createdAt?: string
	updatedAt?: string
}
