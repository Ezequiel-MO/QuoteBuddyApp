import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import { ISetting } from '../interfaces'

export const useGetSetting = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [setting, setSetting] = useState<ISetting>()

	const getSetting = async () => {
		const url = 'settings'
		setIsLoading(true)
		try {
			const response = await baseAPI.get(url)
			setSetting(response.data.data.data[0])
			setIsLoading(false)
		} catch (error: any) {
			toast.error(error, toastOptions as any)
		}
	}

	useEffect(() => {
		getSetting()
	}, [])

	return {
		setting,
		setSetting,
		isLoading,
		setIsLoading,
		refreshSetting: getSetting
	}
}
