import { useRef, useState, useEffect } from 'react'
import { useImageState, useFormHandling } from '../../../hooks'
import { ModalPictures, AddImagesModal } from '../../../components/molecules'
import { ShowImagesButton, SubmitInput } from '../../../components/atoms'
import { HotelFormFields } from '..'
import { generateFormValues } from '../../../helper'
import { VALIDATIONS, formsValues } from '../../../constants'
import { IHotel } from '@interfaces/hotel'
import * as yup from "yup"

interface IHotelData {
	name: string
	city: string
	address: string
	longitude?: number
	latitude?: number
	numberStars: number
	numberRooms: number
	checkin_out: string
	meetingRooms: string
	wheelChairAccessible: boolean
	wifiSpeed: string
	swimmingPool: string
	restaurants: string
	textContent: string
	imageContentUrl: string[]
	availableLanguages: string[]
	descriptions: Map<string, string>
}

type SubmitFormType = (
	values: IHotel,
	files: File[],
	endpoint: string,
	update: boolean
) => void

interface Props {
	submitForm: SubmitFormType
	hotel: IHotel
	setFormData: React.Dispatch<React.SetStateAction<IHotel | null>>
	textContent: string
	setTextContent: React.Dispatch<React.SetStateAction<string>>
	update: boolean
	preValues: IHotelData,
	prevFiles?: File[]
}

export const HotelMasterForm = ({
	submitForm,
	hotel,
	setFormData,
	textContent,
	setTextContent,
	update,
	preValues,
	prevFiles
}: Props) => {
	const [open, setOpen] = useState(false)
	const [openAddModal, setOpenAddModal] = useState(false)
	const fileInput = useRef(null)

	//array para "DescriptionForm.tsx"  cada elemento del array es un objeto que representa una "Description".
	const [descriptionsByLanguage, setDescriptionsByLanguage] = useState<object[]>([])

	const initialValues = generateFormValues(formsValues.hotel, hotel)
	const validationSchema: yup.ObjectSchema<any> = VALIDATIONS.hotel
	const { data, setData, handleChange, errors, handleBlur, validate } = useFormHandling(initialValues, validationSchema)

	const { selectedFiles, handleFileSelection, setSelectedFiles } =
		useImageState()

	const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prevData: IHotel) => ({
			...prevData,
			wheelChairAccessible: e.target.checked
		}))
	}

	const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isValid = await validate()
		const dataSubmit: IHotel = data
		dataSubmit.textContent = textContent
		const descriptions: any = {}
		for (let i = 0; i < descriptionsByLanguage.length; i++) {
			const code = Object.keys(descriptionsByLanguage[i])[0]
			const text = Object.values(descriptionsByLanguage[i])[0]
			descriptions[code] = text
		}
		dataSubmit.descriptions = descriptions
		if (isValid) {
			submitForm(data as IHotel, selectedFiles, "hotels", update)
		}
	}

	//useEffect para update de "Descriptions"
	useEffect(() => {
		if (hotel?.availableLanguages && hotel?.availableLanguages.length > 0) {
			const descriptionsMap = new Map(Object.entries(hotel.descriptions))
			console.log(descriptionsMap.get("en"))
			const update: any = []
			for (const i in hotel.descriptions) {
				const text: string = descriptionsMap.get(i)
				update.push({ [i]: text })
			}
			setDescriptionsByLanguage(update)
		}
	}, [update])

	//seteo los valores previos para que no se renicien si el servidor manda un error 
	useEffect(() => {
		if (preValues) {
			setData(preValues)
		}
		if (prevFiles && prevFiles.length > 0) {
			setSelectedFiles(prevFiles)
		}
	}, [preValues])

	return (
		<div className="justify-center items-center">
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
			<form className='space-y-2' onSubmit={handleSubmitForm}>
				<HotelFormFields
					data={data}
					setData={setData}
					handleChange={handleChange}
					handleChangeCheckbox={handleChangeCheckbox}
					errors={errors}
					handleBlur={handleBlur}
					textContent={textContent}
					setTextContent={setTextContent}
					hotel={hotel}
					update={update}
					//
					descriptionsByLanguage={descriptionsByLanguage}
					setDescriptionsByLanguage={setDescriptionsByLanguage}
				/>
				<div className='flex justify-center items-center'>
					<SubmitInput update={update} title='Hotel' />
					<ShowImagesButton
						name={true}
						setOpen={(update && setOpen) || setOpenAddModal}
						nameValue={!update ? 'add images' : undefined}
					>
						{!update && (
							<span>
								{`${selectedFiles?.length} files selected for upload`}
							</span>
						)}
					</ShowImagesButton>
				</div>
			</form>
		</div>
	)
}
