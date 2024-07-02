import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useHotel } from '../context/HotelsContext'
import { HotelFormFields } from './HotelFormFields'
import baseAPI from 'src/axios/axiosConfig'
import HotelImagesModal from '../images/HotelImagesModal'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { uploadImages } from '@components/molecules/images/uploadImages'

export const HotelMasterForm = () => {
	const { state, dispatch } = useHotel()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update
		try {
			if (isUpdating) {
				await baseAPI.patch(
					`hotels/${state.currentHotel?._id}`,
					state.currentHotel
				)
				toast.success('Hotel updated successfully', toastOptions)
			} else {
				const { imageContentUrl, ...hotelData } = state.currentHotel || {}
				const response = await baseAPI.post('hotels', hotelData, {
					headers: {
						'Content-Type': 'application/json'
					}
				})
				const newHotel = response.data.data.data
				await uploadImages('hotels', newHotel._id, imageContentUrl || [])
				dispatch({
					type: 'SET_HOTEL',
					payload: newHotel
				})
				toast.success('Hotel created successfully', toastOptions)
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
					onClick={openModal}
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Add/Edit Images
				</button>
			</div>
			<HotelImagesModal
				isOpen={state.imagesModal}
				onClose={closeModal}
				title="Add/Edit Images"
			/>
		</form>
	)
}

export default HotelMasterForm
