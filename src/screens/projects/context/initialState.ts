import * as typescript from './contextinterfaces'

const initialState: typescript.ProjectState = {
	projects: [],
	currentProject: null,
	update: false,
	isBudgetVisualizerOpen: false,
	totalPages: 1,
	page: 1,
	searchTerm: '',
	selectedTab: 'Intro Text/Gifts'
}

export default initialState
