import { useState, useRef, useEffect, FC } from 'react'
import { ModalPdf } from '../../../../components/molecules'
import { SubmitInput } from '../../../../components/atoms'
import { getInitialValues } from './ProjectFormInitialValues'
import { VALIDATIONS } from '../../../../constants'
import { useFormHandling } from '../../../../hooks'
import { ProjectFormFields } from './ProjectFormFields'
import { IProject } from 'src/interfaces'
import * as yup from 'yup'

interface IProjectData {
	code: string
	nrPax: number
	hasSideMenu: boolean
	hasExternalCorporateImage: boolean
	suplementaryText: boolean
	arrivalDay: string
	departureDay: string
	budget: string
	accountManager: string
	clientCompany: string
	clientAccManager: string
	groupName: string
	groupLocation: string
	status: string
	estimate: number
}

interface ProjectMasterFormProps {
	// fileInput: object
	// isImageListNeeded: boolean
	submitForm: (
		data: IProject,
		files: File[],
		endpoint: string,
		update: boolean,
		open: boolean
	) => Promise<void>
	project: IProject
	update: boolean
	preValues?: IProjectData
	// prevFiles?: File[]
}

export const ProjectMasterForm: FC<ProjectMasterFormProps> = ({
	submitForm,
	project,
	update,
	preValues
}) => {
	const fileInput = useRef<HTMLInputElement>(null)
	const [modalOpen, setModalOpen] = useState(false)
	const [open, setOpen] = useState(
		project?.budget === 'budgetAsPdf' ? true : false
	)

	const initialValues = getInitialValues(project)
	const validationSchema: yup.ObjectSchema<any> = VALIDATIONS.project

	const { data, setData, handleChange, errors, handleBlur, validate } =
		useFormHandling(initialValues, validationSchema)

	const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target
		setData((prevData: IProject) => ({
			...prevData,
			[name]: checked
		}))
	}

	const handleSubmitFormPdf = (
		values: any,
		files: File[],
		url: string,
		update: boolean
	) => {
		submitForm(values, files, url, update, open)
	}

	const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isValid = await validate()
		if (isValid) {
			submitForm(
				data,
				[...(fileInput.current?.files || [])],
				'projects',
				update,
				open
			)
		}
	}

	useEffect(() => {
		if (preValues) {
			setData(preValues)
		}
	}, [preValues])

	return (
		<div className="justify-center items-center">
			<ModalPdf
				screen={project}
				submitForm={handleSubmitFormPdf}
				open={modalOpen}
				setOpen={setModalOpen}
				initialValues={initialValues}
				multipleCondition={false}
				nameScreen={'projects'}
				keyModel="imageContentUrl"
			/>
			<form className="space-y-2" onSubmit={handleSubmitForm}>
				<ProjectFormFields
					data={data}
					setData={setData}
					handleChange={handleChange}
					handleChangeCheckbox={handleChangeCheckbox}
					open={open}
					errors={errors}
					handleBlur={handleBlur}
					update={update}
					setOpen={setOpen}
					fileInput={fileInput}
					project={project}
					openModal={modalOpen}
					setOpenModal={setModalOpen}
				/>
				<div className="flex justify-center items-center">
					<SubmitInput update={update} title="Project" />
				</div>
			</form>
		</div>
	)
}
