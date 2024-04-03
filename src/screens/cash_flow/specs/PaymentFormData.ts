import { IPayment } from '@interfaces/payment'

export const PaymentFormData = {
	create: (values: any, files: File[] = []) => {
		const jsonData = {} as IPayment
		jsonData.amount = values.amount
		jsonData.paymentDate = values.paymentDate
		jsonData.vendorInvoiceId = values.vendorInvoiceId
		jsonData.method = values?.method
		jsonData.status = values.status
		jsonData.projectId = values.projectId
		return jsonData
	},
	update: (values: any) => {
		const jsonData = {} as IPayment
		jsonData.amount = values.amount
		jsonData.paymentDate = values.paymentDate
		jsonData.vendorInvoiceId = values.vendorInvoiceId
		jsonData.method = values?.method
		jsonData.status = values.status
		jsonData.projectId = values.projectId
		return jsonData
	}
}
