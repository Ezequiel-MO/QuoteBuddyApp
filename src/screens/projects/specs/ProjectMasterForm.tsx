import { useProject } from '@screens/projects/context/ProjectContext'
import { ProjectFormFields } from './ProjectFormFields'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/atoms'
import { resetProjectFilters } from './resetProjectFields'
import { useCurrentProject } from 'src/hooks'
import { IProject } from '@interfaces/project'
import { useImageModal } from 'src/hooks/images/useImageModal'
import ProjectImagesModal from '../images/ProjectImagesModal'

export const ProjectMasterForm = () => {
	const { state, dispatch, setForceRefresh } = useProject()
	const { currentProject, setCurrentProject } = useCurrentProject()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const navigate = useNavigate()
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch({ type: 'CLEAR_SCHEDULE' })
		setCurrentProject(currentProject as IProject)
		const isUpdating = currentProject?._id ? true : false
		if (isUpdating) {
			await updateEntity(
				'projects',
				currentProject,
				state.projects || [],
				dispatch
			)
		} else {
			await createEntity(
				'projects',
				currentProject,
				currentProject?.imageContentUrl || [],
				dispatch
			)
		}
		resetProjectFilters(dispatch, {
			groupLocation: ''
		})
		setForceRefresh((prev) => prev + 1)
		navigate('/app/project')
	}

	return (
		<form onSubmit={handleSubmit} data-testid="project-master-form">
			<ProjectFormFields />
			<div className="flex justify-center m-6">
				<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
					{state.update ? 'Edit & Exit' : 'Submit'}
				</Button>
				{currentProject?.budget === 'budgetAsPdf' && (
					<>
						<Button
							type="button"
							handleClick={openModal}
							icon="mingcute:pdf-line"
							widthIcon={30}
						>
							UPLOAD BUDGET PDF
						</Button>
						<ProjectImagesModal
							isOpen={state.imagesModal}
							onClose={closeModal}
							title="ADD/EDIT PDF"
						/>
					</>
				)}
			</div>
		</form>
	)
}
