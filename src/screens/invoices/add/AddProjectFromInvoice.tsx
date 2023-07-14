import { FC } from 'react'
import { ProjectMasterForm } from '../../projects/main'
import { IProject } from '../../../interfaces'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../../helper/toast'
import baseAPI from '../../../axios/axiosConfig'
import { useCurrentInvoice } from '../../../hooks'
interface AddProjectFromInvoiceProps {
	setOpen: (value: boolean) => void
}

export const AddProjectFromInvoice: FC<AddProjectFromInvoiceProps> = ({
	setOpen
}) => {
	const { setInvoiceValue } = useCurrentInvoice()
	const handleAddCodeToInvoice = async (
		values: IProject,
		_files: any,
		endpoint = 'projects',
		_update: boolean = false,
		_open: boolean = true
	) => {
		try {
			const projects = await baseAPI.get(endpoint)
			const projectExists = projects.data.data.data.some(
				(project: IProject) => project.code === values.code
			)
			if (projectExists) {
				throw new Error('Project already exists')
			} else {
				await baseAPI.post(endpoint, values)
				setInvoiceValue({ name: 'projectCode', value: values.code })
				toast.success('Project added successfully')
				setOpen(false)
			}
		} catch (error: any) {
			toast.error(error.response?.data?.message, errorToastOptions as any)
		}
	}
	return (
		<ProjectMasterForm
			submitForm={handleAddCodeToInvoice}
			project={{}}
			fileInput={{}}
			isImageListNeeded={false}
		/>
	)
}
