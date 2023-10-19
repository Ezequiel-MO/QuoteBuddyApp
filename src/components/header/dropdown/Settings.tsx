import React from 'react'
import { Icon } from '@iconify/react'
import { usePasswordReset } from '@screens/login/usePasswordReset'

const Settings: React.FC = () => {
	const openExternalLink = () => {
		window.open('https://docsbackoffice.netlify.app/', '_blank')
	}

	const { handlePasswordReset } = usePasswordReset()

	return (
		<>
			<div
				className="font-bold text-black-50 border-3 border-b border-gray-800 p-3 flex items-center cursor-pointer"
				onClick={openExternalLink}
			>
				<Icon icon="material-symbols:help-outline" />
				<p className="ml-2">Help</p>
			</div>
			<div
				className="font-bold text-black-50 border-3 border-b border-gray-800 p-3 flex items-center cursor-pointer"
				onClick={handlePasswordReset}
			>
				<Icon icon="carbon:password" />
				<p className="ml-2">Reset Password</p>
			</div>
		</>
	)
}

export default Settings
