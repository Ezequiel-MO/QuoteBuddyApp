import { ILocation } from '@interfaces/location'

export interface LocationState {
	locations: ILocation[]
	currentLocation: Partial<ILocation> | null
	update: boolean
	imagesModal: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type LocationAction =
	| {
			type: 'SET_LOCATIONS'
			payload: ILocation[]
	  }
	| {
			type: 'SET_LOCATION'
			payload: Partial<ILocation>
	  }
	| {
			type: 'ADD_LOCATION'
			payload: ILocation
	  }
	| {
			type: 'UPDATE_LOCATION_FIELD'
			payload: { name: keyof ILocation; value: any }
	  }
	| {
			type: 'UPDATE_LOCATION_TEXTCONTENT'
			payload: string
	  }
	| {
			type: 'UPDATE_LOCATION_COORDINATE'
			payload: { name: 'longitude' | 'latitude'; value: number }
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'SET_IMAGES_MODAL_OPEN'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
	| {
			type: 'APPEND_TO_ARRAY_FIELD'
			payload: { name: keyof ILocation; value: any }
	  }
