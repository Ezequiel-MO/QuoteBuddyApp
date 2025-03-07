import { IProject } from '@interfaces/project'

export interface ProjectState {
	projects: IProject[]
	currentProject: Partial<IProject> | null
	update: boolean
	imagesModal: boolean
	isMeetingsModalOpen: boolean
	isBudgetVisualizerOpen: boolean
	totalPages: number
	page: number
	searchTerm: string
	groupLocation: string
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
	| { type: 'SET_PROJECTS'; payload: IProject[] }
	| { type: 'SET_PROJECT'; payload: Partial<IProject> }
	| {
			type: 'UPDATE_PROJECT_FIELD'
			payload: { name: keyof IProject; value: any }
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'SET_SELECTED_TAB'; payload: ProjectState['selectedTab'] }
	| { type: 'CLEAR_SCHEDULE' }
	| { type: 'SET_IMAGES_MODAL_OPEN'; payload: boolean }
	| { type: 'SET_MEETINGS_MODAL_OPEN'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
	| { type: 'SET_GROUP_LOCATION'; payload: string }
	| { type: 'TOGGLE_BUDGET_VISUALIZER' }
	| {
			type: 'APPEND_TO_ARRAY_FIELD'
			payload: { name: keyof IProject; value: any }
	  }
