import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import { IProject } from '../interfaces'
import { AxiosResponse } from 'axios'

interface IApiResponse {
	data: {
		data: IProject[]
	}
}

export const useGetProjects = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [projects, setProjects] = useState<IProject[]>([])

	const getProjects = async () => {
		const url = 'projects'
		setIsLoading(true)
		try {
			const response: AxiosResponse<IApiResponse> =
				await baseAPI.get<IApiResponse>(url)
			setProjects(response.data.data.data)
			setIsLoading(false)
		} catch (error: any) {
			toast.error(error, toastOptions as any)
		}
	}

	useEffect(() => {
		getProjects()
	}, [])

	return { projects, setProjects, isLoading, refreshProjects: getProjects }
}
