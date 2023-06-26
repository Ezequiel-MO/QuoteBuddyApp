import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ProjectMasterForm } from '../form/ProjectMasterForm'
import { usePostToEndpoint } from './usePostToEndpoint'

export const ProjectSpecs = () => {
	const {
		state: { project }
	} = useLocation()
	const fileInput = useRef()

	const postToEndpoint = usePostToEndpoint(project)

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
