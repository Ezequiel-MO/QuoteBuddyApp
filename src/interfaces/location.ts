interface IInfigure {
	title: string
	description: string
}

interface ICorporateFact {
	title: string
	description: string
}

export interface ILocation {
	_id: string
	name: string
	country: string
	textContent: string
	location: {
		type: 'Point'
		coordinates: number[]
	}
	inFigures: IInfigure[]
	corporateFacts: ICorporateFact[]
	imageContentUrl: string[]
	isDeleted: boolean
	deletedAt: string
}
