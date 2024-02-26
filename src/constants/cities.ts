export type CitiesType =
	| 'Barcelona'
	| 'Malaga'
	| 'Paris'
	| 'Bilbao'
	| 'Valencia'
	| 'Madrid'
	| 'Gran Canaria'
	| 'San Sebastian'

export const cities: CitiesType[] = [
	'Barcelona',
	'Malaga',
	'Paris',
	'Bilbao',
	'Valencia',
	'Madrid',
	'Gran Canaria',
	'San Sebastian'
]

export interface IMapLocations {
	[key: string]: [number, number]
}

export const locations: IMapLocations = {
	Barcelona: [41.385331792, 2.168665992],
	Madrid: [40.4167754, -3.7037902],
	Valencia: [39.4699075, -0.3762881],
	Sevilla: [37.3890924, -5.9844589],
	'Costa Brava': [41.992046, 3.156307],
	Andorra: [42.506285, 1.521801],
	Lisboa: [38.7222524, -9.1393366],
	Bilbao: [43.2630136, -2.9349852],
	Mallorca: [39.695263, 3.017571],
	Alicante: [38.345996, -0.490685],
	Paris: [48.8566969, 2.3514616],
	'Gran Canaria': [27.9202209, -15.5474374],
	'San Sebastian': [43.318334, -1.981231]
}
