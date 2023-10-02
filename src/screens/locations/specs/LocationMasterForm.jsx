import { useRef, useState } from 'react'
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { LocationFormFields } from './LocationFormFields'
import { ModalPictures, AddImagesModal } from '../../../components/molecules'
import { useImageState } from '../../../hooks'
import { ShowImagesButton } from '../../../components/atoms'
import { generateFormValues } from 'src/helper'
import { formsValues } from 'src/constants'

const LocationMasterForm = ({ submitForm, location, update }) => {
	const [open, setOpen] = useState(false)
	const [openAddModal, setOpenAddModal] = useState(false)
	const [textContent, setTextContent] = useState()
	const fileInput = useRef()

	const { selectedFiles, handleFileSelection, setSelectedFiles } =
		useImageState()

	const defaultValues = {
		inFigures: [{ title: '', description: '' }],
		corporateFacts: [{ title: '', description: '' }]
	}

	const initialValues = generateFormValues(
		formsValues.location,
		location,
		defaultValues
	)

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
					country: Yup.string().required('Required'),
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
								update={update}
								formikProps={formikProps}
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

export default LocationMasterForm
