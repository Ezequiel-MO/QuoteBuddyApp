import { useState, useEffect } from 'react'
import { ITicket } from '@interfaces/ticket'
import { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import baseAPI from 'src/axios/axiosConfig'
import { toastOptions } from 'src/helper/toast'

interface IApiResponse {
	data: {
		data: ITicket
	}
}

export const useGetTicketById = (id: string) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [ticket, setTicket] = useState<ITicket | null>(null)

	const getTicketById = async (id: string) => {
		if (id === 'new') {
			setTicket({
				_id: 'new',
				nr: 0,
				title: '',
				description: '',
				category: 'Software Problem',
				priority: 1,
				progress: 0,
				status: 'not started',
				active: false,
				createdAt: 0
			})
			setIsLoading(false)
			return
		}

		const url = `tickets/${id}`
		setIsLoading(true)
		try {
			const response: AxiosResponse<IApiResponse> =
				await baseAPI.get<IApiResponse>(url)
			setTicket(response.data.data.data)
			setIsLoading(false)
		} catch (error: any) {
			toast.error(error, toastOptions as any)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getTicketById(id)
	}, [id])

	return { isLoading, ticket, getTicketById }
}
