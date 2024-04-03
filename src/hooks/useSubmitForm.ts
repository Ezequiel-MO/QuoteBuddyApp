import { IAccManager } from '@interfaces/accManager'
import { ICountry } from '@interfaces/country'
import { IEntertainment } from '@interfaces/entertainment'
import { IEvent } from '@interfaces/event'
import { IHotel } from '@interfaces/hotel'
import { IRestaurant } from '@interfaces/restaurant'
import { INotafication } from '@interfaces/notification'
import { useState } from 'react'
import baseAPI from 'src/axios/axiosConfig'
import { IPayment } from '@interfaces/payment'

type itemTypes =
	| IHotel
	| IEntertainment
	| IAccManager
	| IEvent
	| IRestaurant
	| ICountry
	| INotafication
	| IPayment

interface FormDataMethods<T> {
	create: (values: T, files: File[]) => any
	update: (values: T) => any
	updateImageData?: (values: T, files: File[]) => any
}

interface Props<T> {
	onSuccess: (update: boolean) => void
	onError: (error: any) => void
	item: itemTypes
	formDataMethods: FormDataMethods<T>
}

export const useSubmitForm = <T extends { _id?: string }>({
	onSuccess,
	onError,
	item,
	formDataMethods
}: Props<T>) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [prevValues, setPrevValues] = useState<any>()
	const [prevFiles, setPrevFiles] = useState<File[]>()

	const handleSubmit = async (
		values: T,
		files: File[],
		endpoint: string,
		update: boolean
	) => {
		setIsLoading(true)

		let dataToPost
		const canUpdateImageData = files.length > 0 && update

		try {
			if (update && item._id) {
				let newEndpoint = endpoint.split('/').shift()
				dataToPost = formDataMethods.update(values)
				await baseAPI.patch(`${newEndpoint}/${item._id}`, dataToPost)
			}

			if (!update) {
				dataToPost = formDataMethods.create(values, files)
				await baseAPI.post(endpoint, dataToPost)
			}

			if (canUpdateImageData || (endpoint.includes('image') && update)) {
				dataToPost = formDataMethods.updateImageData!(values, files)
				await baseAPI.patch(`${endpoint}s/${item._id}`, dataToPost)
			}

			onSuccess(update)
		} catch (error: any) {
			setPrevValues(values)
			if (files.length > 0) {
				setPrevFiles(files)
			}
			onError(error)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		isLoading,
		handleSubmit,
		prevValues,
		setPrevValues,
		prevFiles,
		setPrevFiles
	}
}
