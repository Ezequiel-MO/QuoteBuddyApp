import { IPayment } from '@interfaces/payment'
import { IVendorInvoice } from "src/interfaces/vendorInvoice"

export const VendorInvoiceFormData = {
	create: (values: any, files: File[] = []) => {
		const jsonData = {} as IVendorInvoice
		jsonData.amount = values.amount
		jsonData.invoiceNumber = values.invoiceNumber
		jsonData.project = values.project
		jsonData.invoiceDate = values.invoiceDate
		jsonData.dueDate = values.dueDate
		jsonData.vendorType = values.vendorType
		jsonData.vendorModel = values.vendorModel
		jsonData.vendor = values.vendor
		jsonData.status = values.status
		return jsonData
	},
	update: (values: any) => {
		const jsonData = {} as IVendorInvoice
		jsonData.amount = values.amount
		jsonData.invoiceNumber = values.invoiceNumber
		jsonData.project = values.project
		jsonData.invoiceDate = values.invoiceDate
		jsonData.dueDate = values.dueDate
		jsonData.vendorType = values.vendorType
		jsonData.vendorModel = values.vendorModel
		jsonData.vendor = values.vendor
		jsonData.status = values.status
		return jsonData
	}
}
