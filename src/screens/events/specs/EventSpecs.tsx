import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import EventMasterForm from './EventMasterForm'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import {
	useOnErrorFormSubmit,
	useOnSuccessFormSubmit,
	useSubmitForm
} from '../../../hooks'
import { IEvent } from '@interfaces/event'
import { EventFormData } from './EventFormData'

const EventSpecs = () => {
	const [, setFormData] = useState(null)
	const [textContent, setTextContent] = useState<string>("")
	const {
		state: { event }
	} = useLocation()

	const update = Object.keys(event).length > 0

	const { onSuccess } = useOnSuccessFormSubmit('Event', 'event', update)
	const { onError } = useOnErrorFormSubmit('Event')

	const { isLoading, handleSubmit } = useSubmitForm({
		onSuccess,
		onError,
		item: event as IEvent,
		formDataMethods: EventFormData
	})

	return (
		<div>
			{isLoading ? (
				<Spinner />
			) : (
				<EventMasterForm
					submitForm={handleSubmit}
					event={event}
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
