import { ITransfer } from '@interfaces/transfer'

export interface TransferState {
	transfers: ITransfer[] | null
	currentTransfer: Partial<ITransfer> | null
	update: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type TransferAction =
	| {
			type: 'SET_TRANSFERS'
			payload: ITransfer[]
	  }
	| {
			type: 'SET_TRANSFER'
			payload: Partial<ITransfer>
	  }
	| {
			type: 'UPDATE_TRANSFER_FIELD'
			payload: { name: keyof ITransfer; value: any }
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
