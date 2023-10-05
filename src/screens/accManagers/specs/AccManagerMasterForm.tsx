import { useRef, useState, FC } from 'react'
import { ModalPictures, AddImagesModal } from '../../../components/molecules'
import { AccManagerFormFields } from './AccManagerFormFields'
import { ShowImagesButton, SubmitInput } from '../../../components/atoms'
import { generateFormValues } from '../../../helper'
import { VALIDATIONS, formsValues } from '../../../constants'
import { useFormHandling, useImageState } from 'src/hooks'
import { IAccManager } from 'src/interfaces/'
import * as yup from 'yup'

interface AccManagerMasterFormProps {
	submitForm: (
		data: IAccManager,
		files: File[],
		endpoint: string,
		update: boolean
	) => Promise<void>
	accManager: IAccManager // Assuming this is the correct type based on usage
	update: boolean
}

const AccManagerMasterForm: FC<AccManagerMasterFormProps> = ({ submitForm, accManager, update }) => {
	const fileInput = useRef<HTMLInputElement>(null)
	const [open, setOpen] = useState(false)
	const [openAddModal, setOpenAddModal] = useState<boolean>(false)
	const initialValues = generateFormValues(formsValues.accManager, accManager)

	const validationSchema: yup.ObjectSchema<any> = VALIDATIONS.accManager

	const { data, setData, errors, handleChange, handleBlur, validate } = useFormHandling(initialValues, validationSchema)

	const { selectedFiles, handleFileSelection, setSelectedFiles } =
		useImageState()

	const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const isValid = await validate()
		if (isValid) {
			submitForm(data as IAccManager, selectedFiles, "accManagers", update)
		}
	}

	return (
		<div className="flex justify-center items-center space-x-2">
			<AddImagesModal
				open={openAddModal}
				setOpen={setOpenAddModal}
				selectedFiles={selectedFiles}
				setSelectedFiles={setSelectedFiles}
				handleFileSelection={handleFileSelection}
				fileInput={fileInput}
				multipleCondition={false}
			/>
			<ModalPictures
				screen={accManager}
				submitForm={submitForm}
				open={open}
				setOpen={setOpen}
				initialValues={initialValues}
				multipleCondition={false}
				nameScreen="accManagers"
			/>
			<form className="space-y-2" onSubmit={(event) => handleSubmitForm(event)}>
				<AccManagerFormFields
					data={data}
					errors={errors}
					handleChange={handleChange}
					handleBlur={handleBlur}
				/>
				<div className="flex justify-center items-center">
					<SubmitInput update={update} title="Acc. Manager" />
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

export default AccManagerMasterForm
