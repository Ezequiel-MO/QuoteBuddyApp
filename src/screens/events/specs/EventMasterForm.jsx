import { useRef, useState } from 'react'
import { Form, Formik } from 'formik'
import {
	TextInput,
	SelectInput,
	CheckboxInput,
	RichTextEditor
} from '../../../ui'
import { Icon } from '@iconify/react'
import { useGetLocations, useImageState } from '../../../hooks'
import { ModalPictures } from '../../../components/molecules'
import { getValidationSchema } from './EventFormValidation'
import { getInitialValues } from './EventInitialValues'

const EventMasterForm = ({ submitForm, event }) => {
	const [open, setOpen] = useState(false)
	const [textContent, setTextContent] = useState()

	const update = Object.keys(event).length > 0 ? true : false

	const fileInput = useRef()
	const { locations } = useGetLocations()

	const initialValues = getInitialValues(event)
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
					submitForm(values, selectedFiles, 'events', update)
				}}
				enableReinitialize
				validationSchema={getValidationSchema()}
			>
				{(formik) => (
					<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
						<Form>
							<fieldset className="grid grid-cols-2 gap-4">
								<legend>
									<h1 className="text-2xl mb-4">General Event Data</h1>
								</legend>
								<div className="form-group mb-6">
									<TextInput
										label="Name"
										name="name"
										placeholder="Event Name"
										type="text"
									/>
									<SelectInput
										label="Group Location"
										name="city"
										placeholder="Barcelona ..."
										options={locations}
										value={formik.values.city}
									/>
									<div className="flex justify-between items-center mt-5">
										<TextInput
											label="Longitude"
											name="longitude"
											placeholder="ex : 2.154007"
											type="number"
											className="  
                      w-[150px]
                      px-2
                      py-1
                      ml-2
                      text-base
                      text-gray-700
                      border border-solid border-gray-300
                      rounded"
										/>
										<TextInput
											label="Latitude"
											name="latitude"
											placeholder="ex : 41.390205"
											type="number"
											className="  
                      w-[150px]
                      px-2
                      py-1
                      text-base
                      text-gray-700
                      border border-solid border-gray-300
                      rounded"
										/>
									</div>
									<div className="flex justify-between items-center mt-5">
										<TextInput
											label="Tour cost"
											name="price"
											placeholder="ex : 35"
											type="number"
											className="  
                      w-[150px]
                      px-2
                      py-1
                      text-base
                      text-gray-700
                      border border-solid border-gray-300
                      rounded"
										/>
										<CheckboxInput
											label="Price Per Person"
											name="pricePerPerson"
											checked={formik.values.pricePerPerson}
										/>
									</div>
								</div>
								<div className="form-group mb-6">
									<div style={{ marginTop: '25px', marginBottom: '40px' }}>
										<RichTextEditor
											screen={event}
											setTextContent={setTextContent}
											textContent={textContent}
											update={update}
										/>
									</div>

									<div className="flex flex-col items-start">
										{imagesEvents.length === 0 && (
											<label
												htmlFor="file-upload"
												className="custom-file-upload"
											>
												<Icon icon="akar-icons:cloud-upload" width="40" />
											</label>
										)}
										{imagesEvents.length === 0 && (
											<input
												id="file-upload"
												type="file"
												ref={fileInput}
												name="imageContentUrl"
												multiple
												disabled={update ? true : false}
												onChange={handleFileSelection}
											/>
										)}
									</div>
								</div>
								<input
									type="submit"
									className="cursor-pointer mt-5 py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
									value={update ? 'Edit Event Form' : 'Save new Event'}
								/>

								{event?.name && (
									<div className="flex align-center justify-start">
										<input
											onClick={() => setOpen(true)}
											type="button"
											className="cursor-pointer py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
											value="Show images"
										/>
									</div>
								)}
							</fieldset>
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

export default EventMasterForm
