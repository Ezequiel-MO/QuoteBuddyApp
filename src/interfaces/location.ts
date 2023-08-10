interface IInfigure {
	title: string
	description: string
}

interface ICorporateFact {
	title: string
	description: string
}

export interface ILocation {
	name: string
	location: {
		type: 'Point'
		coordinates: number[]
		address: string
		description: string
	}
	textContent: string
	inFigures: IInfigure[]
	corporateFacts: ICorporateFact[]
	imageContentUrl: string[]

	setImgUrl(files: { location: string }[]): void
}
