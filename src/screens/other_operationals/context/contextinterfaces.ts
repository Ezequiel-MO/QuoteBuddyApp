import { IOtherOperational } from '@interfaces/otherOperational'

export interface OtherOperationalState {
	otherOperationals: IOtherOperational[]
	currentOtherOperational: Partial<IOtherOperational> | null
	update: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type OtherOperationalAction =
	| {
			type: 'SET_OTHEROPERATIONALS'
			payload: IOtherOperational[]
	  }
	| {
			type: 'SET_OTHEROPERATIONAL'
			payload: Partial<IOtherOperational>
	  }
	| {
			type: 'ADD_OTHEROPERATIONAL'
			payload: IOtherOperational
	  }
	| {
			type: 'UPDATE_OTHEROPERATIONAL_FIELD'
			payload: { name: keyof IOtherOperational; value: any }
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
