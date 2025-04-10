import { IFreelancer } from '@interfaces/freelancer'

export interface IService {
	typeOfAssistance: string
	freelancer: IFreelancer
}

export type typeTransfer = 'in' | 'out' | 'event' | 'restaurant'
