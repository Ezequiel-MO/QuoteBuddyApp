import { IEvent } from '@interfaces/event'

export interface ActivityState {
	activities: IEvent[]
	currentActivity: Partial<IEvent> | null
	update: boolean
	imagesModal: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type ActivityAction =
	| {
			type: 'SET_ACTIVITIES'
			payload: IEvent[]
	  }
	| {
			type: 'SET_ACTIVITY'
			payload: Partial<IEvent>
	  }
	| {
			type: 'ADD_ACTIVITY'
			payload: IEvent
	  }
	| {
			type: 'UPDATE_ACTIVITY_FIELD'
			payload: { name: keyof IEvent; value: any }
	  }
	| {
			type: 'UPDATE_ACTIVITY_TEXTCONTENT'
			payload: string
	  }
	| {
			type: 'UPDATE_ACTIVITY_COORDINATE'
			payload: { name: 'longitude' | 'latitude'; value: number }
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'ADD_DESCRIPTION'; payload?: undefined }
	| { type: 'REMOVE_DESCRIPTION'; payload: { index: number } }
	| {
			type: 'UPDATE_DESCRIPTION'
			payload: {
				index: number
				description: { languageCode?: string; value?: string }
			}
	  }
	| { type: 'SET_IMAGES_MODAL_OPEN'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
	| {
			type: 'APPEND_TO_ARRAY_FIELD'
			payload: { name: keyof IEvent; value: any }
	  }
