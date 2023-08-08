import { FC } from 'react'

interface CompanyOptionsProps {
	companies: string[]
	setCompany: (value: string) => void
}

export const CompanyOptions: FC<CompanyOptionsProps> = ({
	companies,
	setCompany
}) => {
	return (
		<>
			<option value="none" onClick={() => setCompany('none')}>
				--- Filter by Vendor(all) ---
			</option>
			{companies.map((company) => (
				<option key={company} value={company}>
					{` --- ${company} --- `}
				</option>
			))}
		</>
	)
}
