type EntertainmentCategory =
	| 'MOC'
	| 'Dance'
	| 'Music'
	| 'Magician'
	| 'DJ'
	| 'PhotoBooth'
	| 'Other'

export interface IEntertainmentPrice {
	artistsFee: number
	aavv: number
	lighting?: number
	travelAllowance: number
	mealAllowance: number
	other?: number
}

export interface IEntertainment {
	_id?: string
	vendor: string
	city: string
	name: string
	contact: string
	email: string
	category: EntertainmentCategory
	duration: string
	nrArtists?: string
	textContent?: string
	price?: IEntertainmentPrice[]
	imageContentUrl?: string[]
	updatedAt?: string
	[key: string]: any
}
