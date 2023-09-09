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
	[key: string]: any //this was added to make the interface compatible with yup. It is not a good solution.
}
