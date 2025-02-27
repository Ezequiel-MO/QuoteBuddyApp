import { IEntertainment } from './entertainment'
import { ILanguageDescription } from './languageDescription'
import { ITransfer } from './transfer'
import { IImage } from './image'

export interface IVenuePrice {
	rental?: number
	cocktail_units?: number
	cocktail_price?: number
	catering_units?: number
	catering_price?: number
	staff_units?: number
	staff_menu_price?: number
	audiovisuals?: number
	cleaning?: number
	security?: number
	entertainment?: number
	notes?: string
}

export interface IRestaurant {
	_id: string
	name: string
	city: string
	textContent?: string
	imageContentUrl?: string[]
	pdfMenus?: string[]
	price?: number
	location: {
		type: string
		coordinates: number[]
	}
	introduction?: string[]
	isVenue: boolean
	entertainment?: IEntertainment[]
	venue_price?: IVenuePrice
	transfer?: ITransfer[]
	availableLanguages: string[]
	descriptions: ILanguageDescription[]
	maxCapacity?: number
	participants?: number
	updatedAt?: string
	imageUrlCaptions: IImage[]
}
