import { useRef, useState, useEffect } from 'react'
import { IEntertainment } from 'src/interfaces/entertainment'
import { EntertainmentFormFields } from './EntertainmentFormFields'
import { getInitialValues } from './EntertainmentFormInitialValues'
import { useFormHandling, useImageState } from 'src/hooks'
import * as yup from 'yup'
import { categoryType } from './EntertainmentCategorySelector'
import { AddImagesModal, ModalPictures } from '@components/molecules'
import { ShowImagesButton, SubmitInput } from '@components/atoms'
import { VALIDATIONS } from 'src/constants'

interface Props {
	submitForm: (
		data: IEntertainment,
		files: File[],
		endpoint: string,
		update: boolean
	) => Promise<void>
	entertainmentShow: IEntertainment // Assuming this is the correct type based on usage
	setFormData: React.Dispatch<React.SetStateAction<any>> // Replace 'any' with the appropriate type if known
	textContent: string
	setTextContent: React.Dispatch<React.SetStateAction<string>>
	update: boolean
}

export const EntertainmentMasterForm = ({
	submitForm,
	entertainmentShow,
	setFormData,
	textContent,
	setTextContent,
	update
}: Props) => {
	const [open, setOpen] = useState<boolean>(false)
	const [openAddModal, setOpenAddModal] = useState<boolean>(false)
	const fileInput = useRef<HTMLInputElement>(null)

	//array para "DescriptionForm.tsx"  cada elemento del array es un objeto que representa una "Description".
	const [descriptionsByLanguage, setDescriptionsByLanguage] = useState<object[]>([])

	const initialValues = getInitialValues(entertainmentShow) as IEntertainment
	const validationSchema =
		VALIDATIONS.entertainment as unknown as yup.ObjectSchema<IEntertainment>

	const { data, setData, errors, handleChange, handleBlur, validate } =
		useFormHandling(initialValues, validationSchema)

	const handleSelectLocation = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setData((prevData) => ({
			...prevData,
			city: event.target.value
		}))
	}

	const handleSelectCategory = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setData((prevData) => ({
			...prevData,
			category: event.target.value as categoryType
		}))
	}

	const { selectedFiles, handleFileSelection, setSelectedFiles } = useImageState()

	const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isValid = await validate()
		const dataSubmit: IEntertainment = data
		dataSubmit.textContent = textContent
		const descriptions: any = {}
		for (let i = 0; i < descriptionsByLanguage.length; i++) {
			const code = Object.keys(descriptionsByLanguage[i])[0]
			const text = Object.values(descriptionsByLanguage[i])[0]
			if (code && text) {
				descriptions[code] = text
			}
		}
		dataSubmit.descriptions = descriptions
		if (isValid) {
			submitForm(data as IEntertainment, selectedFiles, "entertainments", update)
		}
	}

	//useEffect para update(patch) de "Descriptions"
	useEffect(() => {
		const isDescritions = entertainmentShow?.descriptions !== undefined && Object.values(entertainmentShow.descriptions).length > 0
		if (isDescritions) {
			const descriptionsMap = new Map(Object.entries(entertainmentShow.descriptions))
			const updateDescriptions: any = []
			for (const i in entertainmentShow.descriptions) {
				const text: string = descriptionsMap.get(i)
				updateDescriptions.push({ [i]: text })
			}
			setDescriptionsByLanguage(updateDescriptions)
		}
	}, [update])

	return (
		<div className="flex justify-center items-center space-x-2">
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
				screen={entertainmentShow}
				submitForm={submitForm}
				open={open}
				setOpen={setOpen}
				initialValues={initialValues}
				multipleCondition={true}
				nameScreen="entertainmentShow"
			/>
			<form
				onSubmit={handleSubmitForm}
				className="space-y-2"
			>
				<EntertainmentFormFields
					data={data as IEntertainment}
					setData={setData}
					errors={errors}
					handleChange={handleChange}
					update={update}
					handleBlur={handleBlur}
					handleSelectLocation={handleSelectLocation}
					handleSelectCategory={handleSelectCategory}
					textContent={textContent}
					entertainment={entertainmentShow}
					setTextContent={setTextContent}
					descriptionsByLanguage={descriptionsByLanguage}
					setDescriptionsByLanguage={setDescriptionsByLanguage}
				/>
				<div className="flex justify-center items-center">
					<SubmitInput update={update} title="Entertainment" />
					<ShowImagesButton
						name={true}
						setOpen={(update && setOpen) || setOpenAddModal}
						nameValue={update ? undefined : 'add images'}
					>
						{!update && (
							<span className="text-white-0">{`${selectedFiles.length} files selected for upload`}</span>
						)}
					</ShowImagesButton>
				</div>
			</form>
		</div>
	)
}
