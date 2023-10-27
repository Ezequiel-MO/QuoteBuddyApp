import { IEntertainment } from './entertainment'
import { ITransfer } from './transfer'

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
}

export interface IRestaurant {
	_id: string
	name: string
	city?: string
	textContent?: string
	imageContentUrl?: string[]
	pdfMenus?: string[]
	price?: number
	location?: {
		type: string
		coordinates?: number[]
		address?: string
		description?: string
	}
	introduction?: string[]
	isVenue?: boolean
	entertainment?: IEntertainment[]
	venue_price?: IVenuePrice
	transfer?: ITransfer[]
	updatedAt?: string
}
