import { INotification } from '@interfaces/notification'

export interface NotificationState {
	notifications: INotification[]
	currentNotification: Partial<INotification> | null
	update: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type NotificationAction =
	| {
			type: 'SET_NOTIFICATIONS'
			payload: INotification[]
	  }
	| {
			type: 'SET_NOTIFICATION'
			payload: Partial<INotification>
	  }
	| {
			type: 'ADD_NOTIFICATION'
			payload: INotification
	  }
	| {
			type: 'UPDATE_NOTIFICATION_FIELD'
			payload: { name: keyof INotification; value: any }
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
