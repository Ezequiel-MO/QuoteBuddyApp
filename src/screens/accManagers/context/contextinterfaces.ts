import { IAccManager } from '@interfaces/accManager'

export interface AccManagerState {
	accManagers: IAccManager[]
	currentAccManager: Partial<IAccManager> | null
	update: boolean
	imagesModal: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type AccManagerAction =
	| { type: 'SET_ACCMANAGERS'; payload: IAccManager[] }
	| { type: 'SET_ACCMANAGER'; payload: Partial<IAccManager> }
	| { type: 'ADD_ACCMANAGER'; payload: IAccManager }
	| {
			type: 'UPDATE_ACCMANAGER_FIELD'
			payload: { name: keyof IAccManager; value: any }
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'SET_IMAGES_MODAL_OPEN'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| {
			type: 'APPEND_TO_ARRAY_FIELD'
			payload: { name: keyof IAccManager; value: any }
	  }
	| { type: 'SET_SEARCH_TERM'; payload: string }
