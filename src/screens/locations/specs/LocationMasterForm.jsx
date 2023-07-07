import { useRef, useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { LocationFormFields } from './LocationFormFields'
import { ModalPictures } from '../../../components/molecules'
import { useImageState } from '../../../hooks'
import { ShowImagesButton } from '../../../components/atoms'

const LocationMasterForm = ({
	submitForm,
	location,
	formData,
	setFormData,
	update
}) => {
	const [open, setOpen] = useState(false)
	const [textContent, setTextContent] = useState()
	const fileInput = useRef()

	const imagesLocation = location.imageContentUrl ?? []

	const { selectedFiles, handleFileSelection } = useImageState()

	const initialValues = {
		name: location?.name ?? '',
		longitude: location?.location?.coordinates[1] ?? '',
		latitude: location?.location?.coordinates[0] ?? '',
		textContent: location?.textContent ?? ''
	}

	return (
		<>
			<ModalPictures
				screen={location}
				submitForm={submitForm}
				open={open}
				setOpen={setOpen}
				initialValues={initialValues}
				multipleCondition={true}
				nameScreen="locations"
			/>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					values.textContent = textContent
					setFormData(values)
					submitForm(values, selectedFiles, 'locations', update)
				}}
				enableReinitialize
				validationSchema={Yup.object({
					name: Yup.string().required('Required'),
					longitude: Yup.number().required('Required'),
					latitude: Yup.number().required('Required')
				})}
			>
				{() => (
					<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
						<Form>
							<LocationFormFields
								location={location}
								textContent={textContent}
								setTextContent={setTextContent}
								imagesLocation={imagesLocation}
								update={update}
								fileInput={fileInput}
								handleFileSelection={handleFileSelection}
							/>
							<ShowImagesButton name={location.name} setOpen={setOpen} />
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}

export default LocationMasterForm
