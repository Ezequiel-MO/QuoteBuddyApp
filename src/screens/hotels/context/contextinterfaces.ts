import { IHotel } from '@interfaces/hotel'

export interface HotelState {
	currentHotel: Partial<IHotel> | null
	update: boolean
}

export type HotelAction =
	| { type: 'SET_HOTEL'; payload: Partial<IHotel> }
	| { type: 'UPDATE_HOTEL_FIELD'; payload: { name: keyof IHotel; value: any } }
	| { type: 'UPDATE_HOTEL_TEXTCONTENT'; payload: string }
	| {
			type: 'UPDATE_HOTEL_COORDINATE'
			payload: { name: string; value: number }
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'ADD_DESCRIPTION'; payload: { key: string; value: string } }
	| { type: 'REMOVE_DESCRIPTION'; payload: { key: string } }
