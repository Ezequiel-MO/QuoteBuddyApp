import baseAPI from 'src/axios/axiosConfig'

export const uploadImages = async (
	entityType: string,
	entityId: string,
	imageUrls: string[]
) => {
	if (!imageUrls || imageUrls.length === 0) {
		return
	}

	const imageFiles = await Promise.all(
		imageUrls.map(async (url) => {
			const response = await fetch(url)
			const blob = await response.blob()
			const file = new File([blob], 'image.jpg', { type: blob.type })
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
