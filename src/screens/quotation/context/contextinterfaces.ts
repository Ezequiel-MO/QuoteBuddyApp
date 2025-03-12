import { IDay, IProject } from '@interfaces/project'
import { ReactNode } from 'react'

// Define more specific types for the processed data
export interface DayWithDate {
	day: string
	date: string
}

export interface ProcessedEvent {
	name: string
	id: string
	type: 'event' | 'meeting' | 'restaurant' | 'fullDayMeeting'
}

export interface DayEvents {
	morning: ProcessedEvent[]
	lunch: ProcessedEvent[]
	afternoon: ProcessedEvent[]
	dinner: ProcessedEvent[]
}

export interface ProcessedDay extends Omit<IDay, 'fullDayMeetings'> {
	dayIndex: number
	formattedDate: string
	events: DayEvents
	hasFullDay: boolean
	fullDayMeetings: ProcessedEvent[] | null
	hasMorningContent: boolean
	hasLunchContent: boolean
	hasAfternoonContent: boolean
	hasDinnerContent: boolean
}

export interface ActiveDay {
	dayIndex: number
	timeOfDay: 'morning' | 'lunch' | 'afternoon' | 'dinner'
}

export interface SectionRef {
	[key: string]: HTMLElement | null
}

export interface ExpandedSections {
	days: boolean
	hotels: boolean
	budget: boolean
}

export interface ExpandedDays {
	[key: number]: boolean
}

export interface QuotationState {
	isSidebarOpen: boolean
	isOverviewExpanded: boolean
	expandedSections: ExpandedSections
	expandedDays: ExpandedDays
	activeSection: string
	activeDay: ActiveDay | null
	scheduleDays: ProcessedDay[]
	daysWithDates: DayWithDate[]
	sectionRefs: SectionRef
}

export type QuotationAction =
	| { type: 'TOGGLE_SIDEBAR'; payload?: boolean }
	| { type: 'TOGGLE_OVERVIEW'; payload?: boolean }
	| { type: 'TOGGLE_SECTION'; payload: keyof ExpandedSections }
	| { type: 'TOGGLE_DAY'; payload: number }
	| { type: 'SET_ACTIVE_SECTION'; payload: string }
	| { type: 'SET_ACTIVE_DAY'; payload: ActiveDay }
	| {
			type: 'REGISTER_SECTION_REF'
			payload: { id: string; ref: HTMLElement | null }
	  }
	| {
			type: 'PROCESS_SCHEDULE_DATA'
			payload: { scheduleDays: ProcessedDay[]; daysWithDates: DayWithDate[] }
	  }
	| { type: 'INITIALIZE_EXPANDED_DAYS'; payload: ExpandedDays }

export interface QuotationContextProps extends QuotationState {
	// Action creators
	toggleSidebar: (value?: boolean) => void
	toggleOverview: (value?: boolean) => void
	toggleSection: (section: keyof ExpandedSections) => void
	toggleDay: (dayIndex: number) => void
	setActiveSection: (id: string) => void

	// Navigation functions
	scrollToSection: (sectionId: string) => void
	scrollToDay: (
		dayIndex: number,
		timeOfDay: 'morning' | 'lunch' | 'afternoon' | 'dinner'
	) => void
	registerSectionRef: (id: string, ref: HTMLElement | null) => void

	// Project data
	currentProject: IProject
}

export interface QuotationProviderProps {
	children: ReactNode
}
