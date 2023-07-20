import { filterStyles } from '../../../../constants'
import { CompanyOptions } from './CompanyOptions'

export const CompanySelect = ({ company, setCompany, companies }) => {
	return (
		<select
			id="company"
			value={company}
			className={filterStyles['select']}
			onChange={(e) => setCompany(e.target.value)}
		>
			<CompanyOptions companies={companies} setCompany={setCompany} />
		</select>
	)
}
