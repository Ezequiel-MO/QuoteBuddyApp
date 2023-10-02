import { useState } from 'react'
import { Spinner } from '@components/atoms'
import { useEntertainmentSubmitForm } from './useEntertainmentSubmitForm'
import { EntertainmentMasterForm } from './EntertainmentMasterForm'
import { useLocation } from 'react-router-dom'
import {
	useOnErrorFormSubmit,
	useOnSuccessFormSubmit,
	useSubmitForm
} from 'src/hooks'
import { IEntertainment } from '@interfaces/entertainment'
import { EntertainmentFormData } from './EntertainmentFormData'

export const EntertainmentSpecs = () => {
	const [, setFormData] = useState(null)
	const [textContent, setTextContent] = useState<string>('')
	const {
		state: { entertainmentShow }
	} = useLocation()

	const update = Object.keys(entertainmentShow).length > 0

	const { onSuccess } = useOnSuccessFormSubmit(
		'Entertainment',
		'entertainment',
		update
	)

	const { onError } = useOnErrorFormSubmit('Entertainment')

	const { isLoading, handleSubmit } = useSubmitForm({
		onSuccess,
		onError,
		item: entertainmentShow as IEntertainment,
		formDataMethods: EntertainmentFormData
	})

	return (
		<div className="bg-gray-900 text-gray-200 min-h-screen flex justify-center items-center">
			{isLoading ? (
				<Spinner />
			) : (
				<EntertainmentMasterForm
					submitForm={handleSubmit}
					entertainmentShow={entertainmentShow}
					setFormData={setFormData}
					textContent={textContent}
					setTextContent={setTextContent}
					update={update}
				/>
			)}
		</div>
	)
}
