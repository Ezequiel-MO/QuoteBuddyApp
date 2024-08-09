export interface QuotationState {
	isBudgetVisualizerOpen: boolean
	openDrawerSections: { [key: string]: { [key: number]: boolean } }
}

export type QuotationAction =
	| { type: 'TOGGLE_BUDGET_VISUALIZER' }
	| { type: 'TOGGLE_DRAWER_SECTION'; day: string; index: number }
