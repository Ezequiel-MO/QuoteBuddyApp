export const CompanyOptions = ({ companies, setCompany }) => {
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
