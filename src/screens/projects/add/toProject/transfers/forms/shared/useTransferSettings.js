import { useLocalStorage } from '../../../../../../../hooks'

export const useTransferSettings = () => {
	const [company, setCompany] = useLocalStorage('company', '')
	const [vehicleCapacity, setVehicleCapacity] = useLocalStorage(
		'vehicleCapacity',
		''
	)
	const [city, setCity] = useLocalStorage('city', '')
	const [data, setData] = useLocalStorage('transferData', {
		nrVehicles: 1,
		meetGreet: Number(),
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
