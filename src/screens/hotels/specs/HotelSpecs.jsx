import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import { HotelMasterForm, useHotelForm } from '../'
import { useOnErrorFormSubmit, useOnSuccessFormSubmit } from '../../../hooks'

export const HotelSpecs = () => {
	const [, setFormData] = useState(null)
	const [textContent, setTextContent] = useState(null)
	const {
		state: { hotel }
	} = useLocation()

	const update = Object.keys(hotel).length > 0
	const { onSuccess } = useOnSuccessFormSubmit('Hotel', 'hotel', update)
	const { onError } = useOnErrorFormSubmit('Hotel')

	const { isLoading, handleSubmit } = useHotelForm({
		onSuccess,
		onError,
		hotel
	})

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<HotelMasterForm
					submitForm={handleSubmit}
					hotel={hotel}
					setFormData={setFormData}
					textContent={textContent}
					setTextContent={setTextContent}
					update={update}
				/>
			)}
		</div>
	)
}
