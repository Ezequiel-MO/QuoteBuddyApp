import React, { useRef, useState, FC } from 'react'
import { useGetLocations, useImageState, useFormHandling } from '../../../hooks'
import { ModalPictures, AddImagesModal } from '../../../components/molecules'
import { ShowImagesButton, SubmitInput } from '../../../components/atoms'
import { EventFormFields } from './EventFormFields'
import { generateFormValues } from '../../../helper'
import { VALIDATIONS, formsValues } from '../../../constants'
import { IEvent } from 'src/interfaces/'
import * as yup from "yup"

interface EventMasterFormProps {
	submitForm: (
		data: IEvent,
		files: File[],
		endpoint: string,
		update: boolean
	) => Promise<void>
	event: IEvent
	update: boolean
	setFormData: React.Dispatch<React.SetStateAction<any>> // Replace 'any' with the appropriate type if known
	textContent: string
	setTextContent: React.Dispatch<React.SetStateAction<string>>
}

const EventMasterForm: FC<EventMasterFormProps> = ({
	submitForm,
	event,
	setFormData,
	textContent,
	setTextContent,
	update
}) => {
	const [open, setOpen] = useState(false)
	const [openAddModal, setOpenAddModal] = useState(false)
	const fileInput = useRef<HTMLInputElement>(null)
	const { locations } = useGetLocations()

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
		if (isValid) {
			submitForm(data as IEvent, selectedFiles, "events", update)
		}
	}

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
