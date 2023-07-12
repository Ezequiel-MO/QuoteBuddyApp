import { useRef, useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { LocationFormFields } from './LocationFormFields'
import { ModalPictures } from '../../../components/molecules'
import { useImageState } from '../../../hooks'
import { ShowImagesButton } from '../../../components/atoms'

const LocationMasterForm = ({ submitForm, location, update }) => {
	const [open, setOpen] = useState(false)
	const [textContent, setTextContent] = useState()
	const fileInput = useRef()

	const imagesLocation = location.imageContentUrl ?? []

	const { selectedFiles, handleFileSelection } = useImageState()

	const initialValues = {
		name: location?.name ?? '',
		longitude: location?.location?.coordinates[1] ?? '',
		latitude: location?.location?.coordinates[0] ?? '',
		textContent: location?.textContent ?? '',
		inFigures: location?.inFigures ?? [{ title: '', description: '' }],
		corporateFacts: location?.corporateFacts ?? [{ title: '', description: '' }]
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
					values.inFigures = values.inFigures.filter(
						(item) => item.title.trim() !== '' || item.description.trim() !== ''
					)
					values.corporateFacts = values.corporateFacts.filter(
						(item) => item.title.trim() !== '' || item.description.trim() !== ''
					)
					submitForm(values, selectedFiles, 'locations', update)
				}}
				enableReinitialize
				validationSchema={Yup.object({
					name: Yup.string().required('Required'),
					longitude: Yup.number().required('Required'),
					latitude: Yup.number().required('Required'),
					inFigures: Yup.array().of(
						Yup.object().shape({
							title: Yup.string(),
							description: Yup.string()
						})
					),
					corporateFacts: Yup.array().of(
						Yup.object().shape({
							title: Yup.string(),
							description: Yup.string()
						})
					)
				})}
			>
				{(formikProps) => (
					<div className="p-6 rounded-lg">
						<Form className="relative">
							<LocationFormFields
								location={location}
								textContent={textContent}
								setTextContent={setTextContent}
								imagesLocation={imagesLocation}
								update={update}
								fileInput={fileInput}
								handleFileSelection={handleFileSelection}
								formikProps={formikProps}
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
