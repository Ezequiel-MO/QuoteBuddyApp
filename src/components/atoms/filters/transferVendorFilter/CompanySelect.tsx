import { FC } from 'react'
import { filterStyles } from '../../../../constants'
import { CompanyOptions } from './CompanyOptions'

interface CompanySelectProps {
	company: string
	setCompany: (value: string) => void
	companies: string[]
}

export const CompanySelect: FC<CompanySelectProps> = ({
	company,
	setCompany,
	companies
}) => {
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
