import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { RestaurantFormData } from '..'
import RestaurantMasterForm from './RestaurantMasterForm'
import { Spinner } from '../../../components/atoms'
import {
	useOnErrorFormSubmit,
	useOnSuccessFormSubmit,
	useSubmitForm
} from '../../../hooks'
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

	const { isLoading, handleSubmit } = useSubmitForm({
		onSuccess,
		onError,
		item: restaurant as IRestaurant,
		formDataMethods: RestaurantFormData
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
				/>
			)}
		</div>
	)
}

export default RestaurantSpecs
