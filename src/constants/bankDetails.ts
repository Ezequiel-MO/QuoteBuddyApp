export type BankDetail = {
	BANK_NAME: string
	ADDRESS: string
	ACCOUNT_NUMBER: string
	IBAN: string
	SWIFT: string
}

type BankDetailsType = {
	DB_BANK_DETAILS: BankDetail
	BBVA_BANK_DETAILS: BankDetail
}

export const BANK_DETAILS: BankDetailsType = {
	DB_BANK_DETAILS: {
		BANK_NAME: 'DEUTSCHE BANK',
		ADDRESS: 'Quatre Cantons 1, St. Cugat del Vallès',
		ACCOUNT_NUMBER: '0019 0066 52 4010037723',
		IBAN: 'ES90 0019 0066 52 4010037723',
		SWIFT: 'DEUTESBBXXX'
	},
	BBVA_BANK_DETAILS: {
		BANK_NAME: 'BBVA',
		ADDRESS: 'Banco Bilbao Vizcaya Argentaria, St. Cugat del Vallès',
		ACCOUNT_NUMBER: '0182 8186 21 0201647461',
		IBAN: 'ES91 0182 8186 2102 0164 7461',
		SWIFT: 'BBVAESMMXXX'
	}
}
