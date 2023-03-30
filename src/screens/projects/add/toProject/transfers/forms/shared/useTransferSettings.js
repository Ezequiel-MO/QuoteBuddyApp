import { useLocalStorage } from '../../../../../../../hooks'

export const useTransferSettings = (type) => {
	let transferData = type === 'in' ? 'transfer_in' : 'transfer_out'
	let meetGreetOrDispatch = type === 'in' ? 'meetGreet' : 'groupDispatch'
	const [company, setCompany] = useLocalStorage('company', '')
	const [vehicleCapacity, setVehicleCapacity] = useLocalStorage(
		'vehicleCapacity',
		''
	)
	const [city, setCity] = useLocalStorage('city', '')
	const [data, setData] = useLocalStorage(transferData, {
		nrVehicles: 1,
		[meetGreetOrDispatch]: Number(),
		assistance: Number()
	})

	return {
		company,
		setCompany,
		vehicleCapacity,
		setVehicleCapacity,
		city,
		setCity,
		data,
		setData
	}
}
