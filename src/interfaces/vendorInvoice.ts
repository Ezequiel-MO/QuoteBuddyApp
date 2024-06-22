import {
    IHotel,
    IRestaurant,
    IEvent,
    ITransfer,
    IFreelancer,
    IEntertainment,
    IGift,
} from "src/interfaces"
import { IPayment } from "src/interfaces/payment"
import { IProject } from "src/interfaces/project"

export interface IVendorInvoice {
    _id: string
    vendor?: IHotel | IRestaurant | IEvent | ITransfer | IFreelancer | IEntertainment | IGift
    vendorType: 'Restaurant' | 'Hotel' | 'Transfer' | 'Freelancer' | 'Entertainment' | 'Gift'
    vendorModel: 'Hotels' | 'Restaurants' | 'Transfers' | 'Freelancers' | 'Entertainments' | 'Gifts'
    amount: number
    invoiceNumber: string
    invoiceDate: string
    dueDate?: string
    status?: 'Pending' | 'Paid' | 'Partially Paid'
    relatedPayments: IPayment[]
    project?: IProject
    createdAt?: string
    updatedAt?: string
    update?: false//
}
