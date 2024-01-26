import { useState } from 'react'
import { ProjectFormData } from './ProjectFormData'
import baseAPI from '../../../../axios/axiosConfig'
import { employeeExistsInCompany } from './helperProject'
import { IProject } from 'src/interfaces'

interface Props {
	onSuccess: (values: any, update: boolean) => void
	onError: (error: any) => void
	project: IProject
}

interface ReturnProps {
	// esto puede ser optativo
	handleSubmit: (
		values: IProject,
		files: File[],
		endpoint: string,
		update: boolean,
		open: boolean
	) => Promise<void>
	isLoading: boolean
	// prevValues: IProject
	// prevFilesImages?: File[]
	// prevFilesPdf?: File[]
}

export const useProjectSubmitForm = ({
	onSuccess,
	onError,
	project
}: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [prevValues, setPrevValues] = useState<any>()

	const handleSubmit = async (
		values: IProject,
		files: File[],
		endpoint: string,
		update: boolean,
		open: boolean
	) => {
		setIsLoading(true)
		let dataToPost
		try {
			values = await employeeExistsInCompany(values)
			if (update) {
				const { updateTransformedData, formData } = ProjectFormData.update(
					values,
					files,
					open,
					project
				)
				await baseAPI.patch(`projects/${project._id}`, updateTransformedData)

				if (files.length > 0 && endpoint !== 'projects/image') {
					await baseAPI.patch(`projects/images/${project._id}`, formData)
				}
			}
			if (!update) {
				const { formData, transformedData } = ProjectFormData.create(
					values,
					files,
					open
				)
				const res = await baseAPI.post('projects', transformedData)
				await baseAPI.patch(
					`projects/images/${res.data.data.data._id}`,
					formData
				)
			}
			if (endpoint === 'projects/pdf') {
				dataToPost = ProjectFormData.updatePdf(values, files)
				await baseAPI.patch(`projects/images/${project._id}`, dataToPost)
			}
			onSuccess(values, update)
		} catch (error) {
			//guardo los valores previos si el servidor(back-end) manda un error
			setPrevValues(values)
			console.log({ error })
			onError(error)
		} finally {
			setIsLoading(false)
		}
	}

	return { handleSubmit, isLoading, prevValues, setPrevValues }
}
