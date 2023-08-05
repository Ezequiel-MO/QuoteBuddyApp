import { useRef, useState } from 'react'
import { Form, Formik } from 'formik'
import { useGetLocations, useImageState } from '../../../hooks'
import { ModalPictures, AddImagesModal } from '../../../components/molecules'
import { ShowImagesButton } from '../../../components/atoms'
import { getValidationSchema, HotelFormFields } from '../'
import { generateFormValues } from '../../../helper'
import { formsValues } from '../../../constants'

export const HotelMasterForm = ({
	submitForm,
	hotel,
	setFormData,
	textContent,
	setTextContent,
	update
}) => {
	const [open, setOpen] = useState(false)
	const [openAddModal, setOpenAddModal] = useState(false)
	const fileInput = useRef(null)
	const { locations } = useGetLocations()
	const initialValues = generateFormValues(formsValues.hotel, hotel)

	const imagesHotel = hotel.imageContentUrl ?? []

	const { selectedFiles, handleFileSelection, setSelectedFiles } = useImageState()

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
				screen={hotel}
				submitForm={submitForm}
				open={open}
				setOpen={setOpen}
				initialValues={initialValues}
				multipleCondition={true}
				nameScreen="hotels"
			/>

			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					values.textContent = textContent
					setFormData(values)
					submitForm(values, selectedFiles, 'hotels', update)
				}}
				enableReinitialize
				validationSchema={getValidationSchema()}
			>
				{(formik) => (
					<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
						<Form className="relative">
							<HotelFormFields
								formik={formik}
								locations={locations}
								imagesHotel={imagesHotel}
								fileInput={fileInput}
								update={update}
								setTextContent={setTextContent}
								textContent={textContent}
								hotel={hotel}
								handleFileSelection={handleFileSelection}
							/>
							<ShowImagesButton
								name={true}
								setOpen={update && setOpen || setOpenAddModal}
								nameValue={!update && "add images"}
							>
								<span>
									{`${selectedFiles.length} files selected for upload`}
								</span>
							</ShowImagesButton>
						</Form>
					</div>
				)}
			</Formik>
		</>
	)
}
