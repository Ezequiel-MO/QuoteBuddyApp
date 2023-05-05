import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import EventMasterForm from './EventMasterForm'
import { useEventForm } from './useEventSubmitForm'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import { useOnErrorFormSubmit, useOnSuccessFormSubmit } from '../../../hooks'

const EventSpecs = () => {
	const [formData, setFormData] = useState(null)
	const [textContent, setTextContent] = useState(null)
	const {
		state: { event }
	} = useLocation()

	const update = Object.keys(event).length > 0
	const { onSuccess } = useOnSuccessFormSubmit('Event', 'event', update)
	const { onError } = useOnErrorFormSubmit('Event')

	const { isLoading, handleSubmit } = useEventForm({
		onSuccess,
		onError,
		event
	})

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<EventMasterForm
					submitForm={handleSubmit}
					event={event}
					formData={formData}
					setFormData={setFormData}
					textContent={textContent}
					setTextContent={setTextContent}
					update={update}
				/>
			)}
		</div>
	)
}

export default EventSpecs
