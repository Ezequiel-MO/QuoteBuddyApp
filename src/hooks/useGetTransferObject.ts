import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import { ITransfer } from '../interfaces'
import { AxiosResponse } from 'axios'

interface IApiResponse {
	data: {
		data: ITransfer
	}
}

interface Props {
	city: string
	company: string
	vehicleCapacity: string
}

export const useGetTransferObject = (props: Props) => {
	const { city, company, vehicleCapacity } = props
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [transferObject, setTransferObject] = useState<ITransfer>(
		{} as ITransfer
	)

	const url = `transfers?city=${city}&company=${company}&vehicleCapacity=${vehicleCapacity}`

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)
				const response: AxiosResponse<IApiResponse> =
					await baseAPI.get<IApiResponse>(url)
				setTransferObject(response.data.data.data)
			} catch (error: any) {
				toast.error(error.message || error, toastOptions as any)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [city, company, vehicleCapacity])

	return { isLoading, transferObject }
}
