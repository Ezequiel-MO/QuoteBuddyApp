import { IProject } from '@interfaces/project'

export interface QuotationState {
	quotations: IProject[]
	currentQuotation: Partial<IProject> | null
	update: boolean
	isBudgetVisualizerOpen: boolean
	openDrawerSections: { [key: string]: { [key: number]: boolean } }
}

export type QuotationAction =
	| { type: 'SET_QUOTATION'; payload: IProject }
	| {
			type: 'UPDATE_QUOTATION_FIELD'
			payload: { name: keyof IProject; value: any }
	  }
	| { type: 'TOGGLE_BUDGET_VISUALIZER' }
	| { type: 'TOGGLE_DRAWER_SECTION'; day: string; index: number }
