import * as typescript from './contextinterfaces'

const initialState: typescript.ProjectState = {
	projects: [],
	currentProject: {
		code: '',
		accountManager: [],
		groupName: '',
		groupLocation: '',
		arrivalDay: '',
		departureDay: '',
		nrPax: 0,
		projectIntro: [],
		suplementaryText: false,
		hotels: [],
		status: 'Received',
		estimate: 0,
		budget: 'budget',
		imageContentUrl: [],
		hasSideMenu: false,
		multiDestination: false,
		hideDates: false,
		hasExternalCorporateImage: false,
		clientAccManager: [],
		clientCompany: [],
		schedule: [],
		gifts: [],
		languageVendorDescriptions: '',
		invoices: [],
		collectionsFromClient: []
	},
	update: false,
	isBudgetVisualizerOpen: false,
	totalPages: 1,
	page: 1,
	searchTerm: '',
	selectedTab: 'Intro Text/Gifts'
}

export default initialState
