import { useRef, useState } from 'react'
import { Form, Formik } from 'formik'
import { useGetLocations, useImageState } from '../../../hooks'
import { ModalPictures } from '../../../components/molecules'
import { getValidationSchema } from './EventFormValidation'
import { EventFormFields } from './EventFormFields'
import { generateFormValues } from '../../../helper'
import { formsValues } from '../../../constants'

const EventMasterForm = ({
	submitForm,
	event,
	setFormData,
	textContent,
	setTextContent,
	update
}) => {
	const [open, setOpen] = useState(false)

	const fileInput = useRef()
	const { locations } = useGetLocations()

	const initialValues = generateFormValues(formsValues.event, event)
	const imagesEvents =
		event.imageContentUrl === undefined ? [] : event.imageContentUrl

	const { selectedFiles, handleFileSelection } = useImageState()

	return (
		<>
			<ModalPictures
				screen={event}
				submitForm={submitForm}
				open={open}
				setOpen={setOpen}
				initialValues={initialValues}
				multipleCondition={true}
				nameScreen="events"
			/>

			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					values.textContent = textContent
					setFormData(values)
					submitForm(values, selectedFiles, 'events', update)
				}}
				enableReinitialize
				validationSchema={getValidationSchema()}
			>
				{(formik) => (
					<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
						<Form>
							<EventFormFields
								formik={formik}
								locations={locations}
								event={event}
								setTextContent={setTextContent}
								textContent={textContent}
								imagesEvents={imagesEvents}
								handleFileSelection={handleFileSelection}
								fileInput={fileInput}
								update={update}
								setOpen={setOpen}
							/>
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

export default EventMasterForm
