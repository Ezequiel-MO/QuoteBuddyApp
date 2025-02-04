interface IClientOrigin {
	method:
		| 'Recommendation'
		| 'ClientChangedCompany'
		| 'Tradeshow'
		| 'ColdCall'
		| 'TourismPatronat'
		| 'Other'
	textContent?: string
}

interface IClientQualification {
	status:
		| 'NeverRequested'
		| 'RequestedButNotProceeded'
		| 'Proceeded'
		| 'RegularClient'
		| 'LostClient'
	textContent?: string
}

export interface IClientNote {
	date: Date
	type: 'Feedback' | 'Incident' | 'Complaint' | 'Other'
	textContent: string
}

export interface IClient {
	_id?: string
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
	origin: IClientOrigin
	qualification: IClientQualification
	clientNotes?: IClientNote[]
}
