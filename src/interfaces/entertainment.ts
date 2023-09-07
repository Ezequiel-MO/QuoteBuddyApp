type EntertainmentCategory =
	| 'MOC'
	| 'Dance'
	| 'Music'
	| 'Magician'
	| 'DJ'
	| 'PhotoBooth'
	| 'Other'

interface IEntertainmentPrice {
	artistsFee: number
	aavv: number
	lighting?: number
	travelAllowance: number
	mealAllowance: number
	other?: number
}

export interface IEntertainment {
	_id: string
	vendor: string
	city: string
	name: string
	contact: string
	email: string
	category: EntertainmentCategory
	duration: number
	nrArtists?: number
	textContent: string
	price: IEntertainmentPrice[]
	imageContentUrl: string[]
	updatedAt: string
	setImgUrl(files: { location: string }[]): void
}
