import { IEntertainment } from '@interfaces/entertainment'
import { IRestaurant } from '@interfaces/restaurant'

export interface EntertainmentState {
	entertainments: IEntertainment[]
	currentEntertainment: Partial<IEntertainment> | null
	update: boolean
	imagesModal: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type EntertainmentAction =
	| {
			type: 'SET_ENTERTAINMENTS'
			payload: IEntertainment[]
	  }
	| {
			type: 'SET_ENTERTAINMENT'
			payload: Partial<IEntertainment>
	  }
	| {
			type: 'ADD_ENTERTAINMENT'
			payload: IEntertainment
	  }
	| {
			type: 'UPDATE_ENTERTAINMENT_FIELD'
			payload: { name: keyof IEntertainment; value: any }
	  }
	| {
			type: 'UPDATE_ENTERTAINMENT_TEXTCONTENT'
			payload: string
	  }
	| { type: 'UPDATE_IS_VENUE'; payload: boolean }
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
			payload: { name: keyof IRestaurant; value: any }
	  }
