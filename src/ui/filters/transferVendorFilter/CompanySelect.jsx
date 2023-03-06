import { CompanyOptions } from './CompanyOptions'

export const CompanySelect = ({ company, setCompany, companies }) => {
	return (
		<select
			id="company"
			value={company}
			className="flex-1 py-1 px-2 border-0 rounded-xl bg-green-50 text-center cursor-pointer"
			onChange={(e) => setCompany(e.target.value)}
		>
			<CompanyOptions companies={companies} setCompany={setCompany} />
		</select>
	)
}
