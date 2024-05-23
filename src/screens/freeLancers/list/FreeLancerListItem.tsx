import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { ButtonDeleteWithAuth } from '../../../components/atoms'
import { listStyles } from 'src/constants/listStyles'
import { IFreelancer } from '@interfaces/freelancer'

interface Props {
	freeLancer: IFreelancer
	freelancers: IFreelancer[]
	setFreelancers: React.Dispatch<React.SetStateAction<IFreelancer[]>>
	canBeAddedToProject: boolean
}

export const FreeLancerListItem = ({
	freeLancer,
	freelancers,
	setFreelancers,
	canBeAddedToProject
}: Props) => {
	const navigate = useNavigate()
	const location = useLocation()
	const url = location.state ? location.state.url : null
	const type = location.state ? location.state.type : null
	const state = location.state ? location.state.state : null

	const handleClick = () => {
		if (type === 'meetOrDispatch') {
			/* 	addMeetGreetOrDispatch(freeLancer) */
			navigate(`${url}`, { state: state })
		}
		if (type === 'assistance') {
			/* addAssistance(freeLancer) */
			navigate(`${url}`, { state: state })
		}
	}

	return (
		<tbody className={listStyles.tbody}>
			<tr className={listStyles.tr}>
				<td
					className="hover:text-blue-600 hover:underline cursor-pointer"
					onClick={() =>
						navigate('/app/freelancer/specs', { state: { freeLancer } })
					}
				>
					{freeLancer.firstName}
				</td>
				<td className={listStyles.td}>{freeLancer.familyName}</td>
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
					<ButtonDeleteWithAuth
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
