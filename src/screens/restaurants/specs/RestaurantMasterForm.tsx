import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRestaurant } from '../context/RestaurantsContext'
import RestaurantImagesModal from '../images/RestaurantImagesModal'
import { RestaurantFormFields } from './RestaurantFormFields'
import { useImageModal } from 'src/hooks/images/useImageModal'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetRestaurantFilters } from './resetRestaurantFields'
import { Button } from '@components/atoms'
import { RestaurantPdfModal } from '../pdf/RestaurantPdfModal'
import { usePdfState } from 'src/hooks'
import { uploadPDF } from '@components/molecules/pdf/uploadPDF'

const RestaurantMasterForm = () => {
	const { state, dispatch } = useRestaurant()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const [openAddPdfModal, setOpenAddPdfModal] = useState(false)

	const { selectedFilesPdf, setSelectedFilesPdf } = usePdfState()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity(
				'restaurants',
				state.currentRestaurant,
				state.restaurants || [],
				dispatch
			)
		} else {
			const dataCreateRestaurant = {
				...state.currentRestaurant,
				imageUrlCaptions: [],
				imageContentUrl: [],
				pdfMenus: [],
			}
			const createRestaurant = await createEntity(
				'restaurants',
				dataCreateRestaurant,
				state.currentRestaurant?.imageUrlCaptions || [],
				dispatch
			)
			if(createRestaurant && createRestaurant?._id && state.currentRestaurant?.pdfMenus){
				await uploadPDF('restaurants/pdfMenu' , createRestaurant._id ,  state.currentRestaurant?.pdfMenus , 'pdfMenus' , 'restaurants' )
			}
		}
		resetRestaurantFilters(dispatch, {
			city: '',
			isVenue: false,
			price: 0
		})
		navigate('/app/restaurant')
	}
	return (
		<form onSubmit={handleSubmit}>
			<RestaurantFormFields />
			<div className="flex justify-center m-6">
				<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
					{state.update ? 'Edit & Exit' : 'Submit'}
				</Button>
				<RestaurantImagesModal
					isOpen={state.imagesModal}
					onClose={closeModal}
					title="Add/Edit Restaurant Images"
				/>
				<Button
					type="button"
					handleClick={openModal}
					icon="ph:image-light"
					widthIcon={30}
				>
					Add/Edit Images
				</Button>
				<RestaurantPdfModal
					isOpen={openAddPdfModal}
					onClose={() => setOpenAddPdfModal(false)}
					title="Add/Edit Restaurant PDF"
					selectedFilesPdf={selectedFilesPdf}
					setSelectedFilesPdf={setSelectedFilesPdf}
				/>
				<Button
					type="button"
					handleClick={() => setOpenAddPdfModal(true)}
					icon="mingcute:pdf-line"
					widthIcon={30}
				>
					UPLOAD PDF
				</Button>
			</div>
		</form>
	)
}

export default RestaurantMasterForm
