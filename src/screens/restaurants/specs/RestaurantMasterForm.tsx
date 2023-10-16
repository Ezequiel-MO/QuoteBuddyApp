import { useState, useRef, useEffect } from 'react'
import { useImageState, usePdfState, useFormHandling } from '../../../hooks'
import {
	ModalPictures,
	AddImagesModal,
	ModalPdf,
	AddPdfModal
} from '../../../components/molecules'
import { getValidationSchema, RestaurantFormFields } from '..'
import { ShowImagesButton, SubmitInput } from '../../../components/atoms'
import { generateFormValues } from '../../../helper'
import { formsValues, VALIDATIONS } from '../../../constants'
import { IRestaurant } from 'src/interfaces'
import * as yup from 'yup'

interface Props {
	submitForm: (
		values: any,
		files: any,
		endpoint: any,
		update: any
	) => Promise<void>
	restaurant: IRestaurant
	setFormData: React.Dispatch<React.SetStateAction<IRestaurant | null>>
	textContent: string
	setTextContent: React.Dispatch<React.SetStateAction<string>>
	update: boolean
	preValues: IRestaurant
	prevFilesImages?: File[]
	prevFilesPdf?: File[]
}

const RestaurantMasterForm = ({
	submitForm,
	restaurant,
	setFormData,
	textContent,
	setTextContent,
	update,
	preValues,
	prevFilesImages,
	prevFilesPdf
}: Props) => {
	const [open, setOpen] = useState<boolean>(false)
	const [openAddModal, setOpenAddModal] = useState<boolean>(false)
	const [openAddModalPdf, setOpenAddModalPdf] = useState<boolean>(false)
	const [openModalPdf, setOpenModalPdf] = useState(false)
	const fileInput = useRef<HTMLInputElement>(null)

	const initialValues = generateFormValues(formsValues.restaurant, restaurant)
	const validationSchema: yup.ObjectSchema<any> = VALIDATIONS.restaurant

	const { data, setData, handleChange, errors, handleBlur, validate } =
		useFormHandling(initialValues, validationSchema)
	const { selectedFiles, handleFileSelection, setSelectedFiles } =
		useImageState()
	const { selectedFilesPdf, handleFilePdfSelection, setSelectedFilesPdf } =
		usePdfState()

	const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prevData: IRestaurant) => ({
			...prevData,
			isVenue: e.target.checked
		}))
	}

	const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isValid = await validate()
		const dataSubmit: IRestaurant = data
		dataSubmit.textContent = textContent
		if (isValid) {
			submitForm(
				dataSubmit,
				[...selectedFiles, ...selectedFilesPdf],
				'restaurants',
				update
			)
		}
	}

	//seteo los valores previos para que no se renicien si el servidor manda un error
	useEffect(() => {
		if (preValues) {
			setData(preValues)
		}
		// console.log({prevFilesImages , prevFilesPdf})
		if (prevFilesPdf && prevFilesPdf.length > 0) {
			setSelectedFilesPdf(prevFilesPdf)
		}
		if (prevFilesImages && prevFilesImages.length > 0) {
			setSelectedFiles(prevFilesImages)
		}
	}, [preValues])

	return (
		<div className="justify-center items-center">
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
			<form className="space-y-2" onSubmit={handleSubmitForm}>
				<RestaurantFormFields
					data={data}
					setData={setData}
					handleChange={handleChange}
					handleChangeCheckbox={handleChangeCheckbox}
					errors={errors}
					handleBlur={handleBlur}
					update={update}
					textContent={textContent}
					setTextContent={setTextContent}
					restaurant={restaurant}
				/>
				<div className="flex justify-center items-center">
					<SubmitInput update={update} title="Restaurant" />
					<ShowImagesButton
						name={true}
						setOpen={(update && setOpen) || setOpenAddModal}
						nameValue={update ? undefined : 'add images'}
					>
						{!update && (
							<span>
								{`${selectedFiles?.length} files selected for upload`}
							</span>
						)}
					</ShowImagesButton>
					<ShowImagesButton
						name={true}
						setOpen={update ? setOpenModalPdf : setOpenAddModalPdf}
						nameValue={update ? 'show pdf' : 'add pdf'}
					>
						{!update && (
							<span>
								{`${selectedFilesPdf?.length} files selected for upload`}
							</span>
						)}
					</ShowImagesButton>
				</div>
			</form>
		</div>
	)
}

export default RestaurantMasterForm
