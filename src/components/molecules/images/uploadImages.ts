import baseAPI from 'src/axios/axiosConfig'
import { logger } from 'src/helper/debugging/logger'

export const uploadImages = async (
	entityType: string,
	entityId: string,
	imageUrls: string[]
) => {
	logger.info('Uploading images', { entityType, entityId, imageUrls })
	if (!imageUrls || imageUrls.length === 0) {
		return
	}

	const imageFiles = await Promise.all(
		imageUrls.map(async (url) => {
			const response = await fetch(url)
			const blob = await response.blob()
			if (entityType === 'projects') {
				const file = new File([blob], 'image.pdf', { type: 'application/pdf' })
			}
			const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })
			return file
		})
	)

	const formData = new FormData()
	imageFiles.forEach((file) => {
		formData.append('imageContentUrl', file)
	})

	await baseAPI.patch(`${entityType}/images/${entityId}`, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	})
}
