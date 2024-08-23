import { useProject } from '@screens/projects/context/ProjectContext'
import { ProjectFormFields } from './ProjectFormFields'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { useCurrentProject } from 'src/hooks'
import { createEntity } from 'src/helper/forms/createEntity'
import { useNavigate } from 'react-router-dom'
import { Button } from '@components/atoms'

export const ProjectMasterForm = () => {
	const { state, dispatch } = useProject()

	const navigate = useNavigate()
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity('projects', state.currentProject, [], dispatch)
		} else {
			await createEntity('projects', state.currentProject, [], dispatch)
		}
		/* resetRestaurantFilters(dispatch, {
			city: '',
			isVenue: false,
			price: 0
		}) */
		navigate('/app/project')
	}

	return (
		<form
			className="space-y-2 flex flex-col items-center"
			onSubmit={handleSubmit}
		>
			<ProjectFormFields />

			<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
				{state.update ? 'Edit & Exit' : 'Submit'}
			</Button>
		</form>
	)
}
