import * as typescript from './contextinterfaces'

const initialState: typescript.NotificationState = {
	notifications: [],
	currentNotification: {
		title: '',
		textContent: '',
		module: 'General',
		accManagers: []
	},
	update: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
