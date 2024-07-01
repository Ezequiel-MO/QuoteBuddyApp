import * as Yup from 'yup'

export const transferValidationSchema = Yup.object().shape({
	city: Yup.string().required('City is required'),
	company: Yup.string().required('Company is required'),
	transfer_in: Yup.number().notRequired(),
	transfer_out: Yup.number().notRequired(),
	dispo_4h: Yup.number().notRequired(),
	hextra: Yup.number().notRequired(),
	hextra_night: Yup.number().notRequired(),
	dispo_5h_out: Yup.number().notRequired(),
	dispo_4h_airport: Yup.number().notRequired(),
	dispo_4h_night: Yup.number().notRequired(),
	transfer_in_out_night: Yup.number().notRequired(),
	dispo_6h: Yup.number().notRequired(),
	dispo_6h_night: Yup.number().notRequired(),
	dispo_9h: Yup.number().notRequired(),
	vehicleType: Yup.string().required('Vehicle type is required'),
	vehicleCapacity: Yup.number().required('Vehicle capacity is required'),
	nrVehicles: Yup.number().notRequired(),
	meetGreet: Yup.number().notRequired(),
	meetGreetCost: Yup.number().notRequired(),
	assistance: Yup.number().notRequired(),
	assistanceCost: Yup.number().notRequired(),
	selectedService: Yup.string().notRequired()
})
