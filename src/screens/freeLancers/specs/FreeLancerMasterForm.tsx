import { useNavigate } from 'react-router-dom'
import { useFreelancer } from '../context/FreelancerContext'
import { FreeLancerFormFields } from './FreeLancerFormFields'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetFreelancerFilters } from './resetFreelancerFields'

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
				<button
					type="submit"
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Submit
				</button>
			</div>
		</form>
	)
}
