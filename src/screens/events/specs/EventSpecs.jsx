import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import EventMasterForm from './EventMasterForm'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { useEventForm } from './useEventSubmitForm'
import { Spinner } from '../../../components/atoms/spinner/Spinner'

const EventSpecs = () => {
	const [formData, setFormData] = useState(null)
	const [textContent, setTextContent] = useState(null)
	const navigate = useNavigate()
	const {
		state: { event }
	} = useLocation()

	const { isLoading, handleSubmit } = useEventForm({
		onSuccess: (update) => {
			toast.success(
				`${update ? 'Event Updated' : 'Event Created'}`,
				toastOptions
			)
			setTimeout(() => {
				navigate('/app/event')
			}, 1000)
		},
		onError: (error) => {
			toast.error(
				`Error Creating/Updating Event, ${error.response.data.message}`,
				errorToastOptions
			)
		},
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
				/>
			)}
		</div>
	)
}

export default EventSpecs
