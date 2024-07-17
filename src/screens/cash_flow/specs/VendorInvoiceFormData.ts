import { IVendorInvoice } from "src/interfaces/vendorInvoice"
import { errorSweetalert } from "src/components/atoms/sweetalert/ErrorSweetalert"


export const VendorInvoiceFormData = {
	create: (values: any, files: File[] = []) => {
		const formData = new FormData()
		formData.set("amount", values.amount)
		formData.set("invoiceNumber", values.invoiceNumber)
		formData.set("project", values.project)
		formData.set("invoiceDate", values.invoiceDate)
		formData.set("dueDate", values.dueDate)
		formData.set("vendorType", values.vendorType)
		formData.set("vendorModel", values.vendorModel)
		formData.set("vendor", values.vendor)
		formData.set("status", values.status)
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				console.log(files[i])
				formData.set("pdfInvoice", files[i])
			}
		}
		if(files.length === 0){
			return errorSweetalert("Error" , "Must upload a PDF of the invoice to the 'Vendor Invoice'")
		}
		return formData
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
	},
	updatePdfData: (values: any, files: File[] = []) => {
		const formData = new FormData()
		formData.set("typeImage" , "pdfInvoice")
		if (values?.imageContentUrl.length > 0) {
			formData.append('imageUrls', values.imageContentUrl)
		}
		if (values?.deletedImage?.length > 0) {
			formData.append('deletedImage', values.deletedImage)
		}
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				formData.set("pdfInvoice", files[i])
			}
		}
		return formData
	}
}
