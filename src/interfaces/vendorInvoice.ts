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
import { IAudiovisual } from './audiovisual'

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
		| IAudiovisual
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
		| 'Audiovisuals'
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
		| 'Audiovisuals'
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
