import { useGetTransferCompaniesByCity } from '../../../hooks'
import { CompanySelect } from './CompanySelect'

export const TransferVendorFilter = ({ setCompany, company, city }) => {
	const { companies } = useGetTransferCompaniesByCity(city)
	return (
		<div className="w-60 max-w-sm my-2 ml-0 mr-0">
			<div className="flex items-center gap-2">
				<CompanySelect
					company={company}
					setCompany={setCompany}
					companies={companies}
				/>
			</div>
		</div>
	)
}
