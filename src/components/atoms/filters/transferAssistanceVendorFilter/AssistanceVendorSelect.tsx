import { ChangeEvent, FC } from 'react'
import { filterStyles } from '../../../../constants'
import { IFreelancer } from '../../../../interfaces/freelancer'
import { useTransfers } from '../../../../screens/projects/add/toProject/transfers/render/context'

interface Props {
	freelancers: IFreelancer[]
}

export const AssistanceVendorSelect: FC<Props> = ({ freelancers }) => {
	const { freelancer, setFreelancer } = useTransfers()

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedFreelancer = freelancers.find(
			(freelancer) => freelancer._id === e.target.value
		)
		setFreelancer(selectedFreelancer || null)
	}

	return (
		<select
			id="assistanceVendor"
			value={freelancer?._id}
			className={filterStyles['select']}
			onChange={handleChange}
		>
			<option value={0}>--- Filter by Assistance Vendor ---</option>
			{freelancers?.map((freelancer) => (
				<option key={freelancer._id} value={freelancer._id}>
					{freelancer.type}
				</option>
			))}
		</select>
	)
}
