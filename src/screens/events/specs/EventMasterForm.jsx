import { useRef, useState } from 'react'
import { Form, Formik } from 'formik'
import { useGetLocations, useImageState } from '../../../hooks'
import { ModalPictures, AddImagesModal } from '../../../components/molecules'
import { ShowImagesButton } from '../../../components/atoms'
import { EventFormFields } from './EventFormFields'
import { generateFormValues } from '../../../helper'
import { VALIDATIONS, formsValues } from '../../../constants'

const EventMasterForm = ({
	submitForm,
	event,
	setFormData,
	textContent,
	setTextContent,
	update
}) => {
	const [open, setOpen] = useState(false)
	const [openAddModal, setOpenAddModal] = useState(false)
	const fileInput = useRef()
	const { locations } = useGetLocations()
	const initialValues = generateFormValues(formsValues.event, event)
	const imagesEvents =
		event.imageContentUrl === undefined ? [] : event.imageContentUrl

	const { selectedFiles, handleFileSelection, setSelectedFiles } =
		useImageState()

	return (
		<>
			<AddImagesModal
				open={openAddModal}
				setOpen={setOpenAddModal}
				selectedFiles={selectedFiles}
				setSelectedFiles={setSelectedFiles}
				handleFileSelection={handleFileSelection}
				fileInput={fileInput}
				multipleCondition={true}
			/>
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
				validationSchema={VALIDATIONS.event}
			>
				{(formik) => (
					<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
						<Form className="relative">
							<EventFormFields
								formik={formik}
								locations={locations}
								event={event}
								setTextContent={setTextContent}
								textContent={textContent}
								update={update}
							/>
							<ShowImagesButton
								name={true}
								setOpen={(update && setOpen) || setOpenAddModal}
								nameValue={!update && 'add images'}
							>
								{!update && (
									<span>
										{`${selectedFiles.length} files selected for upload`}
									</span>
								)}
							</ShowImagesButton>
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

export default EventMasterForm
