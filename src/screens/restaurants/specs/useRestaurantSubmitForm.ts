import { useState } from 'react'
import { RestaurantFormData } from '..'
import baseAPI from '../../../axios/axiosConfig'
import { IRestaurant } from 'src/interfaces'

interface Props {
	onSuccess: (update: boolean) => void
	onError: (error: any) => void
	restaurant: IRestaurant
}

interface IRestaurantValues extends IRestaurant {
	longitude: number
	latitude: number
	deletedImage?: string[]
}

interface ReturnProps {
	handleSubmit: (
		values: IRestaurantValues,
		files: File[],
		endpoint: string,
		update: boolean
	) => Promise<void>
	isLoading: boolean
	prevValues:IRestaurant
}

export const useRestaurantSubmitForm = ({
	onSuccess,
	onError,
	restaurant
}: Props): ReturnProps => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	// guardo los valores previos si hay un error
	const [prevValues , setPrevValues] = useState<any>() 
	const [prevFilesImages , setPrevFilesImages] = useState<File[]>() 
	const [prevFilesPdf , setPrevFilesPdf] = useState<File[]>() 

	const handleSubmit = async (
		values: IRestaurantValues,
		files: File[],
		endpoint: string,
		update: boolean
	) => {
		setIsLoading(true)
		let dataToPost
		try {
			if (update) {
				dataToPost = RestaurantFormData.update(values)
				await baseAPI.patch(`restaurants/${restaurant._id}`, dataToPost)
			}
			if (!update) {
				dataToPost = RestaurantFormData.create(values, files)
				await baseAPI.post('restaurants', dataToPost)
			}
			if (endpoint === 'restaurants/image') {
				dataToPost = RestaurantFormData.updateImageData(values, files)
				await baseAPI.patch(`restaurants/images/${restaurant._id}`, dataToPost)
			}
			if (endpoint === 'restaurants/pdf') {
				dataToPost = RestaurantFormData.updatePdfData(values, files)
				await baseAPI.patch(
					`/restaurants/pdfMenu/${restaurant._id}`,
					dataToPost
				)
			}

			onSuccess(update)
		} catch (error) {
			//guardo los valores previos si el servidor(back-end) manda un error
			setPrevValues(values)
			onError(error)
		} finally {
			setIsLoading(false)
		}
	}

	return { handleSubmit, isLoading, prevValues }
}
