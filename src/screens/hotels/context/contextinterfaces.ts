import { IHotel } from '@interfaces/hotel'

export interface HotelState {
	hotels: IHotel[] | null
	currentHotel: Partial<IHotel> | null
	update: boolean
	imagesModal: boolean
	totalPages: number
	page: number
}

export type HotelAction =
	| { type: 'SET_HOTELS'; payload: IHotel[] }
	| { type: 'SET_HOTEL'; payload: Partial<IHotel> }
	| { type: 'UPDATE_HOTEL_FIELD'; payload: { name: keyof IHotel; value: any } }
	| { type: 'UPDATE_HOTEL_TEXTCONTENT'; payload: string }
	| {
			type: 'UPDATE_HOTEL_COORDINATE'
			payload: { name: string; value: number }
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
