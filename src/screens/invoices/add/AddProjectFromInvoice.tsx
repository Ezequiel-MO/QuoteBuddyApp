import { FC } from 'react'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../../helper/toast'
import baseAPI from '../../../axios/axiosConfig'
import { ProjectMasterForm } from '@screens/projects/specs/ProjectMasterForm'
import { useInvoice } from '../context/InvoiceContext'
import { IProject } from '@interfaces/project'
interface AddProjectFromInvoiceProps {
	setOpen: (value: boolean) => void
}

export const AddProjectFromInvoice: FC<AddProjectFromInvoiceProps> = ({
	setOpen
}) => {
	const { dispatch } = useInvoice()
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

				dispatch({
					type: 'UPDATE_INVOICE_FIELD',
					payload: { name: 'projectCode', value: values.code }
				})
				toast.success('Project added successfully')
				setOpen(false)
			}
		} catch (error: any) {
			toast.error(error.response?.data?.message, errorToastOptions as any)
		}
	}
	return <ProjectMasterForm />
}
