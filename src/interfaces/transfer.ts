export type ServiceKey = 'dispo_4h' | 'dispo_5h_out'

export interface ITransfer {
	_id: string
	city: string
	company: string
	transfer_in: number
	transfer_out: number
	transfer_in_out_night: number
	one_way_city_transfer: number
	one_way_city_transfer_night: number
	dispo_4h: number
	hextra: number
	hextra_night: number
	dispo_5h_out: number
	dispo_4h_airport: number
	dispo_4h_night: number
	dispo_6h: number
	dispo_6h_night: number
	dispo_9h: number
	vehicleType: string
	vehicleCapacity: number
	nrVehicles: number
	meetGreet: number
	meetGreetCost: number
	assistance: number
	assistanceCost: number
	selectedService: string
	isDeleted: boolean
	deletedAt: string
	budgetNotes?: string
	meetGreetBudgetNotes?: string
	assistanceBudgetNotes?: string
	dispatchBudgetNotes?: string
	[key: string]: any
}
