export interface ICountry {
	_id: string
	name: string
	accessCode?: string
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
	isDeleted: boolean
	deletedAt: string
}
