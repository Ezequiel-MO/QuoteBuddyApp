interface IInfigure {
	title: string
	description: string
}

interface ICorporateFact {
	title: string
	description: string
}

export interface ILocation {
	_id?: string
	name: string
	location: {
		type: 'Point'
		coordinates: number[]
		address: string
		description: string
	}
	country: string
	textContent: string
	inFigures: IInfigure[]
	corporateFacts: ICorporateFact[]
	imageContentUrl: string[]
}
