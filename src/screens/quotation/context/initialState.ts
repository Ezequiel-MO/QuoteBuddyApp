import * as typescript from './contextinterfaces'

export const initialState: typescript.QuotationState = {
	// UI State
	isSidebarOpen: true,
	isOverviewExpanded: true,
	expandedSections: {
		days: true,
		hotels: true,
		budget: true
	},
	expandedDays: {},
	activeSection: 'overview',
	activeDay: null,

	// Processed Data
	scheduleDays: [],
	daysWithDates: [],

	// References
	sectionRefs: {}
}
