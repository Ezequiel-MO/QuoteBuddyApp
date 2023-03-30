import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../../../helper/toast'

export const useTransferHandler = ({
	city,
	company,
	vehicleCapacity,
	transferType,
	addTransfers,
	data,
	setData,
	idCompany,
	setIdCompany,
	transfers,
	transferPrice,
	updateTransfer,
	addUpdateExtraLines,
	removeTransferLine,
	setCompany,
	setVehicleCapacity,
	assistance,
	meetGreetOrDispatch
}) => {
	const handleClickAdd = (type) => {
		let transfer = type === 'in' ? 'transfer_in' : 'transfer_out'
		if (!city || !company || !vehicleCapacity || data.nrVehicles < 1) {
			toast.info(
				'If you want to add transfer please select city, company, vehicle size and number of vehicles',
				toastOptions
			)
		}
		if (
			transferType.length === 0 &&
			city &&
			company &&
			Number(vehicleCapacity) &&
			data.nrVehicles > 0
		) {
			setIdCompany(idCompany + 1)
			addTransfers({
				//render "TransferLinesRender"
				from: type === 'in' ? 'From Airport' : 'From Hotel',
				type: type === 'in' ? 'Transfer in' : 'Transfer out',
				units: Number(data.nrVehicles),
				total: Number(data.nrVehicles) * transferPrice,
				idCompany: idCompany,
				//model transfer
				company,
				vehicleCapacity,
				nrVehicles: Number(data.nrVehicles),
				[transfer]: Number(data.nrVehicles) * transferPrice,
				vehicleType: transfers[0].vehicleType
			})
		}
		const transferObjects = transferType.filter(
			(el) => el.type === `Transfer ${type}`
		)
		const found = transferObjects.find(
			(el) => el.vehicleCapacity === vehicleCapacity && el.company === company
		)
		if (found) {
			updateTransfer({
				//render "TransferLinesRender"
				type: type === 'in' ? 'Transfer in' : 'Transfer out',
				units: Number(data.nrVehicles),
				total: Number(data.nrVehicles) * transferPrice,
				//model transfer
				company,
				vehicleCapacity,
				nrVehicles: Number(data.nrVehicles),
				[transfer]: Number(data.nrVehicles) * transferPrice
			})
		}
		if (
			!found &&
			transferType.length > 0 &&
			city &&
			company &&
			Number(vehicleCapacity) &&
			data.nrVehicles > 0
		) {
			setIdCompany(idCompany + 1)
			addTransfers({
				//render "TransferLinesRender"
				from: type === 'in' ? 'From Airport' : 'From Hotel',
				type: type === 'in' ? 'Transfer in' : 'Transfer out',
				units: Number(data.nrVehicles),
				total: Number(data.nrVehicles) * transferPrice,
				idCompany: idCompany,
				//model transfer
				nrVehicles: Number(data.nrVehicles),
				vehicleCapacity,
				[transfer]: Number(data.nrVehicles) * transferPrice,
				company,
				vehicleType: transfers[0].vehicleType
			})
		}
		if (Number(data.assistance) > 0 && Object.values(assistance).length > 0) {
			addUpdateExtraLines({
				//render "TransferLinesRender"
				units: data.assistance,
				type: 'Assistance',
				total: data.assistance * assistance.halfDayRate,
				idCompany: idCompany + 'A',
				//model transfer
				company: assistance.familyName,
				assistance: data.assistance,
				assistanceCost: data.assistance * assistance.halfDayRate
			})
		} else {
			removeTransferLine({
				type: 'Assistance'
			})
		}
		if (
			Number(data.meetGreet) > 0 &&
			Object.values(meetGreetOrDispatch).length > 0
		) {
			addUpdateExtraLines({
				//render "TransferLinesRender"
				units: data.meetGreet,
				type: 'Meet&Greet',
				total: data.meetGreet * meetGreetOrDispatch.fullDayRate,
				idCompany: idCompany + 'M',
				//model transfer
				company: meetGreetOrDispatch.familyName,
				meetGreet: data.meetGreet,
				meetGreetCost: data.meetGreet * meetGreetOrDispatch.fullDayRate
			})
		} else {
			removeTransferLine({
				type: 'Meet&Greet'
			})
		}
		setData({ ...data, nrVehicles: 1 })
		setCompany('')
		setVehicleCapacity(0)
	}
	return { handleClickAdd }
}
