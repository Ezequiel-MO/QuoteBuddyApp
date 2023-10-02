import { IEntertainment } from '@interfaces/entertainment'
import { IHotel } from '@interfaces/hotel'
import { useState } from 'react'
import baseAPI from 'src/axios/axiosConfig'

interface FormDataMethods<T> {
	create: (values: T, files: File[]) => any
	update: (values: T) => any
	updateImageData: (values: T, files: File[]) => any
}

interface Props<T> {
	onSuccess: (update: boolean) => void
	onError: (error: any) => void
	item: IHotel | IEntertainment
	formDataMethods: FormDataMethods<T>
}

export const useSubmitForm = <T extends { _id?: string }>({
	onSuccess,
	onError,
	item,
	formDataMethods
}: Props<T>) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSubmit = async (
		values: T,
		files: File[],
		endpoint: string,
		update: boolean
	) => {
		setIsLoading(true)

		let dataToPost
		try {
			if (update && item._id) {
				dataToPost = formDataMethods.update(values)
				await baseAPI.patch(`${endpoint}/${item._id}`, dataToPost)
			}

			if (!update) {
				dataToPost = formDataMethods.create(values, files)
				await baseAPI.post(endpoint, dataToPost)
			}

			if (files.length > 0 && item._id) {
				dataToPost = formDataMethods.updateImageData(values, files)
				await baseAPI.patch(`${endpoint}/images/${item._id}`, dataToPost)
			}

			onSuccess(update)
		} catch (error: any) {
			onError(error)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		handleSubmit
	}
}
