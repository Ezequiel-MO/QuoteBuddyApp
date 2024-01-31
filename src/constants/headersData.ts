export interface HeaderItems {
	project: string[]
	location: string[]
	schedule: string[]
	projectBase: string[]
	projectBaseItinerary: string[]
	transferVendor: string[]
	restaurant: string[]
	event: string[]
	multiHotel: string[]
	accManager: string[]
	transfer: string[]
	client: string[]
	country: string[]
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
	notification: string[]
}

export const headerItems: HeaderItems = {
	project: [
		'Code',
		'Location',
		'Group Name',
		'Pax',
		'Arrival',
		'Departure',
		'Status',
		'Estimate',
		'Actions'
	],
	location: ['Location', 'Country'],
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
		"Afternoon Activity en-route", 
		'Dinner en-route',
		"Night Activity en-route:"
	],
	projectBaseMeeting: [
		'Days',
		'Morning Meetings',
		'Afternoon Meetings',
		'All Day Meetings'
	],
	transferVendor: [
		'Company',
		'Vehicle Type',
		'Number of Vehicles',
		'Add to Schedule'
	],
	restaurant: ['Name', 'City', 'Last Updated', 'Price', 'Is a Venue'],
	event: ['Name', 'City', 'Last Updated', 'Price', 'Price per Person', "regular"],
	multiHotel: ['Days', 'Hotel Overnight'],
	accManager: ['First Name', 'Family Name', 'Email'],
	transfer: ['Vendor', 'Location', 'Type', 'Capacity', 'Last Update'],
	client: ['Name', 'Email', 'Company', 'Country'],
	country: ['Name', 'Web Code', 'Quote Language'],
	hotel: ['Name', 'Stars', 'Address', 'Rooms', 'Meeting Rooms', 'City'],
	invoice: [
		'Invoice Number',
		'Date',
		'Client',
		'Company',
		'Reference',
		'Total Amount'
	],
	user: ['name', 'email', 'role'],
	company: ['name', 'address', 'country'],
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
		'City'
	],
	entertainmentShow: ['Name', 'City', 'Vendor', 'Category'],
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
	notification:["title" ,"module" ,"date creation" , "date update"]
}
