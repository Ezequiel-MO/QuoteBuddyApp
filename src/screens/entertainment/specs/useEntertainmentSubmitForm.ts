import { useState } from 'react'
import baseAPI from 'src/axios/axiosConfig'
import { IEntertainment } from 'src/interfaces/entertainment'
import { EntertainmentFormData } from './EntertainmentFormData'

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
		values: IEntertainment,
		files: File[],
		endpoint: string,
		update: boolean
	) => {
		setIsLoading(true)
		let dataToPost
		try {
			if (update) {
				dataToPost = EntertainmentFormData.update(values)
				await baseAPI.patch(
					`entertainments/${entertainmentShow._id}`,
					dataToPost
				)
			}

			if (!update) {
				dataToPost = EntertainmentFormData.create(values, files)
				await baseAPI.post('entertainments', dataToPost)
			}

			if (endpoint === 'entertainments/image') {
				dataToPost = EntertainmentFormData.updateImageData(values, files)
				console.log('entertainmentShow', entertainmentShow._id)
				await baseAPI.patch(
					`entertainments/images/${entertainmentShow._id}`,
					dataToPost
				)
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
