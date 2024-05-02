import { IClient } from './client'

export interface IClientCompany {
	_id?: string
	name: string
	imageContentUrl: string[]
	colorPalette: string[]
	fonts: string[]
	address: string
	postCode?: string
	VATNr?: string
	employees: IClient[]
	country: string
}
