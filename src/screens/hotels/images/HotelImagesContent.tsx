import React, { useState, useEffect } from 'react'
import { useHotel } from '../context/HotelsContext'
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
import { SortableItem } from '../../../helper/dragndrop/SortableItem'
import { useSensor, useSensors, KeyboardSensor } from '@dnd-kit/core'
import CustomPointerSensor from 'src/helper/dragndrop/CustomPointerSensor'
import { ImageUrlCaptionModal } from '../../../components/atoms/modal/ImageUrlCaptionModal'
import { IImage } from 'src/interfaces/image'

const HotelImagesContent: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [expandedThumbnail, setExpandedThumbnail] = useState<IImage>()
	const [openModal, setOpenModal] = useState(false)
	const { state, dispatch } = useHotel()

	const handleImageUpload = async (file: File) => {
		setLoading(true)
		let newImageUrls: IImage[] = []
		const loadingToast = toast.loading('please wait!')
		try {
			if (state.update && state.currentHotel?._id) {
				const formData = new FormData()
				formData.append('imageUrlCaptions', file)
				const response = await baseAPI.patch(
					`hotels/images/${state.currentHotel._id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				const imageContentUrlUpdate: IImage[] =
					response.data.data.data.imageUrlCaptions
				newImageUrls.push(
					imageContentUrlUpdate[imageContentUrlUpdate.length - 1]
				)
				toast.success(`Image added successfully`, toastOptions)
			} else {
				// New hotel - temporarily store image URL as blob
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
		if (!state.currentHotel?.imageContentUrl) {
			return
		}
		const loadingToast = toast.loading('please wait!')
		try {
			const updatedImageUrls = [...(state.currentHotel.imageUrlCaptions || [])]
			const [deletedImageUrl] = updatedImageUrls.splice(index, 1)
			// If updating an existing hotel, delete the image from the backend
			if (state.update && state.currentHotel._id) {
				await baseAPI.delete(`hotels/images/${state.currentHotel._id}`, {
					data: {
						imageUrl: deletedImageUrl.imageUrl,
						idImageUrlCaption: deletedImageUrl._id
					}
				})
			}
			// Update the context with the new image URL list
			dispatch({
				type: 'UPDATE_HOTEL_FIELD',
				payload: {
					name: 'imageUrlCaptions',
					value: updatedImageUrls
				}
			})
			//mantengo los cambios en "imageContentUrl"(legacy)
			dispatch({
				type: 'UPDATE_HOTEL_FIELD',
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
			if (
				state.update &&
				state.currentHotel?._id &&
				updateImageUrlCaption._id
			) {
				const updateData = {
					caption: updateImageUrlCaption.caption,
					idImageUrlCaption: updateImageUrlCaption._id
				}
				const response = await baseAPI.patch(
					`hotels/images/${state.currentHotel._id}`,
					updateData
				)
				dispatch({
					type: 'UPDATE_HOTEL_FIELD',
					payload: {
						name: 'imageUrlCaptions',
						value: response.data.data.data.imageUrlCaptions
					}
				})
				toast.dismiss(loadingToast)
				toast.success('Image Caption update', toastOptions)
				setTimeout(() => {
					setOpenModal(false)
				}, 700)
				return
			}
			//por default no va ser un update
			const findImageUrlCaptionIndex =
				state.currentHotel?.imageUrlCaptions?.findIndex(
					(el) => el.imageUrl === updateImageUrlCaption.imageUrl
				)
			if (findImageUrlCaptionIndex === -1) {
				throw Error('Image not found')
			}
			const updateImageUrlCaptions = state.currentHotel?.imageUrlCaptions
				? [...state.currentHotel?.imageUrlCaptions]
				: []
			updateImageUrlCaptions[findImageUrlCaptionIndex as number] =
				updateImageUrlCaption
			dispatch({
				type: 'UPDATE_HOTEL_FIELD',
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
			const oldIndex = state.currentHotel?.imageUrlCaptions?.findIndex(
				(url) => url.imageUrl === active.id
			)
			const newIndex = state.currentHotel?.imageUrlCaptions?.findIndex(
				(url) => url.imageUrl === over.id
			)
			if (
				oldIndex !== undefined &&
				newIndex !== undefined &&
				oldIndex !== -1 &&
				newIndex !== -1
			) {
				const updatedImageUrls = arrayMove(
					state.currentHotel?.imageUrlCaptions || [],
					oldIndex,
					newIndex
				)
				dispatch({
					type: 'UPDATE_HOTEL_FIELD',
					payload: {
						name: 'imageUrlCaptions',
						value: updatedImageUrls
					}
				})
				//mantengo los cambios en "imageContentUrl"(legacy)
				dispatch({
					type: 'UPDATE_HOTEL_FIELD',
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
	const [imageUrlCaptions, setImageUrlCaptions] = useState<any[]>([])
	useEffect(() => {
		if (
			state.currentHotel?.imageUrlCaptions &&
			state.currentHotel?.imageUrlCaptions.length > 0
		) {
			const updateImageUrlCaptions = state.currentHotel?.imageUrlCaptions?.map(
				(el) => ({
					imageUrl: el?.imageUrl ?? '',
					caption: el?.caption ?? '',
					_id: el?._id ?? '',
					id: el?.imageUrl ?? ''
				})
			)
			setImageUrlCaptions(updateImageUrlCaptions || [])
		}
	}, [state.currentHotel?.imageUrlCaptions])

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
					{(state.currentHotel?.imageUrlCaptions || []).map(
						(imageSrc, index) => (
							<SortableItem
								key={imageSrc?.imageUrl}
								id={imageSrc?.imageUrl}
								imageSrc={imageSrc?.imageUrl}
								onDelete={() => handleImageDelete(index)}
								onToggleExpand={() => handleOpenImageUrlCaptionModal(imageSrc)}
							/>
						)
					)}
					{(state.currentHotel?.imageUrlCaptions || []).length < 12 && (
						<Thumbnail
							onImageUpload={handleImageUpload}
							isLoading={loading}
							isMultiple={true}
							maxFiles={
								state.currentHotel?.imageUrlCaptions
									? 12 - state.currentHotel.imageUrlCaptions.length
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
