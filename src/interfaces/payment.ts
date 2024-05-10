import { IAccManager } from './accManager'

export interface IPayment {
	_id?: string
	projectCode?: string
	amount: number
	paymentDate: string
	vendorInvoiceId: string
	method?: string
	status: 'Completed' | 'Pending' | 'Rejected'
	accManager: IAccManager | null
	update?: false
	createdAt?: string
	updatedAt?: string
}
