import { FC } from 'react'
import { useLocation , useNavigate } from 'react-router-dom'
// import { ProjectMasterForm } from '../form/ProjectMasterForm'
import {ProjectMasterForm} from "./ProjectMasterForm"
// import { usePostToEndpoint } from './usePostToEndpoint'
import { useProjectSubmitForm } from "./useProjectSubmitForm"
import { useCurrentProject, useOnErrorFormSubmit  } from '../../../../hooks'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../helper/toast'
import { Spinner } from '../../../../components/atoms'
import { IProject } from 'src/interfaces'


export const ProjectSpecs:FC = () => {
	const {
		state: { project }
	} = useLocation()
	const navigate = useNavigate()
	const update = Object.keys(project).length > 0 ? true : false
	const { setCurrentProject } = useCurrentProject()

	const onSuccess = (data:IProject, update:boolean) => {
		localStorage.setItem('currentProject', JSON.stringify(data))
		setCurrentProject(data)
		toast.success(`Project ${update ? 'updated' : 'created'}`, toastOptions)
		setTimeout(() => {
			navigate('/app/project')
		}, 1000)
	}
	const {onError} = useOnErrorFormSubmit("Project")

	const { handleSubmit, isLoading  , prevValues} = useProjectSubmitForm({ onSuccess, onError, project }) // VERSION NUEVA
	
	// const postToEndpoint = usePostToEndpoint(project, onSuccess, onError) // version vieja
	// const submitForm = (values, files, endPoint, update, open) => { // VERSION VIEJA
	// 	postToEndpoint(values, files, endPoint, update, open)
	// }

	return (
		<>
			{
				isLoading ? <Spinner />
					:
					<ProjectMasterForm
						submitForm={handleSubmit}
						project={project}
						update={update}
						preValues={prevValues}
					/>
			}
		</>
	)
}
