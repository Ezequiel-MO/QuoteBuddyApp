export interface HeaderItems {
	project: string[]
	location: string[]
	schedule: string[]
	projectBase: string[]
	projectBaseItinerary: string[]
	supplier: string[]
	transferVendor: string[]
	restaurant: string[]
	event: string[]
	multiHotel: string[]
	accManager: string[]
	transfer: string[]
	client: string[]
	country: string[]
	gift: string[]
	hotel: string[]
	invoice: string[]
	user: string[]
	company: string[]
	freelancer: string[]
	entertainmentShow: string[]
	hotelModal: string[]
	eventModal: string[]
	restaurantModal: string[]
	projectBaseMeeting: string[]
	payments: string[]
	vendorInvoice: string[]
	notification: string[]
	projectBasePaymentSlip: string[]
	paymentSlip: string[]
	paymentSlipVendorInvoice: string[]
	expense: string[]
	proformaInvoice: string[]
}

export const headerItems: HeaderItems = {
	project: [
		'Code',
		'Location',
		'Client',
		'Group Name',
		'Pax',
		'Arrival',
		'Departure',
		'Status',
		'Estimate',
		'Actions'
	],

	location: ['Location', 'Country', 'Actions'],
	schedule: [
		'Code',
		'Start Date',
		'End Date',
		'Group Name',
		'Location',
		'Nr of Pax'
	],
	projectBase: [
		'Days',
		'Morning Activities',
		'Lunch Options',
		'Afternoon Activities',
		'Dinner Options'
	],
	projectBaseItinerary: [
		'Days',
		'Transfer Duration',
		'Morning Activity en-route',
		'Lunch en-route',
		'Afternoon Activity en-route',
		'Dinner en-route',
		'Night Activity en-route:'
	],
	projectBaseMeeting: [
		'Days',
		'Morning Meetings',
		'Afternoon Meetings',
		'All Day Meetings'
	],
	supplier: ['Name', 'City', 'Contact Person', 'email', 'Actions'],
	transferVendor: [
		'Company',
		'Vehicle Type',
		'Number of Vehicles',
		'Add to Schedule'
	],
	restaurant: [
		'Name',
		'City',
		'Max Capacity',
		'Last Updated',
		'Price',
		'Is a Venue',
		'Actions'
	],
	event: [
		'Name',
		'City',
		'Last Updated',
		'Price',
		'Price per Person',
		'regular',
		'Actions'
	],
	multiHotel: ['Days', 'Hotel Overnight'],
	accManager: ['First Name', 'Family Name', 'Email', 'Remove'],
	transfer: [
		'Vendor',
		'Location',
		'Type',
		'Capacity',
		'Last Update',
		'Actions'
	],
	client: ['Name', 'Email', 'Company', 'Country', 'Actions'],
	country: ['Name', 'Web Code', 'Quote Language', 'Actions'],
	gift: [],
	hotel: [
		'Name',
		'Stars',
		'Address',
		'Rooms',
		'Meeting Rooms',
		'City',
		'Actions'
	],
	invoice: [
		'Invoice Number',
		'Date',
		'Client',
		'Company',
		'Reference',
		'Total Amount'
	],
	user: ['name', 'email', 'role'],
	company: ['name', 'address', 'country', 'actions'],
	freelancer: [
		'First Name',
		'Family Name',
		'Email',
		'Phone',
		'Half Day Rate',
		'Full Day Rate',
		'Lang Supplement',
		'Wknd HD Rate',
		'Wknd FD Rate',
		'Type',
		'City',
		'Actions'
	],
	entertainmentShow: [
		'Name',
		'City',
		'Vendor',
		'Category',
		'Last Update',
		'Actions'
	],
	hotelModal: [
		'DUI Amount',
		'DUI Price',
		'DOUBLE Amount',
		'DOUBLE Price',
		'BREAKFAST',
		'CITY TAX'
	],
	eventModal: [
		'City',
		'Longitude',
		'Latitude',
		'Price Tour ',
		'Price Per Person'
	],
	restaurantModal: [
		'City',
		'Longitude',
		'Latitude',
		'Average Menu Price',
		'It is a venue'
	],
	payments: ['status', 'amount', 'paymentDate', 'method'],
	vendorInvoice: [
		'project',
		'acc. manager',
		'invoice Number',
		'invoice Date',
		'vendor',
		'type',
		'amount',
		'balance',
		'actions'
	],
	notification: ['title', 'module', 'date creation', 'date update'],
	projectBasePaymentSlip: [
		'project code',
		'client',
		'client company',
		'arrival day',
		'departure day',
		'Account Manager'
	],
	paymentSlip: ['type', 'due date', 'amount', 'status', 'update', 'actions'],
	paymentSlipVendorInvoice: [
		'type',
		'invoice number',
		'invoice date',
		'type supplier',
		'name supplier',
		'amount',
		'balance',
		'actions'
	],
	expense: ['name', 'category', 'actions'],
	proformaInvoice: [
		'proforma number',
		'date',
		'client',
		'reference',
		'total amount'
	]
}
