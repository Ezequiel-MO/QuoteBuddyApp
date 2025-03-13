import * as typescript from './contextinterfaces'

const initialState: typescript.TransferState = {
	transfers: [],
	currentTransfer: {
		city: '',
		company: '',
		transfer_in: 0,
		transfer_out: 0,
		transfer_in_out_night: 0,
		one_way_city_transfer: 0,
		one_way_city_transfer_night: 0,
		dispo_4h: 0,
		hextra: 0,
		hextra_night: 0,
		dispo_5h_out: 0,
		dispo_4h_airport: 0,
		dispo_4h_night: 0,
		dispo_6h: 0,
		dispo_6h_night: 0,
		dispo_9h: 0,
		vehicleType: '',
		vehicleCapacity: 0,
		nrVehicles: 0,
		meetGreet: 0,
		meetGreetCost: 0,
		assistance: 0,
		assistanceCost: 0,
		selectedService: ''
	},
	update: false,
	totalPages: 1,
	page: 1,
	searchTerm: ''
}

export default initialState
