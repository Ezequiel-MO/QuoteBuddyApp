import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import { filter } from '../helper/filterHelp'

export const useGetClients = ({ country, page, all }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [clients, setClients] = useState([])

	useEffect(() => {
		const controller = new AbortController()
		const getClients = async () => {
			let url = `v1/clients?page=${page}&limit=10`
			if (country !== undefined) {
				const valuesRute = [
					{ name: 'country', value: country === 'none' ? undefined : country }
				]
				const filterOptions = ['country']
				url = filter({
					url: 'clients',
					valuesRute,
					filterOptions,
					page: page
				})
			}
			if (all === 'yes') {
				url = 'v1/clients'
			}

			setIsLoading(true)
			try {
				const response = await baseAPI.get(url, {
					signal: controller.signal
				})
				setClients(response.data.data.data)
				setIsLoading(false)
			} catch (error) {
				toast.error(error, toastOptions)
			}
		}

		getClients(country)
		return () => {
			controller.abort()
		}
	}, [page])

	return { clients, setClients, isLoading }
}
