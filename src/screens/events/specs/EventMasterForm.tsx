import React, { useRef, useState, FC, useEffect } from 'react'
import { useImageState, useFormHandling } from '../../../hooks'
import { ModalPictures, AddImagesModal } from '../../../components/molecules'
import { ShowImagesButton, SubmitInput } from '../../../components/atoms'
import { EventFormFields } from './EventFormFields'
import { generateFormValues } from '../../../helper'
import { VALIDATIONS, formsValues } from '../../../constants'
import { IEvent } from 'src/interfaces/'
import * as yup from 'yup'


interface EventMasterFormProps {
	submitForm: (
		data: IEvent,
		files: File[],
		endpoint: string,
		update: boolean
	) => Promise<void>
	event: IEvent
	update: boolean
	textContent: string
	setTextContent: React.Dispatch<React.SetStateAction<string>>
	preValues: IEvent
	prevFiles?: File[]
}

const EventMasterForm: FC<EventMasterFormProps> = ({
	submitForm,
	event,
	textContent,
	setTextContent,
	update,
	preValues,
	prevFiles
}) => {
	const [open, setOpen] = useState(false)
	const [openAddModal, setOpenAddModal] = useState(false)
	const fileInput = useRef<HTMLInputElement>(null)

	//array para "DescriptionForm.tsx"  cada elemento del array es un objeto que representa una "Description".
	const [descriptionsByLanguage, setDescriptionsByLanguage] = useState<object[]>([])

	const initialValues = generateFormValues(formsValues.event, event)
	const validationSchema: yup.ObjectSchema<any> = VALIDATIONS.event

	const { data, setData, handleChange, errors, handleBlur, validate } =
		useFormHandling(initialValues, validationSchema)

	const { selectedFiles, handleFileSelection, setSelectedFiles } =
		useImageState()

	const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target
		setData((prevData: any) => ({
			...prevData,
			[name]: e.target.checked
		}))
	}

	const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isValid = await validate()
		const dataSubmit: IEvent = data
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
			submitForm(data as IEvent, selectedFiles, 'events', update)
		}
	}

	//useEffect para update(patch) de "Descriptions"
	useEffect(() => {
		const isDescritions = event?.descriptions !== undefined && Object.values(event.descriptions).length > 0
		if (isDescritions) {
			const descriptionsMap = new Map(Object.entries(event.descriptions))
			const updateDescriptions: any = []
			for (const i in event.descriptions) {
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
				screen={event}
				submitForm={submitForm}
				open={open}
				setOpen={setOpen}
				initialValues={initialValues}
				multipleCondition={true}
				nameScreen="events"
			/>
			<form className="space-y-2" onSubmit={(e) => handleSubmitForm(e)}>
				<EventFormFields
					data={data}
					setData={setData}
					handleChange={handleChange}
					handleChangeCheckbox={handleChangeCheckbox}
					errors={errors}
					handleBlur={handleBlur}
					update={update}
					textContent={textContent}
					setTextContent={setTextContent}
					event={event}
					descriptionsByLanguage={descriptionsByLanguage}
					setDescriptionsByLanguage={setDescriptionsByLanguage}
				/>
				<div className="flex justify-center items-center">
					<SubmitInput update={update} title="Event" />
					<ShowImagesButton
						name={true}
						setOpen={(update && setOpen) || setOpenAddModal}
						nameValue={!update ? 'add images' : 'show images'}
					>
						{!update && (
							<span>{`${selectedFiles.length} files selected for upload`}</span>
						)}
					</ShowImagesButton>
				</div>
			</form>
		</div>
	)
}

export default EventMasterForm
