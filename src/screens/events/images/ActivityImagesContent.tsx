import React, { useState } from 'react'
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
import { useSensor, useSensors, KeyboardSensor } from '@dnd-kit/core'
import CustomPointerSensor from 'src/helper/dragndrop/CustomPointerSensor'
import { SortableItem } from 'src/helper/dragndrop/SortableItem'
import { useActivity } from '../context/ActivitiesContext'

const ActivityImagesContent: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const { state, dispatch } = useActivity()

	const handleImageUpload = async (file: File) => {
		setLoading(true)
		const formData = new FormData()
		formData.append('imageContentUrl', file)

		try {
			let newImageUrls: string[] = []
			if (state.update && state.currentActivity?._id) {
				const response = await baseAPI.patch(
					`events/images/${state.currentActivity._id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				newImageUrls = response.data.data.data.imageContentUrl
			} else {
				const blobUrl = URL.createObjectURL(file)
				newImageUrls = [blobUrl]
			}

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
		if (!state.currentActivity?.imageContentUrl) return

		try {
			const updatedImageUrls = [
				...(state.currentActivity.imageContentUrl || [])
			]
			const [deletedImageUrl] = updatedImageUrls.splice(index, 1)

			if (state.update && state.currentActivity._id) {
				await baseAPI.delete(`events/images/${state.currentActivity._id}`, {
					data: { imageUrl: deletedImageUrl }
				})
			}

			dispatch({
				type: 'UPDATE_ACTIVITY_FIELD',
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
			const oldIndex = state.currentActivity?.imageContentUrl?.findIndex(
				(url) => url === active.id
			)
			const newIndex = state.currentActivity?.imageContentUrl?.findIndex(
				(url) => url === over.id
			)
			if (
				oldIndex !== undefined &&
				newIndex !== undefined &&
				oldIndex !== -1 &&
				newIndex !== -1
			) {
				const updatedImageUrls = arrayMove(
					state.currentActivity?.imageContentUrl || [],
					oldIndex,
					newIndex
				)
				dispatch({
					type: 'UPDATE_ACTIVITY_FIELD',
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
				items={state.currentActivity?.imageContentUrl || []}
				strategy={verticalListSortingStrategy}
			>
				<div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
					{(state.currentActivity?.imageContentUrl || []).map(
						(imageSrc, index) => (
							<SortableItem
								key={imageSrc}
								id={imageSrc}
								imageSrc={imageSrc}
								onDelete={() => handleImageDelete(index)}
							/>
						)
					)}
					{(state.currentActivity?.imageContentUrl || []).length < 12 && (
						<Thumbnail
							onImageUpload={handleImageUpload}
							isLoading={loading}
							isMultiple={true}
							maxFiles={
								state.currentActivity?.imageContentUrl
									? 12 - state.currentActivity.imageContentUrl.length
									: 12
							}
						/>
					)}
				</div>
			</SortableContext>
		</DndContext>
	)
}

export default ActivityImagesContent
