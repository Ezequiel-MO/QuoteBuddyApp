export const formsValues = {
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
		'textContent'
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
	]
}
