import React, { useState } from 'react'
import { useHotel } from '../context/HotelsContext'
import Thumbnail from '@components/molecules/Thumbnail'
import baseAPI from 'src/axios/axiosConfig'

const HotelImagesContent: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const { state, dispatch } = useHotel()

	const handleImageUpload = async (file: File) => {
		setLoading(true)
		const formData = new FormData()
		formData.append('imageContentUrl', file)

		try {
			let newImageUrls = []
			if (state.update && state.currentHotel?._id) {
				const response = await baseAPI.patch(
					`/hotels/images/${state.currentHotel._id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				newImageUrls = response.data.data.data.imageContentUrl
			} else {
				// New hotel - temporarily store image URL as blob
				const blobUrl = URL.createObjectURL(file)
				newImageUrls = [blobUrl]
			}

			// Dispatch the new action to append the new URLs to the existing list
			dispatch({
				type: 'APPEND_TO_ARRAY_FIELD',
				payload: {
					name: 'imageContentUrl',
					value: newImageUrls
				}
			})
		} catch (error: any) {
			console.error('Image upload failed:', error)
			alert('Image upload failed. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
			{(state.currentHotel?.imageContentUrl || []).map((imageSrc, index) => (
				<Thumbnail key={index} imageSrc={imageSrc} onImageUpload={() => {}} />
			))}
			{(state.currentHotel?.imageContentUrl || []).length < 12 && (
				<Thumbnail onImageUpload={handleImageUpload} isLoading={loading} />
			)}
		</div>
	)
}

export default HotelImagesContent
