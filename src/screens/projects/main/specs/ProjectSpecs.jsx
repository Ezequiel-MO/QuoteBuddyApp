import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ProjectMasterForm } from '../form/ProjectMasterForm'
import { usePostToEndpoint } from './usePostToEndpoint'
import { useCurrentProject } from '../../../../hooks'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../helper/toast'

export const ProjectSpecs = () => {
	const {
		state: { project }
	} = useLocation()
	const fileInput = useRef()
	const { setCurrentProject } = useCurrentProject()

	const onSuccess = (data, update) => {
		localStorage.setItem('currentProject', JSON.stringify(data))
		setCurrentProject(data)
		toast.success(`Project ${update ? 'updated' : 'created'}`, toastOptions)
	}
	const onError = (error) => {
		if (error.includes('clientAccManager')) {
			return toast.error(`Have not selected Client Acc.Manager`, toastOptions)
		}
		toast.error(`${error}`, toastOptions)
	}

	const postToEndpoint = usePostToEndpoint(project, onSuccess, onError)

	const submitForm = (values, files, endPoint, update, open) => {
		postToEndpoint(values, files, endPoint, update, open)
	}

	return (
		<>
			<ProjectMasterForm
				submitForm={submitForm}
				project={project}
				fileInput={fileInput}
			/>
		</>
	)
}
