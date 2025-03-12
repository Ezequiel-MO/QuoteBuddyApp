export interface QuotationState {
	// UI State
	isSidebarOpen: boolean
	isOverviewExpanded: boolean

	// Navigation state
	activeSection: string | null
	previousSection: string | null
	sectionProgress: { [key: string]: number } // 0-100% scrolled through section

	// User interactions
	selectedLocation: string | null
	expandedSections: { [key: string]: boolean }
	visitedSections: string[]

	// View preferences
	preferredView: 'compact' | 'detailed'
	showImages: boolean
	animationsEnabled: boolean
}

export type QuotationAction =
	| { type: 'TOGGLE_SIDEBAR'; payload?: boolean }
	| { type: 'TOGGLE_OVERVIEW'; payload?: boolean }
	| { type: 'SET_ACTIVE_SECTION'; payload: string }
	| { type: 'TOGGLE_SECTION'; payload: string }
	| { type: 'MARK_SECTION_VISITED'; payload: string }
	| {
			type: 'SET_SECTION_PROGRESS'
			payload: { section: string; progress: number }
	  }
	| { type: 'SET_SELECTED_LOCATION'; payload: string | null }
	| { type: 'SET_VIEW_PREFERENCE'; payload: 'compact' | 'detailed' }
	| { type: 'TOGGLE_IMAGES'; payload?: boolean }
	| { type: 'TOGGLE_ANIMATIONS'; payload?: boolean }
