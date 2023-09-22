import { useRef, useState } from 'react'
import { IEntertainment } from 'src/interfaces/entertainment'
import { EntertainmentFormFields } from './EntertainmentFormFields'
import { getInitialValues } from './EntertainmentFormInitialValues'
import { useFormHandling, useImageState } from 'src/hooks'
import * as yup from 'yup'
import { categoryType } from './EntertainmentCategorySelector'
import { AddImagesModal, ModalPictures } from '@components/molecules'
import { ShowImagesButton } from '@components/atoms'
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
				submitForm={submitForm}
				open={open}
				setOpen={setOpen}
				initialValues={initialValues}
				multipleCondition={true}
				nameScreen="entertainmentShow"
			/>
			<form
				onSubmit={(event) => {
					event.preventDefault()
					const filesArray = Array.from(selectedFiles)
					submitForm(
						data as IEntertainment,
						filesArray,
						'entertainments',
						update
					)
				}}
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
