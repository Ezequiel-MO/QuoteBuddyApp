import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	AddToProjectButton,
	ButtonDeleteWithAuth
} from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { IFreelancer } from '@interfaces/freelancer'
import { useFreelancer } from '../context/FreelancerContext'

interface FreelancerListItemProps {
	item: IFreelancer
	canBeAddedToProject: boolean
}

export const FreeLancerListItem = ({
	item: freelancer,
	canBeAddedToProject = false
}: FreelancerListItemProps) => {
	const [open, setOpen] = useState(false)
	const { state, dispatch } = useFreelancer()
	const navigate = useNavigate()

	const handleNavigateToFreelancerSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_FREELANCER',
			payload: freelancer
		})
		navigate('/app/freelancer/specs')
	}

	return (
		<tr className={listStyles.tr}>
			<td
				className="hover:text-blue-600 hover:underline cursor-pointer"
				onClick={handleNavigateToFreelancerSpecs}
			>
				{freelancer.firstName}
			</td>
			<td className={listStyles.td}>{freelancer.familyName}</td>
			<td>{freelancer.email}</td>
			<td>{freelancer.phone}</td>
			<td>{`${freelancer.halfDayRate}€`}</td>
			<td>{`${freelancer.fullDayRate}€`}</td>
			<td>{freelancer.languageSupplement}</td>
			<td>{freelancer.weekendHDRate}</td>
			<td>{freelancer.weekendFDRate}</td>
			<td>{freelancer.type}</td>
			<td>{freelancer.city}</td>
			<td className="cursor-pointer">
				<ButtonDeleteWithAuth
					endpoint={'freelancers'}
					ID={freelancer._id}
					setter={(updatedFreelancers: IFreelancer[]) =>
						dispatch({
							type: 'SET_FREELANCERS',
							payload: updatedFreelancers
						})
					}
					items={state.freelancers || []}
				/>
			</td>
			<AddToProjectButton
				canBeAddedToProject={canBeAddedToProject}
				onAdd={() => setOpen(true)}
			/>
		</tr>
	)
}
