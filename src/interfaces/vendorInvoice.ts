import {
	IHotel,
	IRestaurant,
	IEvent,
	ITransfer,
	IFreelancer,
	IEntertainment,
	IGift
} from 'src/interfaces'
import { IPayment } from 'src/interfaces/payment'
import { IProject } from 'src/interfaces/project'
import { IOtherOperational } from './otherOperational'

export interface IVendorInvoice {
	_id: string
	vendor?:
		| IHotel
		| IRestaurant
		| IEvent
		| ITransfer
		| IFreelancer
		| IEntertainment
		| IGift
		| IOtherOperational
	vendorType?:
		| 'Restaurant'
		| 'Event'
		| 'Hotel'
		| 'Transfer'
		| 'Freelancer'
		| 'Entertainment'
		| 'Gift'
		| 'GeneralExpense'
		| 'OtherOperational'
	vendorModel?:
		| 'Hotels'
		| 'Events'
		| 'Restaurants'
		| 'Transfers'
		| 'Freelancers'
		| 'Entertainments'
		| 'Gifts'
		| 'GeneralExpenses'
		| 'OtherOperationals'
	amount: number
	invoiceNumber: string
	invoiceDate: string
	dueDate?: string
	status?: 'Pending' | 'Paid' | 'Partially Paid'
	relatedPayments: IPayment[]
	project?: IProject
	createdAt?: string
	updatedAt?: string
	pdfInvoice: string[]
}
