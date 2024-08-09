import { IProject } from '@interfaces/project'

export interface QuotationState {
	currentProject: IProject | null
	isBudgetVisualizerOpen: boolean
	openDrawerSections: { [key: string]: { [key: number]: boolean } }
}

export type QuotationAction =
	| { type: 'SET_PROJECT'; payload: IProject }
	| { type: 'TOGGLE_BUDGET_VISUALIZER' }
	| { type: 'TOGGLE_DRAWER_SECTION'; day: string; index: number }
