import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { ButtonDeleted } from '../../../components/atoms'

export const FreeLancerListItem = ({
	freeLancer,
	freelancers,
	setFreelancers,
	canBeAddedToProject,
	addMeetGreetOrDispatch,
	addAssistance
}) => {
	const navigate = useNavigate()
	const location = useLocation()
	const url = location.state ? location.state.url : null
	const type = location.state ? location.state.type : null
	const state = location.state ? location.state.state : null

	const handleClick = () => {
		if (type === 'meetOrDispatch') {
			addMeetGreetOrDispatch(freeLancer)
			navigate(`${url}`, { state: state })
		}
		if (type === 'assistance') {
			addAssistance(freeLancer)
			navigate(`${url}`, { state: state })
		}
	}

	return (
		<tbody>
			<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
				<td
					className="hover:text-blue-600 hover:underline cursor-pointer"
					onClick={() =>
						navigate('/app/freelancer/specs', { state: { freeLancer } })
					}
				>
					{freeLancer.firstName}
				</td>
				<td>{freeLancer.familyName}</td>
				<td>{freeLancer.email}</td>
				<td>{freeLancer.phone}</td>
				<td>{`${freeLancer.halfDayRate}€`}</td>
				<td>{`${freeLancer.fullDayRate}€`}</td>
				<td>{freeLancer.languageSupplement}</td>
				<td>{freeLancer.weekendHDRate}</td>
				<td>{freeLancer.weekendFDRate}</td>
				<td>{freeLancer.type}</td>
				<td>{freeLancer.city}</td>
				<td className="cursor-pointer">
					<ButtonDeleted
						endpoint={'freelancers'}
						ID={freeLancer._id}
						setter={setFreelancers}
						items={freelancers}
					/>
				</td>
				{canBeAddedToProject && (
					<td
						className="flex flex-row items-center cursor-pointer"
						onClick={handleClick}
					>
						<Icon icon="gg:insert-after-o" color="#ea5933" width="35" />
						<span>Add</span>
					</td>
				)}
			</tr>
		</tbody>
	)
}
