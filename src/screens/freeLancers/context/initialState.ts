import * as typescript from './contextinterfaces'

const initialState: typescript.FreelancerState = {
	freelancers: [],
	currentFreelancer: {
		firstName: '',
		familyName: '',
		email: '',
		phone: '',
		halfDayRate: 0,
		fullDayRate: 0,
		weekendHDRate: 0,
		weekendFDRate: 0,
		type: ''
	},
	update: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
