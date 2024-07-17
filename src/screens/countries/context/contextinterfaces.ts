import { ICountry } from '@interfaces/country'

export interface CountryState {
	countries: ICountry[]
	currentCountry: Partial<ICountry> | null
	update: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type CountryAction =
	| { type: 'SET_COUNTRIES'; payload: ICountry[] }
	| { type: 'SET_COUNTRY'; payload: Partial<ICountry> }
	| { type: 'ADD_COUNTRY'; payload: ICountry }
	| {
			type: 'UPDATE_COUNTRY_FIELD'
			payload: { name: keyof ICountry; value: any }
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
