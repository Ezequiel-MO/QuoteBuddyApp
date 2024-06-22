import { IPayment } from '@interfaces/payment'
import { IVendorInvoice } from "src/interfaces/vendorInvoice"


export const CreateBlankPayment = (): IVendorInvoice => {
	return {
		_id: '',
		amount: 0,
		invoiceDate: "",
		vendor: undefined,
		status: "" as any,
		invoiceNumber: "",
		project: undefined,
		relatedPayments: [],
		vendorModel: "" as any,
		vendorType: "" as any,
		dueDate: "",
		update: false,
		createdAt: '',
		updatedAt: ''
	}
}
