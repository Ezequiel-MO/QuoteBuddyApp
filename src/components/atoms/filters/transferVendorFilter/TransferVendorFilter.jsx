import { filterStyles } from '../../../../constants'
import { useGetTransferCompaniesByCity } from '../../../../hooks'
import { CompanySelect } from './CompanySelect'

export const TransferVendorFilter = ({ setCompany, company, city }) => {
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
