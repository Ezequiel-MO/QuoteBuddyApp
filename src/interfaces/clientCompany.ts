import { IClient } from './client'

export interface IClientCompany {
	_id: string
	name: string
	address: string
	postCode?: string
	VATNr?: string
	colorPalette: string[]
	fonts: string[]
	employees: IClient[]
	country: string
}
