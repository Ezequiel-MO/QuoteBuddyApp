import React, { useState } from 'react'
import { useHotel } from '../context/HotelsContext'
import Thumbnail from '@components/molecules/Thumbnail'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { errorToastOptions } from 'src/helper/toast'
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { SortableItem } from '../../../helper/dragndrop/SortableItem'
import { useSensor, useSensors, KeyboardSensor } from '@dnd-kit/core'
import CustomPointerSensor from 'src/helper/dragndrop/CustomPointerSensor'

const HotelImagesContent: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const { state, dispatch } = useHotel()

	const handleImageUpload = async (file: File) => {
		setLoading(true)
		const formData = new FormData()
		formData.append('imageContentUrl', file)

		try {
			let newImageUrls: string[] = []
			if (state.update && state.currentHotel?._id) {
				const response = await baseAPI.patch(
					`hotels/images/${state.currentHotel._id}`,
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

	const handleImageDelete = async (index: number) => {
		if (!state.currentHotel?.imageContentUrl) return

		try {
			const updatedImageUrls = [...(state.currentHotel.imageContentUrl || [])]
			const [deletedImageUrl] = updatedImageUrls.splice(index, 1)

			// If updating an existing hotel, delete the image from the backend
			if (state.update && state.currentHotel._id) {
				await baseAPI.delete(`hotels/images/${state.currentHotel._id}`, {
					data: { imageUrl: deletedImageUrl }
				})
			}

			// Update the context with the new image URL list
			dispatch({
				type: 'UPDATE_HOTEL_FIELD',
				payload: {
					name: 'imageContentUrl',
					value: updatedImageUrls
				}
			})
		} catch (error: any) {
			console.error('Image deletion failed:', error)
			toast.error('Image deletion failed. Please try again.', errorToastOptions)
		}
	}

	const handleDragEnd = (event: any) => {
		const { active, over } = event
		if (active.id !== over.id) {
			const oldIndex = state.currentHotel?.imageContentUrl?.findIndex(
				(url) => url === active.id
			)
			const newIndex = state.currentHotel?.imageContentUrl?.findIndex(
				(url) => url === over.id
			)
			if (
				oldIndex !== undefined &&
				newIndex !== undefined &&
				oldIndex !== -1 &&
				newIndex !== -1
			) {
				const updatedImageUrls = arrayMove(
					state.currentHotel?.imageContentUrl || [],
					oldIndex,
					newIndex
				)
				dispatch({
					type: 'UPDATE_HOTEL_FIELD',
					payload: {
						name: 'imageContentUrl',
						value: updatedImageUrls
					}
				})
			}
		}
	}

	const sensors = useSensors(
		useSensor(CustomPointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={state.currentHotel?.imageContentUrl || []}
				strategy={verticalListSortingStrategy}
			>
				<div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
					{(state.currentHotel?.imageContentUrl || []).map(
						(imageSrc, index) => (
							<SortableItem
								key={imageSrc}
								id={imageSrc}
								imageSrc={imageSrc}
								onDelete={() => handleImageDelete(index)}
							/>
						)
					)}
					{(state.currentHotel?.imageContentUrl || []).length < 12 && (
						<Thumbnail
							onImageUpload={handleImageUpload}
							isLoading={loading}
							isMultiple={true}
							maxFiles={
								state.currentHotel?.imageContentUrl
									? 12 - state.currentHotel.imageContentUrl.length
									: 12
							}
						/>
					)}
				</div>
			</SortableContext>
		</DndContext>
	)
}

export default HotelImagesContent
