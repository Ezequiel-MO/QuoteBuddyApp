import { FC } from 'react'
import { filterStyles } from '../../../../constants'
import { AssistanceVendorSelect } from './AssistanceVendorSelect'
import { useTransfers } from '../../../../screens/projects/add/toProject/transfers/render/context'
import { useFetchFreelancers } from 'src/hooks/fetchData'
import { IFreelancer } from '@interfaces/freelancer'

export const TransferAssistanceVendorFilter: FC = () => {
	const { city } = useTransfers()
	const { freelancers: freelancersData } = useFetchFreelancers({ city })
	const freelancers = freelancersData as unknown as IFreelancer[]
	return (
		<div className={filterStyles['container']}>
			<AssistanceVendorSelect freelancers={freelancers} />
		</div>
	)
}
