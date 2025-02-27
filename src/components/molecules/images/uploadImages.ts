import baseAPI from 'src/axios/axiosConfig'
import { logger } from 'src/helper/debugging/logger'
import { IImage } from 'src/interfaces/image'
import { modelsWithImageUrlCaptions } from 'src/constants/modelsWithImageUrlCaptions'

export const uploadImages = async (
	entityType: string,
	entityId: string,
	imageUrls: string[] | IImage[]
) => {
	logger.info('Uploading images', { entityType, entityId, imageUrls })
	if (!imageUrls || imageUrls.length === 0) {
		return
	}

	// Función para verificar si item es un objeto de tipo IImage
	const isIImage = (item: unknown): item is IImage => {
		return typeof item === "object" && item !== null && "imageUrl" in item
	}

	const imageFiles = await Promise.all(
		imageUrls.map(async (item) => {
			if (isIImage(item)) {
				const response = await fetch(item.imageUrl)
				const blob = await response.blob()
				return new File(
					[blob],
					item.caption ? `${item.caption}.jpg` : 'image.jpg',
					{ type: 'image/jpeg' }
				)
			}
			// Caso general donde item es un string (URL)
			const response = await fetch(item);
			const blob = await response.blob();
			if (entityType === 'projects') {
				const file = new File([blob], 'image.pdf', { type: 'application/pdf' })
				return file
			}
			return new File([blob], 'image.jpg', { type: 'image/jpeg' })
		})
	)

	const formData = new FormData()
	imageFiles.forEach((file) => {
		if (modelsWithImageUrlCaptions.includes(entityType)) {
			formData.append('imageUrlCaptions', file)
		} else {
			formData.append('imageContentUrl', file)
		}
	})

	await baseAPI.patch(`${entityType}/images/${entityId}`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}
