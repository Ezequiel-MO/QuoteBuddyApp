import { IRestaurant } from '@interfaces/restaurant'
export interface RestaurantState {
	restaurants: IRestaurant[]
	currentRestaurant: Partial<IRestaurant> | null
	update: boolean
	imagesModal: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type RestaurantAction =
	| {
			type: 'SET_RESTAURANTS'
			payload: IRestaurant[]
	  }
	| {
			type: 'SET_RESTAURANT'
			payload: Partial<IRestaurant>
	  }
	| {
			type: 'ADD_RESTAURANT'
			payload: IRestaurant
	  }
	| {
			type: 'UPDATE_RESTAURANT_FIELD'
			payload: { name: keyof IRestaurant; value: any }
	  }
	| {
			type: 'UPDATE_RESTAURANT_TEXTCONTENT'
			payload: string
	  }
	| {
			type: 'UPDATE_RESTAURANT_COORDINATE'
			payload: { name: 'longitude' | 'latitude'; value: number }
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
