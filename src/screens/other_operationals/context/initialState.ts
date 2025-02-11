import * as typescript from './contextinterfaces'

const initialState: typescript.OtherOperationalState = {
	otherOperationals: [],
	currentOtherOperational: {
		name: '',
		city: '',
		textContent: '',
		suppliers: []
	},
	update: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
