import { IGift } from '@interfaces/gift'

export interface GiftState {
	gifts: IGift[]
	currentGift: Partial<IGift> | null
	update: boolean
	imagesModal: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type GiftAction =
	| {
			type: 'SET_GIFTS'
			payload: IGift[]
	  }
	| {
			type: 'SET_GIFT'
			payload: Partial<IGift>
	  }
	| {
			type: 'ADD_GIFT'
			payload: IGift
	  }
	| {
			type: 'UPDATE_GIFT_FIELD'
			payload: { name: keyof IGift; value: any }
	  }
	| {
			type: 'UPDATE_GIFT_TEXTCONTENT'
			payload: string
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'SET_IMAGES_MODAL_OPEN'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
	| {
			type: 'APPEND_TO_ARRAY_FIELD'
			payload: { name: keyof IGift; value: any }
	  }
