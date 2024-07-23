import { useNavigate } from 'react-router-dom'
import { useFreelancer } from '../context/FreelancerContext'
import { FreeLancerFormFields } from './FreeLancerFormFields'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetFreelancerFilters } from './resetFreelancerFields'
import { Button } from '@components/atoms'

export const FreeLancerMasterForm = () => {
	const { state, dispatch } = useFreelancer()
	const navigate = useNavigate()

	const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
		event.preventDefault()
		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity(
				'freelancers',
				state.currentFreelancer,
				state.freelancers || [],
				dispatch
			)
		} else {
			await createEntity('freelancers', state.currentFreelancer, [], dispatch)
		}
		resetFreelancerFilters(dispatch, {
			city: ''
		})
		navigate('/app/freelancer')
	}

	return (
		<form onSubmit={handleSubmit}>
			<FreeLancerFormFields />
			<div className="flex justify-center m-6">
				<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
					{state.update ? 'Edit & Exit' : 'Submit'}
				</Button>
			</div>
		</form>
	)
}
