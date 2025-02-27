import React, { useState, useEffect } from 'react'
import Thumbnail from '@components/molecules/Thumbnail'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from 'src/helper/toast'
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
import { ImageUrlCaptionModal } from '../../../components/atoms/modal/ImageUrlCaptionModal'
import { IImage } from 'src/interfaces/image'

interface ISortableImage extends IImage {
	id: string
}

const ActivityImagesContent: React.FC = () => {
	const [loading, setLoading] = useState(false)

	const [expandedThumbnail, setExpandedThumbnail] = useState<IImage>()

	const [openModal, setOpenModal] = useState(false)

	const { state, dispatch } = useActivity()

	const handleImageUpload = async (file: File) => {
		setLoading(true)
		let newImageUrls: IImage[] = []
		const loadingToast = toast.loading('please wait!')
		try {
			if (state.update && state.currentActivity?._id) {
				const formData = new FormData()
				const extension = file.name.slice(file.name.lastIndexOf('.'))
				const updateFile = new File(
					[file],
					`image${extension}`,
					{ type: 'image/jpeg' }
				)
				formData.append('imageUrlCaptions', updateFile)
				const response = await baseAPI.patch(
					`events/images/${state.currentActivity._id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				const imageContentUrlUpdate: IImage[] = response.data.data.data.imageUrlCaptions
				newImageUrls.push(imageContentUrlUpdate[imageContentUrlUpdate.length - 1])
				toast.success(`Image added successfully`, toastOptions)
			} else {
				// New Event(activity) - temporarily store image URL as blob
				const blobUrl = URL.createObjectURL(file)
				newImageUrls = [{ imageUrl: blobUrl, caption: '' }]
			}
			// Dispatch the new action to append the new URLs to the existing list
			dispatch({
				type: 'APPEND_TO_ARRAY_FIELD',
				payload: {
					name: 'imageUrlCaptions',
					value: newImageUrls
				}
			})
			//mantengo los cambios en "imageContentUrl"(legacy), REVISAR
			dispatch({
				type: 'APPEND_TO_ARRAY_FIELD',
				payload: {
					name: 'imageContentUrl',
					value: newImageUrls.map((el) => el.imageUrl)
				}
			})
		} catch (error: any) {
			console.error('Image upload failed:', error)
			alert('Image upload failed. Please try again.')
		} finally {
			toast.dismiss(loadingToast)
			setLoading(false)
		}
	}

	const handleImageDelete = async (index: number) => {
		if (!state.currentActivity?.imageContentUrl) {
			return
		}
		const loadingToast = toast.loading('please wait!')
		try {
			const updatedImageUrls = [
				...(state.currentActivity.imageUrlCaptions || [])
			]
			const [deletedImageUrl] = updatedImageUrls.splice(index, 1)
			if (state.update && state.currentActivity._id) {
				await baseAPI.delete(`events/images/${state.currentActivity._id}`, {
					data: {
						imageUrl: deletedImageUrl.imageUrl,
						_id: deletedImageUrl._id
					}
				})
			}
			// Update the context with the new image URL list
			dispatch({
				type: 'UPDATE_ACTIVITY_FIELD',
				payload: {
					name: 'imageUrlCaptions',
					value: updatedImageUrls
				}
			})
			//mantengo los cambios en "imageContentUrl"(legacy)
			dispatch({
				type: 'UPDATE_ACTIVITY_FIELD',
				payload: {
					name: 'imageContentUrl',
					value: updatedImageUrls.map((el) => el.imageUrl)
				}
			})
			toast.success(`Image deleted  successfully`, toastOptions)
		} catch (error: any) {
			console.error('Image deletion failed:', error)
			toast.error('Image deletion failed. Please try again.', errorToastOptions)
		} finally {
			toast.dismiss(loadingToast)
		}
	}

	const handleOpenImageUrlCaptionModal = (imageSrc: IImage) => {
		setOpenModal((prev) => !prev)
		setExpandedThumbnail(imageSrc)
	}

	const handleCaptionSubmit = async (updateImageUrlCaption: IImage) => {
		setLoading(true)
		const loadingToast = toast.loading('please wait!')
		try {
			if (state.update && state.currentActivity?._id && updateImageUrlCaption._id) {
				const updateData = {
					caption: updateImageUrlCaption.caption,
					idImageUrlCaption: updateImageUrlCaption._id
				}
				const response = await baseAPI.patch(
					`events/images/${state.currentActivity._id}`,
					updateData
				)
				dispatch({
					type: 'UPDATE_ACTIVITY_FIELD',
					payload: {
						name: 'imageUrlCaptions',
						value: response.data.data.data.imageUrlCaptions
					}
				})
				toast.success('Image Caption update', toastOptions)
				setTimeout(() => {
					setOpenModal(false)
				}, 700)
				return
			}
			//por default no va ser un update
			const findImageUrlCaptionIndex = state.currentActivity?.imageUrlCaptions?.findIndex((el) => el.imageUrl === updateImageUrlCaption.imageUrl) as number
			if (findImageUrlCaptionIndex === -1) {
				throw Error('Image not found')
			}
			const updateImageUrlCaptions = state.currentActivity?.imageUrlCaptions
				? [...state.currentActivity?.imageUrlCaptions]
				: []
			updateImageUrlCaptions[findImageUrlCaptionIndex] = updateImageUrlCaption
			dispatch({
				type: 'UPDATE_ACTIVITY_FIELD',
				payload: {
					name: 'imageUrlCaptions',
					value: updateImageUrlCaptions
				}
			})
			setTimeout(() => {
				setOpenModal(false)
			}, 700)
			return
		} catch (error: any) {
			console.error(error)
			toast.error(error.message, errorToastOptions)
		} finally {
			toast.dismiss(loadingToast)
			setLoading(false)
		}
	}

	const handleDragEnd = (event: any) => {
		const { active, over } = event
		if (active.id !== over.id) {
			const oldIndex = state.currentActivity?.imageUrlCaptions?.findIndex(
				(url) => url.imageUrl === active.id
			)
			const newIndex = state.currentActivity?.imageUrlCaptions?.findIndex(
				(url) => url.imageUrl === over.id
			)
			if (
				oldIndex !== undefined &&
				newIndex !== undefined &&
				oldIndex !== -1 &&
				newIndex !== -1
			) {
				const updatedImageUrls = arrayMove(
					state.currentActivity?.imageUrlCaptions || [],
					oldIndex,
					newIndex
				)
				dispatch({
					type: 'UPDATE_ACTIVITY_FIELD',
					payload: {
						name: 'imageUrlCaptions',
						value: updatedImageUrls
					}
				})
				//mantengo los cambios en "imageContentUrl"(legacy)
				dispatch({
					type: 'UPDATE_ACTIVITY_FIELD',
					payload: {
						name: 'imageContentUrl',
						value: updatedImageUrls.map((el) => el.imageUrl)
					}
				})
			}
		}
	}

	const sensors = useSensors(
		useSensor(CustomPointerSensor, {
			activationConstraint: {
				distance: 5
			}
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	// array para el drag and drop @dnd-kit/sortable
	const [imageUrlCaptions, setImageUrlCaptions] = useState<ISortableImage[]>([])
	useEffect(() => {
		if (state.currentActivity?.imageUrlCaptions && Array.isArray(state.currentActivity?.imageUrlCaptions)) {
			const updateImageUrlCaptions = state.currentActivity?.imageUrlCaptions?.map(
				(el) => ({
					imageUrl: el?.imageUrl ?? '',
					caption: el?.caption ?? '',
					_id: el?._id ?? '',
					id: el?.imageUrl ?? ''
				})
			)
			setImageUrlCaptions(updateImageUrlCaptions || [])
		}
	}, [state.currentActivity?.imageUrlCaptions])

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<ImageUrlCaptionModal
				open={openModal}
				setOpen={setOpenModal}
				imageUrlCaption={expandedThumbnail as IImage}
				loading={loading}
				captionSubmit={(value) => handleCaptionSubmit(value)}
			/>
			<SortableContext
				items={imageUrlCaptions || []}
				strategy={verticalListSortingStrategy}
			>
				<div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
					{(imageUrlCaptions || []).map(
						(imageSrc, index) => (
							<SortableItem
								key={imageSrc.imageUrl}
								id={imageSrc.imageUrl}
								imageSrc={imageSrc.imageUrl}
								onDelete={() => handleImageDelete(index)}
								onToggleExpand={() => handleOpenImageUrlCaptionModal(imageSrc)}
								isCaption={imageSrc?.caption.length > 0 ? true : false}
							/>
						)
					)}
					{(state.currentActivity?.imageUrlCaptions || []).length < 12 && (
						<Thumbnail
							onImageUpload={handleImageUpload}
							isLoading={loading}
							isMultiple={true}
							maxFiles={
								state.currentActivity?.imageUrlCaptions
									? 12 - state.currentActivity.imageUrlCaptions.length
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
