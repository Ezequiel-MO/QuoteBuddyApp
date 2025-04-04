import { useApiFetch } from '@hooks/fetchData'
import { ITransfer } from '@interfaces/transfer'
import { useState } from 'react'

interface TransferOptionsParams {
	city?: string
	company?: string
	vehicleCapacity?: string
}

export const useTransferOptions = () => {
	const [url, setUrl] = useState<string>('')
	const [refresh, setRefresh] = useState<number>(0)

	const {
		data: transferOptions = [],
		isLoading,
		dataLength
	} = useApiFetch<ITransfer[]>(url, refresh, !!url)

	const fetchTransferOptions = (params: TransferOptionsParams) => {
		const { city, company, vehicleCapacity } = params

		if (!city || city === 'none') {
			setUrl('')
			return
		}

		let endpoint = `transfers/options?city=${encodeURIComponent(city)}`

		if (company && company !== 'none') {
			endpoint += `&company=${encodeURIComponent(company)}`
		}

		if (vehicleCapacity) {
			endpoint += `&vehicleCapacity=${encodeURIComponent(vehicleCapacity)}`
		}

		setUrl(endpoint)
		setRefresh((prev) => prev + 1)
	}

	return {
		transferOptions,
		isLoading,
		dataLength,
		fetchTransferOptions
	}
}
