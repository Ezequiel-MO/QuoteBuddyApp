import * as Yup from 'yup'

export const VALIDATIONS = {
	accManager: Yup.object({
		firstName: Yup.string().required('Required'),
		familyName: Yup.string().required('Required'),
		email: Yup.string().required('Required')
	}),
	client: Yup.object({
		firstName: Yup.string().required('Required'),
		familyName: Yup.string().required('Required'),
		email: Yup.string().required('Required'),
		phone: Yup.string(),
		quoteLanguage: Yup.string().required('Required'),
		country: Yup.string().required('Required')
	}),
	country: Yup.object({
		name: Yup.string().required('Required'),
		accessCode: Yup.string().required('Required'),
		quoteLanguage: Yup.string().required('Required')
	}),
	entertainment: Yup.object({
		vendor: Yup.string().required('Required'),
		city: Yup.string().required('Required'),
		name: Yup.string().required('Required'),
		contact: Yup.string(),
		email: Yup.string(),
		category: Yup.string(),
		duration: Yup.string(),
		nrArtists: Yup.string(),
		textContent: Yup.string()
	}),
	event: Yup.object({
		name: Yup.string().required('Required'),
		city: Yup.string().required('Required'),
		longitude: Yup.number().typeError('Required'),
		latitude: Yup.number().required('Required'),
		// pricePerPerson: Yup.boolean().optional(),
		price: Yup.number().typeError('Required').min(1, 'Required')
	}),
	restaurant: Yup.object({
		name: Yup.string().required('Required'),
		city: Yup.string().required('Required'),
		longitude: Yup.number().required('Required'),
		latitude: Yup.number().required('Required'),
		price: Yup.number().typeError('Required').min(1, 'Required'),
		// isVenue: Yup.boolean().optional()
	}),
	freelancer: Yup.object({
		firstName: Yup.string().required('Required'),
		familyName: Yup.string().required('Required'),
		email: Yup.string().email().required('Required'),
		phone: Yup.string(),
		halfDayRate: Yup.number().typeError('Required').min(1, 'Required'),
		fullDayRate: Yup.number().typeError('Required').min(1, 'Required'),
		// weekendHDRate: Yup.number().min(1,"Required"),
		// weekendFDRate: Yup.number().min(1,"Required"),
		type: Yup.string().required('Required'),
		city: Yup.string().required('Required')
	}),
	hotel: Yup.object({
		name: Yup.string().required('Required'),
		city: Yup.string().required('Required'),
		address: Yup.string().required('Required'),
		numberStars: Yup.number().typeError('Required').min(1, 'Required'),
		numberRooms: Yup.number().typeError('Required').min(1, 'Required'),
		checkin_out: Yup.string().required('Required'),
		meetingRooms: Yup.number().typeError('Required').min(1, 'Required'),
		// wheelChairAccessible: Yup.boolean(),
		wifiSpeed: Yup.string().required('Required'),
		swimmingPool: Yup.string().required('Required'),
		restaurants: Yup.string().required('Required'),
		longitude: Yup.number().typeError('Required').min(1, 'Required'),
		latitude: Yup.number().typeError('Required').min(1, 'Required')
	}),
	transfer: Yup.object({
		city: Yup.string().required('Required'),
		company: Yup.string().required('Required'),
		transfer_in: Yup.number(),
		transfer_out: Yup.number(),
		dispo_4h: Yup.number(),
		hextra: Yup.number(),
		hextra_night: Yup.number(),
		dispo_5h_out: Yup.number(),
		dispo_4h_airport: Yup.number(),
		dispo_4h_night: Yup.number(),
		transfer_in_out_night: Yup.number(),
		dispo_6h: Yup.number(),
		dispo_6h_night: Yup.number(),
		dispo_9h: Yup.number(),
		vehicleType: Yup.string().required('Required'),
		vehicleCapacity: Yup.number().required('Required')
	})
} as const

export type ValidationsType = typeof VALIDATIONS
