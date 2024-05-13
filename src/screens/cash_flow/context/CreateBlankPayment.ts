import { IPayment } from '@interfaces/payment'

export const CreateBlankPayment = (): IPayment => {
	return {
		_id: '',
		amount: 0,
		paymentDate: '',
		vendorInvoiceId: '',
		status: 'Pending',
		accManager: null,
		update: false,
		projectCode: '',
		createdAt: '',
		updatedAt: ''
	}
}
