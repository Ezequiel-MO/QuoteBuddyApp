export interface ProjectState {
	isBudgetVisualizerOpen: boolean
	selectedTab:
		| 'Intro Text/Gifts'
		| 'Transfers IN'
		| 'Hotels'
		| 'Meetings'
		| 'Schedule'
		| 'Transfers OUT'
		| 'Itinerary'
		| 'Preview'
}

export type ProjectAction =
	| { type: 'TOGGLE_BUDGET_VISUALIZER' }
	| { type: 'SET_SELECTED_TAB'; payload: ProjectState['selectedTab'] }
