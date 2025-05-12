import { FC, useState } from 'react'
import { listStyles } from '@constants/styles/listStyles'
import { IFreelancer } from '@interfaces/freelancer'
import { useFreelancer } from '../../context/FreelancerContext'
import { Icon } from '@iconify/react'
import { formatDate } from 'src/helper/formatDate'
import { formatMoney } from 'src/helper/'
import { MenuRestoreActions } from 'src/components/atoms/modal/menu/MenuRestoreActions'
import baseAPI from 'src/axios/axiosConfig'
import { FreelancerDetailModal } from './modal/FreelancerDetailModal'

interface FreelancerListRestoreItemProps {
	item: IFreelancer
}

export const FreelancerListRestoreItem: FC<FreelancerListRestoreItemProps> = ({
	item: freelancer
}) => {
	const { state, dispatch } = useFreelancer()

	const [openModal, setOpenModal] = useState(false)

	const handleViewDetails = () => {
		setOpenModal(true)
	}

	const handleRestore = async (freelancerId: string) => {
		const updatedFreelancers = state.freelancers.filter(
			(el) => el._id !== freelancerId
		)
		await baseAPI.patch(`freelancers/isDeleted/true/${freelancer._id}`)
		dispatch({ type: 'SET_FREELANCERS', payload: updatedFreelancers })
	}

	const handleDelete = async (freelancerId: string) => {
		const updatedFreelancers = state.freelancers.filter(
			(el) => el._id !== freelancerId
		)
		await baseAPI.delete(`freelancers/isDeleted/true/${freelancer._id}`)
	}

	return (
		<tr className={listStyles.tr}>
			<td
				className={`${listStyles.td} hover:text-blue-600 hover:underline flex items-center`}
			>
				<Icon
					icon="fluent:delete-arrow-back-16-regular"
					width={20}
					className="mr-1"
				/>
				{freelancer.firstName}
			</td>
			<td className={listStyles.td}>{freelancer.familyName}</td>
			<td className={listStyles.td}>{freelancer.email}</td>
			<td className={listStyles.td}>{freelancer.phone}</td>
			<td className={listStyles.td}>
				{/* {`${freelancer.halfDayRate}€`} */}
				{formatMoney(freelancer.halfDayRate ? freelancer.halfDayRate : 0)}
			</td>
			<td className={listStyles.td}>
				{/* {`${freelancer.fullDayRate}€`} */}
				{formatMoney(freelancer?.fullDayRate ? freelancer?.fullDayRate : 0)}
			</td>
			<td className={listStyles.td}>
				{formatMoney(freelancer?.weekendHDRate ? freelancer?.weekendHDRate : 0)}
			</td>
			<td className={listStyles.td}>
				{formatMoney(freelancer?.weekendFDRate ? freelancer?.weekendFDRate : 0)}
			</td>
			<td className={listStyles.td}>{freelancer.type}</td>
			<td className={listStyles.td}>{freelancer.city}</td>
			<td className={`${listStyles.td} text-red-500`}>
				{freelancer?.deletedAt ? formatDate(freelancer.deletedAt) : ''}
			</td>
			<td className={`${listStyles.td}`}>
				<FreelancerDetailModal
					freelancer={freelancer}
					open={openModal}
					setOpen={setOpenModal}
					key={freelancer._id}
				/>
				<MenuRestoreActions
					item={freelancer}
					itemType="Freelancer"
					itemName={`${freelancer?.firstName} ${freelancer?.familyName}`}
					onViewDetails={handleViewDetails}
					onRestore={(freelancerId) => handleRestore(freelancerId)}
					onDelete={(freelancerId) => handleDelete(freelancerId)}
					key={freelancer._id}
				/>
			</td>
		</tr>
	)
}
