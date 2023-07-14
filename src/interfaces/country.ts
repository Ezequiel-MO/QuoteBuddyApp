export interface ICountry {
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
	_id?: string
}
