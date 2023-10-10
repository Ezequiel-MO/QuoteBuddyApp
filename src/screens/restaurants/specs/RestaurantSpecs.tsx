import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import RestaurantMasterForm from './RestaurantMasterForm'
import { Spinner } from '../../../components/atoms'
import { useOnErrorFormSubmit, useOnSuccessFormSubmit } from '../../../hooks'
import { IRestaurant } from 'src/interfaces'
import { useRestaurantSubmitForm } from './useRestaurantSubmitForm'

const RestaurantSpecs: React.FC = () => {
	const [, setFormData] = useState<IRestaurant | null>(null)
	const [textContent, setTextContent] = useState<string>("")
	const {
		state: { restaurant }
	} = useLocation()

	const update = Object.keys(restaurant).length > 0

	const { onSuccess } = useOnSuccessFormSubmit(
		'Restaurant',
		'restaurant',
		update
	)
	const { onError } = useOnErrorFormSubmit('Restaurant')

	const { isLoading, handleSubmit, prevValues, prevFilesImages, prevFilesPdf } = useRestaurantSubmitForm({
		onSuccess,
		onError,
		restaurant
	})

	return (
		<div className="bg-gray-900 text-gray-200 min-h-screen flex justify-center items-center">
			{isLoading ? (
				<Spinner />
			) : (
				<RestaurantMasterForm
					submitForm={handleSubmit}
					restaurant={restaurant}
					setFormData={setFormData}
					textContent={textContent}
					setTextContent={setTextContent}
					update={update}
					preValues={prevValues}
					prevFilesImages={prevFilesImages}
					prevFilesPdf={prevFilesPdf}
				/>
			)}
		</div>
	)
}

export default RestaurantSpecs
