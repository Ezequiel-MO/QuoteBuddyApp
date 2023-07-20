import { FC } from 'react'
import { filterStyles } from '../../../../constants'
import { AssistanceVendorSelect } from './AssistanceVendorSelect'

import { useTransfers } from '../../../../screens/projects/add/toProject/transfers/render/context'
import { useGetFreelancersByCity } from '../../../../hooks'

export const TransferAssistanceVendorFilter: FC = () => {
	const { city } = useTransfers()
	const { freelancers } = useGetFreelancersByCity(city)
	return (
		<div className={filterStyles['container']}>
			<div className={filterStyles['innerContainer']}>
				<AssistanceVendorSelect freelancers={freelancers} />
			</div>
		</div>
	)
}
