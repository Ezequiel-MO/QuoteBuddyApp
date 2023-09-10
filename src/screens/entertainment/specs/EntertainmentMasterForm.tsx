import { useRef, useState } from 'react'
import { IEntertainment } from 'src/interfaces/entertainment'
import { EntertainmentFormFields } from './EntertainmentFormFields'
import { getInitialValues } from './EntertainmentFormInitialValues'
import { getValidationSchema } from './EntertainmentFormValidation'
import { useFormHandling, useImageState } from 'src/hooks'
import * as yup from 'yup'
import { categoryType } from './EntertainmentCategorySelector'
import { AddImagesModal, ModalPictures } from '@components/molecules'
import { ShowImagesButton } from '@components/atoms'

interface Props {
	entertainmentShow: IEntertainment
	handleSubmit: (
		event: React.FormEvent<HTMLFormElement>,
		data: IEntertainment,
		update: boolean
	) => void
	textContent: string
	setTextContent: React.Dispatch<React.SetStateAction<string>>
}

export const EntertainmentMasterForm = ({
	entertainmentShow,
	handleSubmit,
	textContent,
	setTextContent
}: Props) => {
	const [open, setOpen] = useState<boolean>(false)
	const [openAddModal, setOpenAddModal] = useState<boolean>(false)
	const fileInput = useRef<HTMLInputElement>(null)
	const initialValues = getInitialValues(entertainmentShow) as IEntertainment
	const validationSchema =
		getValidationSchema() as unknown as yup.ObjectSchema<IEntertainment>

	const { data, setData, errors, handleChange, handleBlur, validate } =
		useFormHandling(initialValues, validationSchema)

	const update = Object.keys(entertainmentShow).length > 0 ? true : false

	const handleSelectLocation = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setData({
			...data,
			city: event.target.value
		})
	}

	const handleSelectCategory = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		setData({
			...data,
			category: event.target.value as categoryType
		})
	}

	const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		handleSubmit(event, data, update)
	}

	const { selectedFiles, handleFileSelection, setSelectedFiles } =
		useImageState()

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
				submitForm={handleSubmit}
				open={open}
				setOpen={setOpen}
				initialValues={initialValues}
				multipleCondition={true}
				nameScreen="restaurants"
			/>
			<form onSubmit={handleSubmitForm} className="space-y-2">
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
					setTextContent={setTextContent}
				/>
				<div className="flex justify-center items-center">
					<input
						type="submit"
						className="mr-2 cursor-pointer py-2 px-10 bg-gradient-to-r from-orange-800 to-orange-500 text-white-0 font-bold uppercase rounded-lg hover:from-green-500 hover:to-blue-600 active:from-green-600 active:to-blue-700"
						value={
							update ? 'Edit Entertainment Form' : 'Save new Entertainment'
						}
					/>
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
