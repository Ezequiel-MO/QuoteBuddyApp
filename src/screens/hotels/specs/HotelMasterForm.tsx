import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useHotel } from '../context/HotelsContext'
import { HotelFormFields } from './HotelFormFields'
import baseAPI from 'src/axios/axiosConfig'
import HotelImagesModal from '../images/HotelImagesModal'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'

export const HotelMasterForm = () => {
	const { state, dispatch } = useHotel()
	const navigate = useNavigate()

	const handleOpenModal = () => {
		dispatch({
			type: 'SET_IMAGES_MODAL_OPEN',
			payload: true
		})
	}

	const handleCloseModal = () => {
		dispatch({
			type: 'SET_IMAGES_MODAL_OPEN',
			payload: false
		})
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			if (!state.update) {
				// Create new hotel without images
				const { imageContentUrl, ...hotelData } = state.currentHotel || {}
				const response = await baseAPI.post('hotels', hotelData, {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				const newHotel = response.data.data.data

				// Convert blob URLs to real files and upload them
				if (imageContentUrl && imageContentUrl.length > 0) {
					const imageFiles = await Promise.all(
						imageContentUrl.map(async (url) => {
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

					await baseAPI.patch(`hotels/images/${newHotel._id}`, formData, {
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					})
				}

				dispatch({
					type: 'SET_HOTEL',
					payload: newHotel
				})
				toast.success('Hotel created successfully', toastOptions)
			} else {
				await baseAPI.patch(
					`hotels/${state.currentHotel?._id}`,
					state.currentHotel
				)
				toast.success('Hotel updated successfully', toastOptions)
			}
			navigate('/app/hotel')
		} catch (error: any) {
			toast.error(
				`Failed to create/update hotel, ${error.message}`,
				toastOptions
			)
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<HotelFormFields />
			<div className="flex justify-center m-6">
				<button
					type="submit"
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Submit
				</button>
				<button
					type="button"
					onClick={handleOpenModal}
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Add/Edit Images
				</button>
			</div>
			<HotelImagesModal
				isOpen={state.imagesModal}
				onClose={handleCloseModal}
				title="Add/Edit Images"
			/>
		</form>
	)
}

export default HotelMasterForm
