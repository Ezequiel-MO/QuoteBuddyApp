import { ChangeEvent, FC } from 'react'
import { CompanyOptions } from './CompanyOptions'
import { filterStyles } from 'src/constants'

interface CompanySelectProps {
	company: string
	setCompany: (e: ChangeEvent<HTMLSelectElement>) => void
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
			onChange={setCompany}
		>
			<CompanyOptions companies={companies} />
		</select>
	)
}
