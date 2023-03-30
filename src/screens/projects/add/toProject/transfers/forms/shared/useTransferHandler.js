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
	const validateInputs = () => {
		if (!city || !company || !vehicleCapacity || data.nrVehicles < 1) {
			toast.info(
				'If you want to add transfer please select city, company, vehicle size and number of vehicles',
				toastOptions
			)
			return false
		}
		return true
	}

	const addTransfer = (type) => {
		const transfer = type === 'in' ? 'transfer_in' : 'transfer_out'
		setIdCompany(idCompany + 1)
		addTransfers({
			from: type === 'in' ? 'From Airport' : 'From Hotel',
			type: type === 'in' ? 'Transfer in' : 'Transfer out',
			units: Number(data.nrVehicles),
			total: Number(data.nrVehicles) * transferPrice,
			idCompany: idCompany,
			company,
			vehicleCapacity,
			nrVehicles: Number(data.nrVehicles),
			[transfer]: Number(data.nrVehicles) * transferPrice,
			vehicleType: transfers[0].vehicleType
		})
	}

	const updateExistingTransfer = (type) => {
		const transfer = type === 'in' ? 'transfer_in' : 'transfer_out'
		updateTransfer({
			type: type === 'in' ? 'Transfer in' : 'Transfer out',
			units: Number(data.nrVehicles),
			total: Number(data.nrVehicles) * transferPrice,
			company,
			vehicleCapacity,
			nrVehicles: Number(data.nrVehicles),
			[transfer]: Number(data.nrVehicles) * transferPrice
		})
	}

	const addOrUpdateAssistance = () => {
		addUpdateExtraLines({
			units: data.assistance,
			type: 'Assistance',
			total: data.assistance * assistance.halfDayRate,
			idCompany: idCompany + 'A',
			company: assistance.familyName,
			assistance: data.assistance,
			assistanceCost: data.assistance * assistance.halfDayRate
		})
	}

	const addOrUpdateMeetGreet = () => {
		addUpdateExtraLines({
			units: data.meetGreet,
			type: 'Meet&Greet',
			total: data.meetGreet * meetGreetOrDispatch.fullDayRate,
			idCompany: idCompany + 'M',
			company: meetGreetOrDispatch.familyName,
			meetGreet: data.meetGreet,
			meetGreetCost: data.meetGreet * meetGreetOrDispatch.fullDayRate
		})
	}

	const removeAssistance = () => {
		removeTransferLine({ type: 'Assistance' })
	}

	const removeMeetGreet = () => {
		removeTransferLine({ type: 'Meet&Greet' })
	}

	const handleClickAdd = (type) => {
		if (!validateInputs()) {
			return
		}
		const transferObjects = transferType.filter(
			(el) => el.type === `Transfer ${type}`
		)
		const found = transferObjects.find(
			(el) => el.vehicleCapacity === vehicleCapacity && el.company === company
		)
		if (!found && transferType.length === 0) {
			addTransfer(type)
		} else if (found) {
			updateExistingTransfer(type)
		}

		if (Number(data.assistance) > 0 && Object.values(assistance).length > 0) {
			addOrUpdateAssistance()
		} else {
			removeAssistance()
		}

		if (
			Number(data.meetGreet) > 0 &&
			Object.values(meetGreetOrDispatch).length > 0
		) {
			addOrUpdateMeetGreet()
		} else {
			removeMeetGreet()
		}

		setData({ ...data, nrVehicles: 1 })
		setCompany('')
		setVehicleCapacity(0)
	}

	return { handleClickAdd }
}
