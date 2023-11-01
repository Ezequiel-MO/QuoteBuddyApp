import { useState, useEffect } from 'react'
import {IHotel , IEntertainment , IRestaurant , IEvent} from "src/interfaces"


interface ImageUrl {
	url: string
	name: string
}

export const useImageState = (initialScreen: IHotel | IEntertainment | IRestaurant | IEvent) => {
	const [imagePreviewUrls, setImagePreviewUrls] = useState<ImageUrl[]>([])
	const [filesImages, setFilesImages] = useState<File[]>([])
	const [deletedImage, setDeletedImage] = useState<string[]>([])

	const isUpdate = initialScreen && Object.keys(initialScreen).length > 0
	useEffect(() => {
		if (isUpdate && initialScreen?.imageContentUrl?.length) {
			const imageUrls = initialScreen.imageContentUrl.map((url) => ({
				url,
				name: url
			}))
			setImagePreviewUrls(imageUrls)
		}
	}, [initialScreen])

	return {
		imagePreviewUrls,
		setImagePreviewUrls,
		filesImages,
		setFilesImages,
		deletedImage,
		setDeletedImage,
		isUpdate
	}
}
