import { useProject } from '@screens/projects/context/ProjectContext'
import { ProjectFormFields } from './ProjectFormFields'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/atoms'
import { resetProjectFilters } from './resetProjectFields'
import { useCurrentProject } from 'src/hooks'
import { IProject } from '@interfaces/index'
import { useImageModal } from 'src/hooks/images/useImageModal'
import ProjectImagesModal from '../images/ProjectImagesModal'
import { current } from '@reduxjs/toolkit'
import { updateScheduleDays } from "./helperFunctionProject"

export const ProjectMasterForm = () => {
	const { state, dispatch } = useProject()
	const { currentProject, setCurrentProject, handleScheduleDays } = useCurrentProject()
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
			setCurrentProject(currentProject as IProject)
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
		navigate('/app/project')
	}

	return (
		<form onSubmit={handleSubmit}>
			<ProjectFormFields />
			<div className="flex justify-center m-6">
				<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
					{state.update ? 'Edit & Exit' : 'Submit'}
				</Button>
				{state.currentProject?.budget === 'budgetAsPdf' && (
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
