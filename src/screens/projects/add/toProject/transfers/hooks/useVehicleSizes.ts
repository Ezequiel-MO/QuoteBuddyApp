import { useApiFetch } from '@hooks/fetchData'
import { useState } from 'react'

export const useVehicleSizes = () => {
	const [url, setUrl] = useState<string>('')
	const [refresh, setRefresh] = useState<number>(0)

	const {
		data: vehicleSizes = [],
		isLoading,
		dataLength
	} = useApiFetch<string[]>(url, refresh, !!url)

	const fetchVehicleSizes = (company: string, city?: string) => {
		if (!company || company === 'none') {
			setUrl('')
			return
		}

		let endpoint = `transfers/sizes?company=${encodeURIComponent(company)}`
		if (city && city !== 'none') {
			endpoint += `&city=${encodeURIComponent(city)}`
		}

		setUrl(endpoint)
		setRefresh((prev) => prev + 1)
	}

	return {
		vehicleSizes,
		isLoading,
		dataLength,
		fetchVehicleSizes
	}
}
