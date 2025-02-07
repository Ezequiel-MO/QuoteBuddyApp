import baseAPI from '@axios/axiosConfig'
import { IPayment } from '@interfaces/payment'

export async function createPayment(dataPost: FormData): Promise<IPayment> {
	const response = await baseAPI.post('payments', dataPost)
	return response.data.data.data
}

export async function updatePayment(
	paymentId: string,
	dataUpdate: any
): Promise<IPayment> {
	const response = await baseAPI.patch(`payments/${paymentId}`, dataUpdate)
	return response.data.data.data
}

export async function updatePaymentPdf(
	paymentId: string,
	valuesUpdatePdf: FormData
): Promise<IPayment> {
	const response = await baseAPI.patch(
		`payments/pdfPayment/${paymentId}`,
		valuesUpdatePdf
	)
	return response.data.data.data
}
