import { FC } from 'react'
import { useLocation } from 'react-router-dom'
// import { ProjectMasterForm } from '../form/ProjectMasterForm'
import { ProjectMasterForm } from './ProjectMasterForm'
// import { usePostToEndpoint } from './usePostToEndpoint'
import { useProjectSubmitForm } from './useProjectSubmitForm'
import { useCurrentProject, useOnErrorFormSubmit } from '../../../../hooks'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../helper/toast'
import { Spinner } from '../../../../components/atoms'
import { IProject } from 'src/interfaces'

export const ProjectSpecs: FC = () => {
	const {
		state: { project }
	} = useLocation()

	const update = Object.keys(project).length > 0 ? true : false
	const { setCurrentProject } = useCurrentProject()

	const onSuccess = (data: IProject, update: boolean) => {
		localStorage.setItem('currentProject', JSON.stringify(data))
		setCurrentProject(data)
		toast.success(`Project ${update ? 'updated' : 'created'}`, toastOptions)
		setPrevValues(data)
	}
	const { onError } = useOnErrorFormSubmit('Project')

	const { handleSubmit, isLoading, prevValues, setPrevValues } =
		useProjectSubmitForm({
			onSuccess,
			onError,
			project
		})

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<ProjectMasterForm
					submitForm={handleSubmit}
					project={project}
					update={update}
					preValues={prevValues}
				/>
			)}
		</>
	)
}
