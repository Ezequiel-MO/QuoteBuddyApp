import { ITransfer } from './transfer'

export interface IEvent {
	name: string
	city: string
	textContent: string
	imageContentUrl: string[]
	pricePerPerson: boolean
	price: number
	location: {
		type: string
		coordinates: number[]
		address: string
		description: string
	}
	introduction: string[]
	transfer: ITransfer[]
	setImgUrl(files: any[]): void
}
