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
import { computeTotalDays, whichDay } from 'src/helper/helperFunctions'

export const ProjectMasterForm = () => {
	const { state, dispatch } = useProject()
	const { currentProject, setCurrentProject } = useCurrentProject()
	const { openModal, closeModal } = useImageModal({ dispatch })

	const navigate = useNavigate()
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch({ type: 'CLEAR_SCHEDULE' })
		/* 	if (currentProject) {
			const diffDays = computeTotalDays(
				currentProject.arrivalDay as string,
				currentProject.departureDay as string
			)
			for (let i = 1; i <= diffDays; i++) {
				currentProject?.schedule?.push({
					date: whichDay(i, diffDays),
					fullDayMeetings: {
						intro: '',
						meetings: []
					},
					morningMeetings: {
						intro: '',
						meetings: []
					},
					morningEvents: {
						intro: '',
						events: []
					},
					lunch: {
						intro: '',
						restaurants: []
					},
					afternoonMeetings: {
						intro: '',
						meetings: []
					},
					afternoonEvents: {
						intro: '',
						events: []
					},
					dinner: {
						intro: '',
						restaurants: []
					},
					transfer_in: [],
					transfer_out: [],
					itinerary: {
						intro: '',
						itinerary: [],
						morningActivity: {
							intro: '',
							events: []
						},
						afternoonActivity: {
							intro: '',
							events: []
						},
						nightActivity: {
							intro: '',
							events: []
						},
						lunch: {
							intro: '',
							restaurants: []
						},
						dinner: {
							intro: '',
							restaurants: []
						},
						starts: '',
						ends: ''
					},
					overnight: {
						intro: '',
						hotels: []
					}
				})
			}
		} */

		setCurrentProject(currentProject as IProject)
		const isUpdating = state.update

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
