export interface QuotationState {
	isSidebarOpen: boolean
	isOverviewExpanded: boolean
}

export type QuotationAction =
	| { type: 'TOGGLE_SIDEBAR'; payload?: boolean }
	| { type: 'TOGGLE_OVERVIEW'; payload?: boolean }
