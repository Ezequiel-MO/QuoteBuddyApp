export interface PlannerState {
	sidebarVisible: boolean
	modalOpen: boolean
	searchTerm: string
}

export type PlannerAction =
	| {
			type: 'TOGGLE_SIDEBAR'
			payload: boolean
	  }
	| {
			type: 'TOGGLE_MODAL'
			payload: boolean
	  }
	| { type: 'SET_SEARCH_TERM'; payload: string }
