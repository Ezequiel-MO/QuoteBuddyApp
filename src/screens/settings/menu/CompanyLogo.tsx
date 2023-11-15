import { LogoUpload } from '../LogoUpload'
import { Settings } from '../Settings'

export const CompanyLogo: React.FC = () => {
	const onUpload = () => {
		console.log('image loading ...')
	}
	return (
		<div>
			<Settings />
			<LogoUpload onUpload={onUpload} />
		</div>
	)
}
