import { IPayment } from '@interfaces/payment'

export const createPaymentEntity = async (
	entityType: string,
	paymentData: Partial<IPayment> | null,
	files: File[],
	dispatch: React.Dispatch<any>
) => {
	try {
		if (!paymentData) throw new Error('Payment data is required')
	} catch (error: any) {}
}
