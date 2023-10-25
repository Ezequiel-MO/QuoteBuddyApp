import { ITransfer } from 'src/interfaces/'

export const getInitialValues = (transfer: ITransfer) => {
	return {
        city: transfer?.city ?? '',
		company: transfer?.company ?? '',
		transfer_in: transfer?.transfer_in ?? '',
		transfer_out: transfer?.transfer_out ?? '',
		dispo_4h: transfer?.dispo_4h ?? '',
		hextra: transfer?.hextra ?? '',
		hextra_night: transfer?.hextra_night ?? '',
		dispo_5h_out: transfer?.dispo_5h_out ?? '',
		dispo_4h_airport: transfer?.dispo_4h_airport ?? '',
		dispo_4h_night: transfer?.dispo_4h_night ?? '',
		transfer_in_out_night: transfer?.transfer_in_out_night ?? '',
		dispo_6h: transfer?.dispo_6h ?? '',
		dispo_6h_night: transfer?.dispo_6h_night ?? '',
		dispo_9h: transfer?.dispo_9h ?? '',
		vehicleType: transfer?.vehicleType ?? '',
		vehicleCapacity: transfer?.vehicleCapacity ?? '',
		selectedService: transfer?.selectedService ?? ''
	}
}