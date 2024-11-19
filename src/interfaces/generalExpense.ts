import { ISupplier } from './supplier'

export interface IGeneralExpense {
	_id?: string
	name: string
	description: string
	category: 'rent' | 'salary' | 'services' | 'supplies' | 'other'
	imageContentUrl?: string[]
	suppliers?: ISupplier[]
	isDeleted: boolean
}
