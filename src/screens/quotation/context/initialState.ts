// src/screens/quotation/context/initialState.ts
import * as typescript from './contextinterfaces'

export const initialState: typescript.QuotationState = {
	// UI State
	isSidebarOpen: true,
	isOverviewExpanded: true,
	expandedSections: {
		days: true,
		hotels: true,
		budget: true,
		map: true
	},
	expandedDays: {},
	activeSection: 'overview',
	activeDay: null,

	// Processed Data
	scheduleDays: [],
	daysWithDates: [],

	// References
	sectionRefs: {},

	// Map related state
	isMapVisible: false,
	selectedVendor: null,

	// View mode
	viewMode: 'cards'
}
