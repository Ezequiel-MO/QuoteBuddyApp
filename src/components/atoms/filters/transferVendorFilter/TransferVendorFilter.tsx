import { FC } from 'react'
import { filterStyles } from '../../../../constants'
import { useGetTransferCompaniesByCity } from '../../../../hooks'
import { CompanySelect } from './CompanySelect'

interface TransferVendorFilterProps {
	setCompany: (value: string) => void
	company: string
	city: string
}

export const TransferVendorFilter: FC<TransferVendorFilterProps> = ({
	setCompany,
	company,
	city
}) => {
	const { companies } = useGetTransferCompaniesByCity(city)
	return (
		<div className={filterStyles['container']}>
			<div className={filterStyles['innerContainer']}>
				<CompanySelect
					company={company}
					setCompany={setCompany}
					companies={companies}
				/>
			</div>
		</div>
	)
}
