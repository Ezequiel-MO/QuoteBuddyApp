interface IHotelPrice {
	DUInr: number
	DUIprice: number
	DoubleRoomNr: number
	DoubleRoomPrice: number
	breakfast: number
	DailyTax: number
}

export interface IHotel {
	_id: string
	name: string
	city: string
	address: string
	numberStars: number
	numberRooms: number
	checkin_out: string
	meetingRooms: string
	wheelChairAccessible: boolean
	wifiSpeed: string
	swimmingPool: string
	restaurants: string
	textContent: string
	imageContentUrl: string[]
	meetingImageContentUrl: string[]
	location: {
		type: string
		coordinates: number[]
		address: string
		description: string
	}
	introduction: string[]
	price: IHotelPrice[]
}
