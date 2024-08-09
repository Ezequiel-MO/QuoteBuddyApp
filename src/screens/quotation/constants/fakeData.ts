export type Activity = {
	name: string
	nrPax: number
	price: number
	total: number
}

interface HotelPrice {
	DUInr: number
	DUIprice: number
	DoubleRoomNr: number
	DoubleRoomPrice: number
	breakfast: number
	DailyTax: number
}

export type MEETING = {
	hotelName: string
	roomCapacity: number
	HDRate: number
	FDRate: number
	HDDDR: number
	FDDDR: number
	coffeeBreakUnits: number
	coffeeBreakPrice: number
	workingLunchUnits: number
	workingLunchPrice: number
	aavvPackage: number
	hotelDinnerUnits: number
	hotelDinnerPrice: number
}

export type ACOMMODATION = {
	name: string
	price: HotelPrice[]
}

export type TRANSFER = {
	transfer_in?: number
	transfer_out?: number
	selectedService?: string
	vehicleCapacity?: number
	vehicleType?: string
	vehiclePrice: number
	meetGreet: number
	meetGreetCost: number
	assistance: number
	assistanceCost: number
}

export type DaySchedule = {
	'TRANSFER IN'?: TRANSFER[]
	ACCOMMODATION?: ACOMMODATION[]
	'MORNING ACTIVITY'?: Activity[]
	'MORNING MEETING'?: MEETING[]
	LUNCH?: Activity[]
	'AFTERNOON ACTIVITY'?: Activity[]
	'AFTERNOON MEETING'?: MEETING[]
	'FULLDAY MEETING'?: MEETING[]
	DINNER?: Activity[]
	OVERNIGHT?: ACOMMODATION[]
	'TRANSFER OUT'?: TRANSFER[]
}

export const DAYS = ['Arrival Day', 'Day 1', 'Day 2', 'Departure Day']

export const DAY1: DaySchedule = {
	'TRANSFER IN': [
		{
			transfer_in: 10,
			selectedService: 'transfer_in',
			vehicleCapacity: 10,
			vehicleType: 'Bus',
			vehiclePrice: 100,
			meetGreet: 10,
			meetGreetCost: 50,
			assistance: 10,
			assistanceCost: 50
		}
	],
	ACCOMMODATION: [
		{
			name: 'Hotel A',
			price: [
				{
					DUInr: 10,
					DUIprice: 100,
					DoubleRoomNr: 1,
					DoubleRoomPrice: 150,
					breakfast: 10,
					DailyTax: 5
				}
			]
		},
		{
			name: 'Hotel B',
			price: [
				{
					DUInr: 12,
					DUIprice: 120,
					DoubleRoomNr: 1,
					DoubleRoomPrice: 160,
					breakfast: 15,
					DailyTax: 5
				}
			]
		}
	],

	'MORNING ACTIVITY': [
		{ name: 'City Tour A', nrPax: 3, price: 20, total: 60 },
		{ name: 'City Tour B', nrPax: 3, price: 10, total: 30 }
	],
	'MORNING MEETING': [
		{
			hotelName: 'Hotel A',
			roomCapacity: 10,
			HDRate: 100,
			FDRate: 150,
			HDDDR: 10,
			FDDDR: 15,
			coffeeBreakUnits: 2,
			coffeeBreakPrice: 5,
			workingLunchUnits: 2,
			workingLunchPrice: 10,
			aavvPackage: 20,
			hotelDinnerUnits: 2,
			hotelDinnerPrice: 20
		},
		{
			hotelName: 'Hotel B',
			roomCapacity: 12,
			HDRate: 120,
			FDRate: 160,
			HDDDR: 15,
			FDDDR: 20,
			coffeeBreakUnits: 2,
			coffeeBreakPrice: 5,
			workingLunchUnits: 2,
			workingLunchPrice: 10,
			aavvPackage: 20,
			hotelDinnerUnits: 2,
			hotelDinnerPrice: 20
		}
	],
	LUNCH: [
		{ name: 'Restaurant A', nrPax: 3, price: 16, total: 48 },
		{ name: 'Restaurant A', nrPax: 3, price: 16, total: 48 }
	],
	'AFTERNOON ACTIVITY': [
		{ name: 'Museum', nrPax: 3, price: 5, total: 15 },
		{ name: 'City Tour', nrPax: 3, price: 10, total: 30 }
	],
	DINNER: [{ name: 'Restaurant B', nrPax: 3, price: 20, total: 60 }]
}

export const DAY2: DaySchedule = {
	'MORNING ACTIVITY': [{ name: 'Beach', nrPax: 3, price: 5, total: 15 }],
	LUNCH: [{ name: 'Restaurant C', nrPax: 3, price: 12, total: 36 }],
	'AFTERNOON ACTIVITY': [{ name: 'Hiking', nrPax: 3, price: 5, total: 15 }],
	DINNER: [{ name: 'Restaurant D', nrPax: 3, price: 25, total: 75 }],

	'FULLDAY MEETING': [
		{
			hotelName: 'Hotel C',
			roomCapacity: 10,
			HDRate: 100,
			FDRate: 150,
			HDDDR: 10,
			FDDDR: 15,
			coffeeBreakUnits: 2,
			coffeeBreakPrice: 5,
			workingLunchUnits: 2,
			workingLunchPrice: 10,
			aavvPackage: 20,
			hotelDinnerUnits: 2,
			hotelDinnerPrice: 20
		}
	]
}

export const DAY3: DaySchedule = {
	'MORNING ACTIVITY': [{ name: 'Shopping', nrPax: 3, price: 5, total: 15 }],
	LUNCH: [{ name: 'Restaurant E', nrPax: 3, price: 14, total: 42 }],
	'AFTERNOON ACTIVITY': [
		{ name: 'Sightseeing', nrPax: 3, price: 5, total: 15 }
	],
	DINNER: [{ name: 'Restaurant F', nrPax: 3, price: 30, total: 90 }],
	OVERNIGHT: [
		{
			name: 'Hotel C',
			price: [
				{
					DUInr: 10,
					DUIprice: 100,
					DoubleRoomNr: 1,
					DoubleRoomPrice: 150,
					breakfast: 10,
					DailyTax: 5
				}
			]
		}
	],
	'TRANSFER OUT': [
		{
			transfer_out: 21,
			selectedService: 'transfer_out',
			vehicleCapacity: 10,
			vehicleType: 'Bus',
			vehiclePrice: 100,
			meetGreet: 10,
			meetGreetCost: 50,
			assistance: 10,
			assistanceCost: 50
		}
	]
}

export const SCHEDULE: DaySchedule[] = [DAY1, DAY2, DAY3]
