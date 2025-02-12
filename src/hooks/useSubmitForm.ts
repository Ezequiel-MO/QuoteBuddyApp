import { IAccManager } from '@interfaces/accManager'
import { ICountry } from '@interfaces/country'
import { IEntertainment } from '@interfaces/entertainment'
import { IEvent } from '@interfaces/event'
import { IHotel } from '@interfaces/hotel'
import { IRestaurant } from '@interfaces/restaurant'
import { INotification } from '@interfaces/notification'
import { IVendorInvoice } from 'src/interfaces/vendorInvoice'
import { useState } from 'react'
import baseAPI from 'src/axios/axiosConfig'
import { IPayment } from '@interfaces/payment'
import { toast } from 'react-toastify'
import { IOtherOperational } from '@interfaces/otherOperational'
import { IAudiovisual } from '@interfaces/audiovisual'

type itemTypes =
	| IHotel
	| IEntertainment
	| IAccManager
	| IEvent
	| IRestaurant
	| IAudiovisual
	| ICountry
	| INotification
	| IPayment
	| IVendorInvoice
	| IOtherOperational

type OptionalItemTypes = Partial<itemTypes>

interface FormDataMethods<T> {
	create: (values: T, files: File[]) => any
	update: (values: T) => any
	updateImageData?: (values: T, files: File[]) => any
}

interface Props<T> {
	onSuccess: (update: boolean) => void
	onError: (error: any) => void
	item: OptionalItemTypes
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
		const loadingToast = toast.loading('please wait!')
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
			toast.dismiss(loadingToast)
			onSuccess(update)
		} catch (error: any) {
			toast.dismiss(loadingToast)
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
