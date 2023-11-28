import { CompanyLogo } from './menu/CompanyLogo'
import { CompanyColors } from './menu/CompanyColors'

export const SettingsCompany = () => {
	return (
		<>
			<CompanyLogo />
			<div className="mt-8">
				<CompanyColors />
			</div>
		</>
	)
}
