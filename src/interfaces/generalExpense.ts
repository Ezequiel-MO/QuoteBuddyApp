import { IVendorInvoice } from '@interfaces/vendorInvoice'

export interface IGeneralExpense {
	_id?: string
	name: string
	description: string
	category: 'rent' | 'salary' | 'services' | 'supplies' | 'other'
	imageContentUrl?: string[]
	vendorInvoices?: IVendorInvoice[]
	isDeleted: boolean
}
