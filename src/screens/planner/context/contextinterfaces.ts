import { DisplayPlanningItem } from '../types'
import { IPlanningItem } from '@interfaces/planner/planningItem'

export interface PlannerState {
	sidebarVisible: boolean
	modalOpen: boolean
	searchTerm: string
	activeItem: number | string | null
	displayItems: DisplayPlanningItem[]
	filteredItems: DisplayPlanningItem[]
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
	| { type: 'SET_ACTIVE_ITEM'; payload: number | string | null }
	| { type: 'SET_DISPLAY_ITEMS'; payload: DisplayPlanningItem[] }
	| { type: 'SET_FILTERED_ITEMS'; payload: DisplayPlanningItem[] }
	| { type: 'ADD_PLANNING_ITEM'; payload: IPlanningItem }
	| { type: 'REMOVE_PLANNING_ITEM'; payload: string }
	| { type: 'CLEAR_PLANNING_ITEMS' }
