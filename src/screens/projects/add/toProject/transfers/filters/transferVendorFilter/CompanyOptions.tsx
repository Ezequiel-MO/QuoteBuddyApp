import { FC } from 'react'

interface CompanyOptionsProps {
	companies: string[]
}

export const CompanyOptions: FC<CompanyOptionsProps> = ({ companies }) => {
	return (
		<>
			<option value="">--- Filter by Vendor (all) ---</option>
			{companies.map((company) => (
				<option key={company} value={company}>
					{`--- ${company} ---`}
				</option>
			))}
		</>
	)
}
