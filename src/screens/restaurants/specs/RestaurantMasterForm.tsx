import { useState, useRef } from 'react'
import { Form, Formik } from 'formik'
import { useGetLocations, useImageState } from '../../../hooks'
import { ModalPictures, AddImagesModal } from '../../../components/molecules'
import { getValidationSchema, RestaurantFormFields } from '..'
import { ShowImagesButton } from '../../../components/atoms'
import { generateFormValues } from '../../../helper'
import { formsValues } from '../../../constants'
import { IRestaurant } from 'src/interfaces'

interface Props {
	submitForm: (
		values: any,
		files: any,
		endpoint: any,
		update: any
	) => Promise<void>
	restaurant: IRestaurant
	setFormData: React.Dispatch<React.SetStateAction<IRestaurant | null>>
	textContent: string | null
	setTextContent: React.Dispatch<React.SetStateAction<string | null>>
	update: boolean
}

const RestaurantMasterForm = ({
	submitForm,
	restaurant,
	setFormData,
	textContent,
	setTextContent,
	update
}: Props) => {
	const [open, setOpen] = useState<boolean>(false)
	const [openAddModal, setOpenAddModal] = useState<boolean>(false)
	const fileInput = useRef<HTMLInputElement>(null)
	const { locations } = useGetLocations()
	const initialValues = generateFormValues(formsValues.restaurant, restaurant)

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
				screen={restaurant}
				submitForm={submitForm}
				open={open}
				setOpen={setOpen}
				initialValues={initialValues}
				multipleCondition={true}
				nameScreen="restaurants"
			/>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					values.textContent = textContent
					setFormData(values)
					submitForm(values, selectedFiles, 'restaurants', update)
				}}
				enableReinitialize
				validationSchema={getValidationSchema()}
			>
				{(formik) => (
					<div className="p-6 rounded">
						<Form className="relative">
							<RestaurantFormFields
								formik={formik}
								restaurant={restaurant}
								setTextContent={setTextContent}
								textContent={textContent}
								locations={locations}
								update={update}
							/>
							<ShowImagesButton
								name={true}
								setOpen={(update && setOpen) || setOpenAddModal}
								nameValue={update ? undefined : 'add images'}
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

export default RestaurantMasterForm
