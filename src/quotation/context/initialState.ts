import { QuotationState } from './contextInterfaces'

export const initialState: QuotationState = {
	// UI State
	isSidebarOpen: true,
	isOverviewExpanded: true,

	// Navigation state
	activeSection: null,
	previousSection: null,
	sectionProgress: {},

	// User interactions
	selectedLocation: null,
	expandedSections: {
		hotels: true,
		schedule: true,
		budget: true,
		destination: true
	},
	visitedSections: [],

	// View preferences
	preferredView: 'detailed',
	showImages: true,
	animationsEnabled: true
}
