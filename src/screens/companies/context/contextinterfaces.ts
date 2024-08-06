import { IClient } from '@interfaces/client'
import { IClientCompany } from '@interfaces/clientCompany'

export interface CompanyState {
	companies: IClientCompany[]
	currentCompany: Partial<IClientCompany> | null
	update: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type CompanyAction =
	| {
			type: 'SET_COMPANIES'
			payload: IClientCompany[]
	  }
	| {
			type: 'SET_COMPANY'
			payload: Partial<IClientCompany>
	  }
	| {
			type: 'ADD_COMPANY'
			payload: IClientCompany
	  }
	| {
			type: 'UPDATE_COMPANY_FIELD'
			payload: { name: keyof IClientCompany; value: any }
	  }
	| {
			type: 'ADD_EMPLOYEE'
			payload: IClient
	  }
	| { type: 'REMOVE_EMPLOYEE'; payload: string }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
