import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetProjects = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [projects, setProjects] = useState([])

	useEffect(() => {
		const getProjects = async () => {
			const url = `projects`
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setProjects(response.data.data.data)
				setIsLoading(false)
			} catch (error) {
				toast.error(error, toastOptions)
			}
		}
		getProjects()
	}, [])

	return { projects, setProjects, isLoading }
}
