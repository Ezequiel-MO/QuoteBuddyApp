import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRestaurantSubmitForm } from '..'
import RestaurantMasterForm from './RestaurantMasterForm'
import { Spinner } from '../../../components/atoms'
import { useOnErrorFormSubmit, useOnSuccessFormSubmit } from '../../../hooks'
import { IRestaurant } from 'src/interfaces'

const RestaurantSpecs: React.FC = () => {
	const [, setFormData] = useState<IRestaurant | null>(null)
	const [textContent, setTextContent] = useState<string | null>(null)
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

	const { isLoading, handleSubmit } = useRestaurantSubmitForm({
		onSuccess,
		onError,
		restaurant
	})

	return (
		<div>
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
				/>
			)}
		</div>
	)
}

export default RestaurantSpecs
