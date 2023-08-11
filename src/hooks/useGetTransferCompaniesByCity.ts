import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { errorToastOptions } from '../helper/toast'
import { ITransfer } from '../interfaces'

interface ApiResponse {
	data: {
		data: ITransfer[]
	}
}

export const useGetTransferCompaniesByCity = (city: string) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [companies, setCompanies] = useState<string[]>([])

	useEffect(() => {
		const controller = new AbortController()
		const getCompanies = async (city: string) => {
			let url = `transfers`
			if (city && city !== 'none') {
				url = `transfers?city=${city}`
			}
			setIsLoading(true)
			try {
				const response = await baseAPI.get<ApiResponse>(url, {
					signal: controller.signal
				})
				const companies = response.data.data.data.map(
					(transfer) => transfer.company
				)
				const uniqueCompanies = [...new Set(companies)]
				setCompanies(uniqueCompanies)
				setIsLoading(false)
			} catch (error: any) {
				toast.error(error, errorToastOptions as any)
			}
		}
		getCompanies(city)
		return () => {
			controller.abort()
		}
	}, [city])

	return { companies, isLoading }
}
