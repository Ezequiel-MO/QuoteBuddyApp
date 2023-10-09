import React, { useRef, useState, FC, useEffect } from 'react'
import { useImageState, useFormHandling } from '../../../hooks'
import { ModalPictures, AddImagesModal } from '../../../components/molecules'
import { ShowImagesButton, SubmitInput } from '../../../components/atoms'
import { EventFormFields } from './EventFormFields'
import { generateFormValues } from '../../../helper'
import { VALIDATIONS, formsValues } from '../../../constants'
import { IEvent, ITransfer } from 'src/interfaces/'
import * as yup from "yup"

interface IEventData {
	_id: string
	name?: string
	city?: string
	textContent?: string
	imageContentUrl?: string[]
	pricePerPerson?: boolean
	price?: number
	longitude?: number
	latitude?: number
	introduction?: string[]
	transfer?: ITransfer[]
	updatedAt?: string
}

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
	preValues: IEventData,
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

	const initialValues = generateFormValues(formsValues.event, event)
	const validationSchema: yup.ObjectSchema<any> = VALIDATIONS.event

	const { data, setData, handleChange, errors, handleBlur, validate } = useFormHandling(initialValues, validationSchema)

	const { selectedFiles, handleFileSelection, setSelectedFiles } =
		useImageState()

	const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prevData: any) => ({
			...prevData,
			pricePerPerson: e.target.checked
		}))
	}

	const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isValid = await validate()
		const dataSubmit:IEvent = data
		dataSubmit.textContent = textContent
		if (isValid) {
			submitForm(data as IEvent, selectedFiles, "events", update)
		}
	}

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
			<form className='space-y-2' onSubmit={(e) => handleSubmitForm(e)}>
				<EventFormFields
					data={data}
					handleChange={handleChange}
					handleChangeCheckbox={handleChangeCheckbox}
					errors={errors}
					handleBlur={handleBlur}
					update={update}
					textContent={textContent}
					setTextContent={setTextContent}
					event={event}
				/>
				<div className='flex justify-center items-center'>
					<SubmitInput update={update} title='Event' />
					<ShowImagesButton
						name={true}
						setOpen={(update && setOpen) || setOpenAddModal}
						nameValue={!update ? 'add images' : "show images"}
					>
						{!update && (
							<span>
								{`${selectedFiles.length} files selected for upload`}
							</span>
						)}
					</ShowImagesButton>
				</div>
			</form>
		</div>
	)
}

export default EventMasterForm
