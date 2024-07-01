import { ChangeEvent, FC } from 'react'
import { filterStyles } from '../../../../constants'
import { useGetTransferCompaniesByCity } from '../../../../hooks'
import { CompanySelect } from './CompanySelect'

interface TransferVendorFilterProps {
	setCompany: (e: ChangeEvent<HTMLSelectElement>) => void
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
		<div className={filterStyles['selectContainer']}>
			<CompanySelect
				company={company}
				setCompany={setCompany}
				companies={companies}
			/>
		</div>
	)
}
