import { ISupplier } from '@interfaces/supplier'

export interface SupplierState {
	suppliers: ISupplier[]
	currentSupplier: Partial<ISupplier | null>
	update: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type SupplierAction =
	| {
			type: 'SET_SUPPLIERS'
			payload: ISupplier[]
	  }
	| {
			type: 'SET_SUPPLIER'
			payload: Partial<ISupplier>
	  }
	| {
			type: 'SET_TOTAL_PAGES'
			payload: number
	  }
	| {
			type: 'UPDATE_SUPPLIER_FIELD'
			payload: { name: keyof ISupplier; value: any }
	  }
	| {
			type: 'SET_SEARCH_TERM'
			payload: string
	  }
	| {
			type: 'TOGGLE_UPDATE'
			payload: boolean
	  }
