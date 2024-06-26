import { ILanguageDescription } from './languageDescription'
import { ITransfer } from './transfer'

export interface IEvent {
	_id: string
	name: string
	city?: string
	textContent?: string
	imageContentUrl?: string[]
	pricePerPerson?: boolean
	coordsActive?: boolean
	price?: number
	regular?: boolean
	location: {
		type: string
		coordinates: number[]
	}
	introduction?: string[]
	transfer?: ITransfer[]
	availableLanguages: string[]
	descriptions: ILanguageDescription[]
	participants?: number
	updatedAt?: string
}
