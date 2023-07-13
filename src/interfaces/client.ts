export interface IClient {
	firstName: string
	familyName: string
	email: string
	phone?: string
	country?: string
	quoteLanguage:
		| 'EN'
		| 'FR'
		| 'IT'
		| 'ES'
		| 'DE'
		| 'NL'
		| 'BE'
		| 'RO'
		| 'DK'
		| 'SE'
	clientCompany?: string
}
