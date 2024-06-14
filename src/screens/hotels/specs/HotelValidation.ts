import * as Yup from 'yup'

export const hotelValidationSchema = Yup.object().shape({
	_id: Yup.string().notRequired(),
	name: Yup.string()
		.required('Hotel name is required')
		.min(3, 'Hotel name must be at least 3 characters long'),
	city: Yup.string().required('City is required'),
	address: Yup.string().required('Address is required'),
	numberStars: Yup.number()
		.required('Number of stars is required')
		.min(1, 'Must be at least 1 star')
		.max(5, 'Cannot be more than 5 stars'),
	numberRooms: Yup.number()
		.required('Number of rooms is required')
		.min(1, 'Must have at least 1 room'),
	checkin_out: Yup.string().required('Check-in/out details are required'),
	meetingRooms: Yup.string().required('Meeting rooms information is required'),
	wheelChairAccessible: Yup.boolean().required(
		'Wheelchair accessibility information is required'
	),
	wifiSpeed: Yup.string().required('WiFi speed is required'),
	swimmingPool: Yup.string().required('Swimming pool information is required'),
	restaurants: Yup.string().required('Restaurant information is required'),
	textContent: Yup.string().required('Text content is required'),
	imageContentUrl: Yup.array()
		.of(Yup.string().url('Must be a valid URL'))
		.required('Image content URLs are required'),
	meetingImageContentUrl: Yup.array()
		.of(Yup.string().url('Must be a valid URL'))
		.notRequired(),
	meetingDetails: Yup.object()
		.shape({
			capacity: Yup.number()
				.required('Meeting room capacity is required')
				.min(0, 'Capacity cannot be negative'),
			naturalLight: Yup.boolean().required(
				'Natural light information is required'
			),
			size: Yup.number()
				.required('Meeting room size is required')
				.min(0, 'Size cannot be negative'),
			visibility: Yup.mixed<'good' | 'some columns'>()
				.oneOf(
					['good', 'some columns'],
					'Visibility must be either "good" or "some columns"'
				)
				.required('Visibility information is required'),
			generalComments: Yup.string().required('General comments are required')
		})
		.notRequired(),
	location: Yup.object().shape({
		type: Yup.string().required('Location type is required'),
		coordinates: Yup.array()
			.of(Yup.number().required('Coordinate is required'))
			.required('Coordinates are required'),
		address: Yup.string().required('Location address is required'),
		description: Yup.string().required('Location description is required')
	}),
	introduction: Yup.array().of(Yup.string()).notRequired(),
	price: Yup.array()
		.of(
			Yup.object().shape({
				DUInr: Yup.number().required('DUInr is required'),
				DUIprice: Yup.number().required('DUIprice is required'),
				DoubleRoomNr: Yup.number().required('Double Room Number is required'),
				DoubleRoomPrice: Yup.number().required('Double Room Price is required'),
				breakfast: Yup.number().required('Breakfast price is required'),
				DailyTax: Yup.number().required('Daily Tax is required')
			})
		)
		.required('Price information is required'),
	deletedImage: Yup.array().of(Yup.string()).notRequired(),
	availableLanguages: Yup.array()
		.of(Yup.string().required('Language is required'))
		.required('Available languages are required'),
	descriptions: Yup.object()
		.shape({
			key: Yup.string().required('Description key is required'),
			value: Yup.string().required('Description value is required')
		})
		.notRequired()
})
