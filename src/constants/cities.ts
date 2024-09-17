export const cities = [
	'Barcelona',
	'Malaga',
	'Paris',
	'Bilbao',
	'Valencia',
	'Madrid',
	'Gran Canaria',
	'San Sebastian',
	'Cadiz',
	'Alicante',
	'Andorra',
	'Ibiza',
	'Lisboa',
	'Roma',
	'Sevilla',
	'Costa Brava',
	'Mallorca'
] as const

type City = (typeof cities)[number]

export interface IMapLocations
	extends Partial<Record<City, [number, number]>> {}

export const locations: IMapLocations = {
	Alicante: [38.345996, -0.490685],
	Andorra: [42.506285, 1.521801],
	Barcelona: [41.385331792, 2.168665992],
	Bilbao: [43.2630136, -2.9349852],
	Ibiza: [38.90883, 1.43296],
	Madrid: [40.4167754, -3.7037902],
	Malaga: [36.721261, -4.4212655],
	Lisboa: [38.7222524, -9.1393366],
	Paris: [48.8566969, 2.3514616],
	Roma: [41.89193, 12.51133],
	Sevilla: [37.3890924, -5.9844589],
	Valencia: [39.4699075, -0.3762881],
	'Costa Brava': [41.992046, 3.156307],
	Mallorca: [39.695263, 3.017571],
	'Gran Canaria': [27.9202209, -15.5474374],
	'San Sebastian': [43.318334, -1.981231],
	Cadiz: [36.529942, -6.292409]
}
