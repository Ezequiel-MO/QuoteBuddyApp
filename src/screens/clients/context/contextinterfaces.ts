import { IClient } from '@interfaces/client'

export interface ClientState {
	clients: IClient[]
	currentClient: Partial<IClient> | null
	update: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type ClientAction =
	| {
			type: 'SET_CLIENTS'
			payload: IClient[]
	  }
	| {
			type: 'SET_CLIENT'
			payload: Partial<IClient>
	  }
	| {
			type: 'ADD_CLIENT'
			payload: IClient
	  }
	| {
			type: 'UPDATE_CLIENT_FIELD'
			payload: { name: keyof IClient; value: any }
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
