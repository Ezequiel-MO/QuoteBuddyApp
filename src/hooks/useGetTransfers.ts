import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { errorToastOptions } from '../helper/toast'
import { filterTransfers } from '../helper/filterHelp'
import { ITransfer } from '../interfaces'

interface FilterTransfersParams {
	url: string
	valuesRute: { name: string; value: string | undefined }[]
	filterOptions: string[]
	page: number
}

export const useGetTransfers = (
	city: string,
	vehicleCapacity: string,
	company: string,
	service: string
) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [transfers, setTransfers] = useState<ITransfer[]>([])

	useEffect(() => {
		const controller = new AbortController()
		const getTransfers = async (
			city: string,
			vehicleCapacity: string,
			company: string
		) => {
			const valuesRute = [
				{ name: 'city', value: city === 'none' ? undefined : city },
				{ name: 'company', value: company === 'none' ? undefined : company },
				{
					name: 'vehicleCapacity',
					value:
						vehicleCapacity === '0' || company === 'none'
							? undefined
							: vehicleCapacity
				}
			]
			const filterOptions = ['city', 'company', 'vehicleCapacity']
			let url = 'transfers'
			if (city || company) {
				url = filterTransfers({
					url: 'transfers',
					valuesRute: valuesRute,
					filterOptions: filterOptions,
					page: 1
				} as FilterTransfersParams)
			}
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url, {
					signal: controller.signal
				})
				setTransfers(response.data.data.data)
				setIsLoading(false)
			} catch (error: any) {
				toast.error(error, errorToastOptions as any)
			}
		}
		getTransfers(city, vehicleCapacity, company)

		return () => {
			controller.abort()
		}
	}, [city, vehicleCapacity, company, service])

	return { transfers, setTransfers, isLoading }
}
