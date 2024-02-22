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
		files: File[],
		endpoint: string,
		update: boolean
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

	//array para "DescriptionForm.tsx"  cada elemento del array es un objeto que representa una "Description".
	const [descriptionsByLanguage, setDescriptionsByLanguage] = useState<object[]>([])

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
		const descriptions: any = {}
		for (let i = 0; i < descriptionsByLanguage.length; i++) {
			const code = Object.keys(descriptionsByLanguage[i])[0]
			const text = Object.values(descriptionsByLanguage[i])[0]
			if (code && text) {
				descriptions[code] = text
			}
		}
		console.log(descriptions)
		dataSubmit.descriptions = descriptions
		if (isValid) {
			submitForm(
				dataSubmit,
				[...selectedFiles, ...selectedFilesPdf],
				'restaurants',
				update
			)
		}
	}

	//useEffect para update(patch) de "Descriptions"
	useEffect(() => {
		const isDescritions = restaurant?.descriptions !== undefined && Object.values(restaurant.descriptions).length > 0
		if (isDescritions) {
			const descriptionsMap = new Map(Object.entries(restaurant.descriptions))
			const updateDescriptions: any = []
			for (const i in restaurant.descriptions) {
				const text: string = descriptionsMap.get(i)
				updateDescriptions.push({ [i]: text })
			}
			setDescriptionsByLanguage(updateDescriptions)
		}
	}, [update])

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
					descriptionsByLanguage={descriptionsByLanguage}
					setDescriptionsByLanguage={setDescriptionsByLanguage}
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
