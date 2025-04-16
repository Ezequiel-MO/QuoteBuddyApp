import * as typescript from './contextinterfaces'

const initialState: typescript.PlannerState = {
	sidebarVisible: false,
	modalOpen: false,
	searchTerm: '',
	activeItem: null,
	displayItems: [],
	filteredItems: []
}

export default initialState
