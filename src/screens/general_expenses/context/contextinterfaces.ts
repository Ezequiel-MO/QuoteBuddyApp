import { IGeneralExpense } from '@interfaces/generalExpense'

export interface GeneralExpensesState {
	expenses: IGeneralExpense[]
	currentExpense: Partial<IGeneralExpense> | null
	update: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type GeneralExpensesAction =
	| { type: 'SET_EXPENSES'; payload: IGeneralExpense[] }
	| { type: 'SET_EXPENSE'; payload: Partial<IGeneralExpense> }
	| { type: 'ADD_EXPENSE'; payload: IGeneralExpense }
	| {
			type: 'UPDATE_EXPENSE_FIELD'
			payload: { name: keyof IGeneralExpense; value: any }
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
