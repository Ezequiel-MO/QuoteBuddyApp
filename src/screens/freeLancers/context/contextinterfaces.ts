import { IFreelancer } from '@interfaces/freelancer'

export interface FreelancerState {
	freelancers: IFreelancer[]
	currentFreelancer: Partial<IFreelancer> | null
	update: boolean
	totalPages: number
	page: number
	searchTerm: string
}

export type FreelancerAction =
	| {
			type: 'SET_FREELANCERS'
			payload: IFreelancer[]
	  }
	| {
			type: 'SET_FREELANCER'
			payload: Partial<IFreelancer>
	  }
	| {
			type: 'ADD_FREELANCER'
			payload: IFreelancer
	  }
	| {
			type: 'UPDATE_FREELANCER_FIELD'
			payload: { name: keyof IFreelancer; value: any }
	  }
	| { type: 'TOGGLE_UPDATE'; payload: boolean }
	| { type: 'SET_TOTAL_PAGES'; payload: number }
	| { type: 'SET_PAGE'; payload: number }
	| { type: 'SET_SEARCH_TERM'; payload: string }
