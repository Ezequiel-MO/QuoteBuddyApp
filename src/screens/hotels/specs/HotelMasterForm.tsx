import { useRef, useState } from 'react'
import { Form, Formik } from 'formik'
import { useGetLocations, useImageState } from '../../../hooks'
import { ModalPictures, AddImagesModal } from '../../../components/molecules'
import { ShowImagesButton } from '../../../components/atoms'
import { HotelFormFields } from '..'
import { generateFormValues } from '../../../helper'
import { VALIDATIONS, formsValues } from '../../../constants'
import { IHotel } from '@interfaces/hotel'

type SubmitFormType = (
	values: IHotel,
	files: File[],
	endpoint: string,
	update: boolean
) => void

interface Props {
	submitForm: SubmitFormType
	hotel: IHotel | {}
	setFormData: React.Dispatch<React.SetStateAction<IHotel | null>>
	textContent: string | null
	setTextContent: React.Dispatch<React.SetStateAction<string | null>>
	update: boolean
}

export const HotelMasterForm = ({
	submitForm,
	hotel,
	setFormData,
	textContent,
	setTextContent,
	update
}: Props) => {
	const [open, setOpen] = useState(false)
	const [openAddModal, setOpenAddModal] = useState(false)
	const fileInput = useRef(null)
	const { locations } = useGetLocations()
	const initialValues = generateFormValues(formsValues.hotel, hotel)

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
				screen={hotel as IHotel}
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
				validationSchema={VALIDATIONS.hotel}
			>
				{(formik) => (
					<div className="block p-6 rounded-lg shadow-lg bg-white w-3/4">
						<Form className="relative">
							<HotelFormFields
								formik={formik}
								locations={locations}
								update={update}
								setTextContent={setTextContent}
								textContent={textContent}
								hotel={hotel}
							/>
							<ShowImagesButton
								name={true}
								setOpen={(update && setOpen) || setOpenAddModal}
								nameValue={!update ? 'add images' : undefined}
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
