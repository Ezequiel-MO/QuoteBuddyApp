import { useState, useEffect, useCallback } from 'react'
import { ITicket } from '@interfaces/ticket'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import baseAPI from 'src/axios/axiosConfig'
import { toastOptions } from 'src/helper/toast'

interface IApiResponse {
	data: {
		data: ITicket[]
	}
}

export const useGetTickets = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [tickets, setTickets] = useState<ITicket[] | null>(null)

	const getTickets = useCallback(async () => {
		const url = `tickets`
		setIsLoading(true)
		try {
			const response: AxiosResponse<IApiResponse> =
				await baseAPI.get<IApiResponse>(url)
			setTickets(response.data.data.data)
		} catch (error: any) {
			toast.error('Failed to fetch tickets', toastOptions as any)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		getTickets()
	}, [getTickets])

	return { isLoading, tickets, getTickets }
}
