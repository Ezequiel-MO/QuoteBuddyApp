import { useState, useRef } from 'react'
import { Form, Formik } from 'formik'
import { useGetLocations, useImageState, usePdfState } from '../../../hooks'
import { ModalPictures, AddImagesModal, ModalPdf, AddPdfModal } from '../../../components/molecules'
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
	const [openAddModalPdf, setOpenAddModalPdf] = useState<boolean>(false)
	const [openModalPdf, setOpenModalPdf] = useState(false)
	const fileInput = useRef<HTMLInputElement>(null)
	const { locations } = useGetLocations()
	const initialValues = generateFormValues(formsValues.restaurant, restaurant)

	const { selectedFiles, handleFileSelection, setSelectedFiles } =
		useImageState()
	const { selectedFilesPdf, handleFilePdfSelection, setSelectedFilesPdf } = usePdfState()

	return (
		<div className="flex justify-center items-center space-x-2">
			<AddPdfModal
				open={openAddModalPdf}
				setOpen={setOpenAddModalPdf}
				fileInput={fileInput}
				handleFileSelection={handleFilePdfSelection}
				multipleCondition={false}
				selectedFiles={selectedFilesPdf}
				setSelectedFiles={setSelectedFilesPdf}
			/>
			<ModalPdf
				open={openModalPdf}
				setOpen={setOpenModalPdf}
				initialValues={initialValues}
				keyModel="pdfMenus"
				multipleCondition={false}
				nameScreen="restaurants"
				screen={restaurant}
				submitForm={submitForm}
			/>
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
					submitForm(values, [...selectedFiles, ...selectedFilesPdf], 'restaurants', update)
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
							<div className="flex space-x-1">
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
								<ShowImagesButton
									name={true}
									setOpen={update ? setOpenModalPdf : setOpenAddModalPdf}
									nameValue={update ? "show pdf" : 'add pdf'}
								>
									{!update && (
										<span>
											{`${selectedFilesPdf.length} files selected for upload`}
										</span>
									)}
								</ShowImagesButton>
							</div>
						</Form>
					</div>
				)}
			</Formik>
		</div>
	)
}

export default RestaurantMasterForm
