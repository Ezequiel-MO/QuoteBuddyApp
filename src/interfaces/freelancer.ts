export interface IFreelancer {
	_id: string
	firstName: string
	familyName: string
	email?: string
	phone?: string
	halfDayRate: number
	fullDayRate: number
	weekendHDRate: number
	weekendFDRate: number
	type: 'guide' | 'hostess' | 'travel-director' | 'account-manager'
	city: string
}
