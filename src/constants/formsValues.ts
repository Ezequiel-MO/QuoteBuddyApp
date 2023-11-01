type FormFields = {
	accManager: string[]
	client: string[]
	country: string[]
	event: string[]
	freeLancer: string[]
	hotel: string[]
	restaurant: string[]
	location: string[]
}

export const formsValues: FormFields = {
	accManager: ['firstName', 'familyName', 'email'],
	client: [
		'firstName',
		'familyName',
		'email',
		'clientCompany',
		'phone',
		'quoteLanguage',
		'country'
	],
	country: ['name', 'accessCode', 'quoteLanguage'],
	event: [
		'name',
		'city',
		'longitude',
		'latitude',
		'pricePerPerson',
		'price',
		'textContent',
		"CoordsActive"
	],
	freeLancer: [
		'firstName',
		'familyName',
		'email',
		'phone',
		'halfDayRate',
		'fullDayRate',
		'weekendHDRate',
		'weekendFDRate',
		'type',
		'city'
	],
	hotel: [
		'name',
		'city',
		'address',
		'numberStars',
		'numberRooms',
		'checkin_out',
		'meetingRooms',
		'wheelChairAccessible',
		'wifiSpeed',
		'swimmingPool',
		'restaurants',
		'longitude',
		'latitude',
		'textContent'
	],
	restaurant: [
		'name',
		'city',
		'longitude',
		'latitude',
		'price',
		'textContent',
		'isVenue'
	],
	location: [
		'name',
		'longitude',
		'latitude',
		'country',
		'textContent',
		'inFigures',
		'corporateFacts'
	]
}
