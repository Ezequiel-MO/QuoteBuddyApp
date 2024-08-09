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

export type ACOMMODATION = {
	name: string
	price: HotelPrice[]
}

export type DaySchedule = {
	ACCOMMODATION?: ACOMMODATION[]
	'MORNING ACTIVITY': Activity[]
	LUNCH: Activity[]
	'AFTERNOON ACTIVITY': Activity[]
	DINNER: Activity[]
}

export const DAYS = ['Arrival Day', 'Day 1', 'Day 2', 'Departure Day']

export const DAY1: DaySchedule = {
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
	DINNER: [{ name: 'Restaurant D', nrPax: 3, price: 25, total: 75 }]
}

export const DAY3: DaySchedule = {
	'MORNING ACTIVITY': [{ name: 'Shopping', nrPax: 3, price: 5, total: 15 }],
	LUNCH: [{ name: 'Restaurant E', nrPax: 3, price: 14, total: 42 }],
	'AFTERNOON ACTIVITY': [
		{ name: 'Sightseeing', nrPax: 3, price: 5, total: 15 }
	],
	DINNER: [{ name: 'Restaurant F', nrPax: 3, price: 30, total: 90 }]
}

export const SCHEDULE: DaySchedule[] = [DAY1, DAY2, DAY3]
