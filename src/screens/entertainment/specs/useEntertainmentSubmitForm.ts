import { useState } from 'react'
import baseAPI from 'src/axios/axiosConfig'
import { IEntertainment } from 'src/interfaces/entertainment'

interface Props {
	onSuccess: (update: boolean) => void
	onError: (error: any) => void
	entertainmentShow: IEntertainment
}

export const useEntertainmentSubmitForm = ({
	onSuccess,
	onError,
	entertainmentShow
}: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
		data: IEntertainment,
		update: boolean
	) => {
		setIsLoading(true)
		try {
			if (update) {
				await baseAPI.patch(`entertainments/${entertainmentShow._id}`, data)
			} else {
				await baseAPI.post('entertainments', data)
				console.log('data', data)
			}
			onSuccess(update)
		} catch (error: any) {
			onError(error as any)
		} finally {
			setIsLoading(false)
		}
	}
	return {
		isLoading,
		handleSubmit
	}
}
