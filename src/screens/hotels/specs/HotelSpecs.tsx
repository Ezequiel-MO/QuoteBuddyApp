import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import { HotelFormData, HotelMasterForm } from '..'
import {
	useOnErrorFormSubmit,
	useOnSuccessFormSubmit,
	useSubmitForm
} from '../../../hooks'
import { IHotel } from '@interfaces/hotel'

export const HotelSpecs: React.FC = () => {
	const [, setFormData] = useState<IHotel | null>(null)
	const [textContent, setTextContent] = useState<string | null>(null)
	const location = useLocation()
	const hotel = (location.state as { hotel: IHotel | {} })?.hotel

	const update = hotel && Object.keys(hotel).length > 0
	const { onSuccess } = useOnSuccessFormSubmit('Hotel', 'hotel', update)
	const { onError } = useOnErrorFormSubmit('Hotel')

	const { isLoading, handleSubmit } = useSubmitForm({
		onSuccess,
		onError,
		item: hotel as IHotel,
		formDataMethods: HotelFormData
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
