import { IAudiovisual, IAudiovisualEquipment } from '@interfaces/audiovisual'

export interface AudiovisualState {
	audiovisuals: IAudiovisual[]
	currentAudiovisual: Partial<IAudiovisual> | null
	update: boolean
	imagesModal: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type AudiovisualAction =
	| {
			type: 'SET_AUDIOVISUALS'
			payload: IAudiovisual[]
	  }
	| {
			type: 'SET_AUDIOVISUAL'
			payload: Partial<IAudiovisual>
	  }
	| {
			type: 'ADD_AUDIOVISUAL'
			payload: IAudiovisual
	  }
	| {
			type: 'UPDATE_AUDIOVISUAL_FIELD'
			payload: { name: keyof IAudiovisual; value: any }
	  }
	| {
			type: 'UPDATE_AUDIOVISUAL_TEXTCONTENT'
			payload: string
	  }
	| {
			type: 'UPDATE_AUDIOVISUAL_COORDINATE'
			payload: { name: 'longitude' | 'latitude'; value: number }
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'SET_IMAGES_MODAL_OPEN'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
	| {
			type: 'UPDATE_EQUIPMENT_ITEM_FIELD'
			payload: {
				index: number
				field: keyof IAudiovisualEquipment
				value: string | number
			}
	  }
	| {
			type: 'REMOVE_EQUIPMENT_ITEM'
			payload: {
				index: number
			}
	  }
