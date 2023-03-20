import { useRef, useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { TextInput, SelectInput, CheckboxInput } from '../../../ui'
import { Icon } from '@iconify/react'
import { useGetLocations } from '../../../hooks'
import { ModalPictures } from '../../../components/molecules'
import 'quill/dist/quill.snow.css'
import { toolbar } from './toolbar'
import { useCustomQuill } from './customQuillHook'

const EventMasterForm = ({ submitForm, event }) => {
	const [open, setOpen] = useState(false)
	const [textContent, setTextContent] = useState()
	const { quill, quillRef } = useCustomQuill({ modules: { toolbar } })

	const update = Object.keys(event).length > 0 ? true : false
	useEffect(() => {
		if (quill) {
			quill.on('text-change', () => {
				setTextContent(quillRef.current.firstChild.innerHTML)
			})

			if (update && event && event.textContent) {
				const escapedHtmlContent = JSON.parse(event.textContent)
				const htmlContent = escapedHtmlContent
					.replace(/\\(.)/g, '$1')
					.replace(/\\/g, '')
					.replace(/\[/g, '')
					.replace(/\]/g, '')
					.replace(/"/g, '')
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
					.replace(/&amp;/g, '&')

				const deltaContent = quill.clipboard.convert(htmlContent)
				quill.setContents(deltaContent)
			}
		}
	}, [quill, event, update])

	const fileInput = useRef()
	const { locations } = useGetLocations()

	const initialValues = {
		name: event?.name ?? '',
		city: event?.city ?? '',
		longitude: event?.location?.coordinates[1] ?? '',
		latitude: event?.location?.coordinates[0] ?? '',
		pricePerPerson: event?.pricePerPerson ?? true,
		price: event?.price ?? '',
		textContent: event?.textContent ?? ''
	}
	const imagesEvents =
		event.imageContentUrl === undefined ? [] : event.imageContentUrl

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
					values.textContent = JSON.stringify(textContent)
					const uploadedFiles = fileInput.current?.files ?? []
					submitForm(values, uploadedFiles, 'events', update)
				}}
				enableReinitialize
				validationSchema={Yup.object({
					name: Yup.string().required('Required'),
					city: Yup.string().required('Required'),
					longitude: Yup.number().required('Required'),
					latitude: Yup.number().required('Required'),
					pricePerPerson: Yup.boolean(),
					price: Yup.number().required('Required')
				})}
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
											/>
										)}
										<input
											type="submit"
											className="cursor-pointer mt-5 py-2 px-10 hover:bg-gray-600 bg-green-50 text-black-50 hover:text-white-50 fonrt-bold uppercase rounded-lg"
											value={update ? 'Edit Event Form' : 'Save new Event'}
										/>
									</div>
								</div>

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
							<div className="mt-2 w-[500px] p-2 bg-white-0 text-black-50">
								<div name="textContent" ref={quillRef}></div>
							</div>
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

export default EventMasterForm
