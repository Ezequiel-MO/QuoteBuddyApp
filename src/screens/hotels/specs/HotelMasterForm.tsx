import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useHotel } from '../context/HotelsContext'
import { HotelFormFields } from './HotelFormFields'
import HotelImagesModal from '../images/HotelImagesModal'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetHotelFilters } from './resetHotelFields'
import { Button } from '@components/atoms'

export const HotelMasterForm = () => {
	const { state, dispatch } = useHotel()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity(
				'hotels',
				state.currentHotel,
				state.hotels || [],
				dispatch
			)
		} else {
			await createEntity(
				'hotels',
				state.currentHotel,
				state.currentHotel?.imageContentUrl || [],
				dispatch
			)
		}
		resetHotelFilters(dispatch, {
			city: '',
			numberStars: 0,
			numberRooms: 0
		})
		navigate('/app/hotel')
	}

	return (
		<form onSubmit={handleSubmit}>
			<HotelFormFields />
			<div className="flex justify-center m-6">
				<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
					{state.update ? 'Edit & Exit' : 'Submit'}
				</Button>
				<Button
					type="button"
					handleClick={openModal}
					icon="ph:image-light"
					widthIcon={30}
				>
					Add/Edit Images
				</Button>
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
