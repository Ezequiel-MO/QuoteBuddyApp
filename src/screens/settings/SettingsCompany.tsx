import { CompanyLogo } from './menu/CompanyLogo'
import { CompanyColors } from './menu/CompanyColors'
import { CompanyFonts } from "./menu/CompanyFonts"

export const SettingsCompany = () => {
	return (
		<>
			<CompanyLogo />
			<div className="mt-8">
				<CompanyColors />
			</div>
			<div className="mt-8">
				<CompanyFonts />
			</div>
		</>
	)
}
